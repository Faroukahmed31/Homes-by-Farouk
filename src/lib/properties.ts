import { neon } from '@neondatabase/serverless';
import { Property } from '@/types/property';
import { properties as seedData } from '@/data/properties';

const sql = neon(process.env.POSTGRES_URL || '');

// Automatically ensures the properties table exists and is seeded with luxury listings
export async function initPropertiesTable() {
  try {
    // 1. Create table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS properties (
        slug TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        location TEXT NOT NULL,
        description TEXT NOT NULL,
        long_description TEXT[] NOT NULL,
        bedrooms TEXT NOT NULL,
        bathrooms TEXT NOT NULL,
        square_meters TEXT NOT NULL,
        completion_date TEXT NOT NULL,
        status TEXT NOT NULL,
        purpose TEXT NOT NULL,
        starting_price BIGINT NOT NULL,
        hero_image TEXT NOT NULL,
        gallery_images TEXT[] NOT NULL DEFAULT '{}',
        units JSONB NOT NULL DEFAULT '[]'::jsonb,
        amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
        location_features TEXT[] NOT NULL DEFAULT '{}',
        map_image TEXT DEFAULT '',
        listing_type TEXT NOT NULL DEFAULT 'SALE',
        property_type TEXT NOT NULL DEFAULT 'APARTMENT',
        sale_price BIGINT,
        rent_price BIGINT
      );
    `;

    // Ensure map_link column exists
    await sql`ALTER TABLE properties ADD COLUMN IF NOT EXISTS map_link TEXT DEFAULT '';`;
    // Ensure map_embed_url column exists
    await sql`ALTER TABLE properties ADD COLUMN IF NOT EXISTS map_embed_url TEXT DEFAULT '';`;
    
    // Ensure new dynamic listing fields exist
    await sql`ALTER TABLE properties ADD COLUMN IF NOT EXISTS listing_type TEXT NOT NULL DEFAULT 'SALE';`;
    await sql`ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_type TEXT NOT NULL DEFAULT 'APARTMENT';`;
    await sql`ALTER TABLE properties ADD COLUMN IF NOT EXISTS sale_price BIGINT;`;
    await sql`ALTER TABLE properties ADD COLUMN IF NOT EXISTS rent_price BIGINT;`;

    // Migrate existing data based on legacy columns
    await sql`UPDATE properties SET listing_type = 'RENT' WHERE purpose = 'rent' AND listing_type = 'SALE' AND rent_price IS NULL;`;
    await sql`UPDATE properties SET sale_price = starting_price WHERE (listing_type = 'SALE' OR listing_type = 'BOTH') AND sale_price IS NULL;`;
    await sql`UPDATE properties SET rent_price = starting_price WHERE (listing_type = 'RENT' OR listing_type = 'BOTH') AND rent_price IS NULL;`;

    // 2. Check if the table is currently empty
    const countResult = await sql`SELECT COUNT(*)::integer as count FROM properties;`;
    const count = countResult[0]?.count || 0;

    // 3. Seed data if table has 0 rows
    if (count === 0) {
      console.log('Neon: Properties table is empty. Commencing automatic luxury seeding...');
      for (const item of seedData) {
        await sql`
          INSERT INTO properties (
            slug, title, location, description, long_description, 
            bedrooms, bathrooms, square_meters, completion_date, 
            status, purpose, starting_price, hero_image, gallery_images, 
            units, amenities, location_features, map_image, map_link, map_embed_url,
            listing_type, property_type, sale_price, rent_price
          ) VALUES (
            ${item.slug}, ${item.title}, ${item.location}, ${item.description}, 
            ${item.longDescription}, ${item.bedrooms}, ${item.bathrooms}, 
            ${item.squareMeters}, ${item.completionDate}, ${item.status}, 
            ${item.purpose || 'buy'}, ${item.startingPrice || 0}, ${item.heroImage}, 
            ${item.galleryImages}, ${JSON.stringify(item.units)}, 
            ${JSON.stringify(item.amenities)}, ${item.locationFeatures}, 
            ${item.mapImage || ''}, '', '',
            ${item.listingType}, ${item.propertyType || 'APARTMENT'}, ${item.salePrice}, ${item.rentPrice}
          ) ON CONFLICT (slug) DO NOTHING;
        `;
      }
      console.log('Neon: Seeding complete! 5 premium properties inserted successfully.');
    }
  } catch (error) {
    console.error('Neon: Error initializing or seeding properties table:', error);
  }
}

// Maps Postgres snake_case table row to TypeScript camelCase Property interface
function mapDbRowToProperty(row: any): Property {
  const listingType = (row.listing_type || (row.purpose === 'rent' ? 'RENT' : 'SALE')) as 'SALE' | 'RENT' | 'BOTH';
  const salePrice = row.sale_price !== null && row.sale_price !== undefined ? Number(row.sale_price) : (row.purpose === 'buy' ? Number(row.starting_price) : null);
  const rentPrice = row.rent_price !== null && row.rent_price !== undefined ? Number(row.rent_price) : (row.purpose === 'rent' ? Number(row.starting_price) : null);
  
  // Computed fallbacks for backward compatibility
  const purpose = listingType === 'RENT' ? 'rent' : 'buy';
  const startingPrice = (listingType === 'RENT' ? rentPrice : salePrice) || Number(row.starting_price) || 0;

  return {
    slug: row.slug,
    title: row.title,
    location: row.location,
    description: row.description,
    longDescription: row.long_description || [],
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    squareMeters: row.square_meters,
    completionDate: row.completion_date,
    status: row.status,
    purpose,
    startingPrice,
    propertyType: (row.property_type as Property['propertyType']) || 'APARTMENT',
    listingType,
    salePrice,
    rentPrice,
    heroImage: row.hero_image,
    galleryImages: row.gallery_images || [],
    units: typeof row.units === 'string' ? JSON.parse(row.units) : row.units || [],
    amenities: typeof row.amenities === 'string' ? JSON.parse(row.amenities) : row.amenities || [],
    locationFeatures: row.location_features || [],
    mapImage: row.map_image || '',
    mapLink: row.map_link || '',
    mapEmbedUrl: row.map_embed_url || '',
  };
}

// Queries all properties (instant serverless execution)
export async function getPropertiesFromNeon(): Promise<Property[]> {
  try {
    await initPropertiesTable();
    const result = await sql`
      SELECT * FROM properties 
      ORDER BY starting_price ASC;
    `;
    return result.map(mapDbRowToProperty);
  } catch (error) {
    console.error('Neon: Failed to get properties from database, using mock fallback:', error);
    return seedData;
  }
}

// Queries a single property by its slug (instant serverless execution)
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    await initPropertiesTable();
    const result = await sql`
      SELECT * FROM properties 
      WHERE slug = ${slug} 
      LIMIT 1;
    `;
    if (result.length === 0) return null;
    return mapDbRowToProperty(result[0]);
  } catch (error) {
    console.error(`Neon: Failed to get property details for slug "${slug}":`, error);
    return seedData.find(p => p.slug === slug) || null;
  }
}

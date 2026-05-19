'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addPropertyAction(formData: FormData) {
  const sql = neon(process.env.POSTGRES_URL || '');
  
  // Format basic strings
  const slug = formData.get('slug') as string;
  const title = formData.get('title') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const bedrooms = formData.get('bedrooms') as string;
  const bathrooms = formData.get('bathrooms') as string;
  const squareMeters = formData.get('squareMeters') as string;
  const completionDate = formData.get('completionDate') as string;
  const status = formData.get('status') as string;
  const purpose = formData.get('purpose') as string;
  const startingPrice = Number(formData.get('startingPrice'));
  const heroImage = formData.get('heroImage') as string;
  const mapImage = (formData.get('mapImage') as string) || '';
  const mapLink = (formData.get('mapLink') as string) || '';

  // Format arrays (split by newline)
  const longDescription = (formData.get('longDescription') as string)
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);
    
  const galleryImages = (formData.get('galleryImages') as string)
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);
    
  const locationFeatures = (formData.get('locationFeatures') as string)
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // Format JSON arrays
  let units = [];
  try {
    units = JSON.parse(formData.get('units') as string || '[]');
  } catch (e) {
    console.error('Failed to parse units JSON', e);
  }

  let amenities = [];
  try {
    amenities = JSON.parse(formData.get('amenities') as string || '[]');
  } catch (e) {
    console.error('Failed to parse amenities JSON', e);
  }

  try {
    await sql`
      INSERT INTO properties (
        slug, title, location, description, long_description, 
        bedrooms, bathrooms, square_meters, completion_date, 
        status, purpose, starting_price, hero_image, gallery_images, 
        units, amenities, location_features, map_image, map_link
      ) VALUES (
        ${slug}, ${title}, ${location}, ${description}, 
        ${longDescription}, ${bedrooms}, ${bathrooms}, 
        ${squareMeters}, ${completionDate}, ${status}, 
        ${purpose}, ${startingPrice}, ${heroImage}, 
        ${galleryImages}, ${JSON.stringify(units)}, 
        ${JSON.stringify(amenities)}, ${locationFeatures}, 
        ${mapImage}, ${mapLink}
      ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        location = EXCLUDED.location,
        description = EXCLUDED.description,
        long_description = EXCLUDED.long_description,
        bedrooms = EXCLUDED.bedrooms,
        bathrooms = EXCLUDED.bathrooms,
        square_meters = EXCLUDED.square_meters,
        completion_date = EXCLUDED.completion_date,
        status = EXCLUDED.status,
        purpose = EXCLUDED.purpose,
        starting_price = EXCLUDED.starting_price,
        hero_image = EXCLUDED.hero_image,
        gallery_images = EXCLUDED.gallery_images,
        units = EXCLUDED.units,
        amenities = EXCLUDED.amenities,
        location_features = EXCLUDED.location_features,
        map_image = EXCLUDED.map_image,
        map_link = EXCLUDED.map_link;
    `;

    // Revalidate paths so the new property shows up instantly
    revalidatePath('/');
    revalidatePath('/properties');
    
  } catch (error) {
    console.error('Failed to insert property into Neon:', error);
    throw new Error('Failed to save property. Please check database connection.');
  }

  // Redirect back to properties admin page on success
  redirect('/admin/properties');
}

export async function deletePropertyAction(slug: string) {
  const sql = neon(process.env.POSTGRES_URL || '');
  try {
    await sql`DELETE FROM properties WHERE slug = ${slug};`;
    revalidatePath('/');
    revalidatePath('/properties');
  } catch (error) {
    console.error('Failed to delete property from Neon:', error);
    throw new Error('Failed to delete property.');
  }
  revalidatePath('/admin/properties');
}

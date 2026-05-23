const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.POSTGRES_URL || '');

async function runTest() {
  console.log('Connecting to Neon database...');
  try {
    const result = await sql`SELECT NOW();`;
    console.log('Database connected successfully!', result);

    // Let's check table columns
    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'properties';
    `;
    console.log('Columns in properties table:');
    columns.forEach(col => console.log(` - ${col.column_name}: ${col.data_type}`));

    // Test a dummy insertion
    const testSlug = 'test-slug-' + Date.now();
    console.log(`Testing insert with slug: ${testSlug}`);
    await sql`
      INSERT INTO properties (
        slug, title, location, description, long_description, 
        bedrooms, bathrooms, square_meters, completion_date, 
        status, purpose, starting_price, hero_image, gallery_images, 
        units, amenities, location_features, map_image, map_link, map_embed_url
      ) VALUES (
        ${testSlug}, 'Test Title', 'Test Location', 'Test Description', 
        ARRAY['Long Description Line 1'], '3', '3', 
        '150', '2026', 'Off-Plan', 'buy', 15000000, 'http://test.com/hero.png', 
        ARRAY['http://test.com/gallery1.png'], 
        ${JSON.stringify([])}, ${JSON.stringify([])}, 
        ARRAY['Highlight 1'], '', '', ''
      );
    `;
    console.log('Insert test succeeded!');

    // Delete test row
    await sql`DELETE FROM properties WHERE slug = ${testSlug};`;
    console.log('Cleanup test succeeded!');

  } catch (error) {
    console.error('Database test failed with error:', error);
  }
}

runTest();

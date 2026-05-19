'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

async function saveUploadedFile(file: any): Promise<string> {
  if (!file || typeof file !== 'object' || !('arrayBuffer' in file) || !file.name || file.size === 0) {
    return '';
  }
  
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Ensure public/uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    
    // Make filename unique
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${safeName}`;
    const filepath = path.join(uploadDir, filename);
    
    await writeFile(filepath, buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Failed to save uploaded file:', error);
    return '';
  }
}

function extractMapSrc(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();

  // If it's already an iframe, extract the src
  if (trimmed.startsWith('<iframe')) {
    const match = trimmed.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If it's a standard Google Maps URL, check if we can parse it
  if (trimmed.includes('google.com/maps') || trimmed.includes('maps.google.com')) {
    // 1. Check if it's already an embed URL
    if (trimmed.includes('/embed') || trimmed.includes('output=embed')) {
      return trimmed;
    }
    
    // 2. Try to extract query parameter from url (e.g. ?q=...)
    const qParamMatch = trimmed.match(/[?&]q=([^&]+)/);
    if (qParamMatch && qParamMatch[1]) {
      const qVal = decodeURIComponent(qParamMatch[1].replace(/\+/g, ' '));
      return `https://maps.google.com/maps?q=${encodeURIComponent(qVal)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    
    // 3. Try to extract place name from path (e.g. /place/Brookside+One+residency)
    const placeMatch = trimmed.match(/\/place\/([^/@?]+)/);
    if (placeMatch && placeMatch[1]) {
      const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
      return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }

    // 4. Try to extract exact pin coordinates (e.g. !3d-1.2585756!4d36.7926054)
    const pinMatch = trimmed.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (pinMatch && pinMatch[1] && pinMatch[2]) {
      return `https://maps.google.com/maps?q=${pinMatch[1]},${pinMatch[2]}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }

    // 5. Try to extract center coordinates (e.g. @-1.2585756,36.7900305)
    const centerMatch = trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (centerMatch && centerMatch[1] && centerMatch[2]) {
      return `https://maps.google.com/maps?q=${centerMatch[1]},${centerMatch[2]}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
  }

  return trimmed;
}

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
  // Handle Hero Image upload or URL
  const heroImageFile = formData.get('heroImageFile');
  let heroImage = '';
  if (heroImageFile && typeof heroImageFile === 'object' && (heroImageFile as any).size > 0) {
    heroImage = await saveUploadedFile(heroImageFile);
  }
  if (!heroImage) {
    heroImage = (formData.get('heroImage') as string) || '';
  }

  // Handle Map Layout Image upload or URL
  const mapImageFile = formData.get('mapImageFile');
  let mapImage = '';
  if (mapImageFile && typeof mapImageFile === 'object' && (mapImageFile as any).size > 0) {
    mapImage = await saveUploadedFile(mapImageFile);
  }
  if (!mapImage) {
    mapImage = (formData.get('mapImage') as string) || '';
  }

  const mapLink = (formData.get('mapLink') as string) || '';
  const mapEmbedUrlRaw = (formData.get('mapEmbedUrl') as string) || '';
  const mapEmbedUrl = extractMapSrc(mapEmbedUrlRaw);

  // Format arrays (split by newline)
  const longDescription = (formData.get('longDescription') as string)
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);
    
  // Handle Gallery Images upload + URL list
  const galleryImageFiles = formData.getAll('galleryImageFiles');
  const uploadedGalleryUrls: string[] = [];
  for (const file of galleryImageFiles) {
    if (file && typeof file === 'object' && (file as any).size > 0) {
      const url = await saveUploadedFile(file);
      if (url) uploadedGalleryUrls.push(url);
    }
  }
  
  const manualGalleryUrls = (formData.get('galleryImages') as string || '')
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);
    
  const galleryImages = [...uploadedGalleryUrls, ...manualGalleryUrls];
    
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
        units, amenities, location_features, map_image, map_link, map_embed_url
      ) VALUES (
        ${slug}, ${title}, ${location}, ${description}, 
        ${longDescription}, ${bedrooms}, ${bathrooms}, 
        ${squareMeters}, ${completionDate}, ${status}, 
        ${purpose}, ${startingPrice}, ${heroImage}, 
        ${galleryImages}, ${JSON.stringify(units)}, 
        ${JSON.stringify(amenities)}, ${locationFeatures}, 
        ${mapImage}, ${mapLink}, ${mapEmbedUrl}
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
        map_link = EXCLUDED.map_link,
        map_embed_url = EXCLUDED.map_embed_url;
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

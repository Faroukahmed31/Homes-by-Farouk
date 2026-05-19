import { neon } from '@neondatabase/serverless';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  guideType: string;
  timestamp: string;
  clientLat?: number;
  clientLon?: number;
  clientCity?: string;
  clientCountry?: string;
  clientIp?: string;
}

const sql = neon(process.env.POSTGRES_URL || '');

export async function initLeadsTable() {
  try {
    // Create base table
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT,
        guide_type TEXT NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Ensure location tracking columns exist
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS client_lat NUMERIC;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS client_lon NUMERIC;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS client_city TEXT;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS client_country TEXT;`;
    await sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS client_ip TEXT;`;

    console.log('Leads table initialized with location tracking columns');
  } catch (error) {
    console.error('Failed to initialize leads table:', error);
  }
}

export async function saveLead(lead: Omit<Lead, 'id' | 'timestamp'>) {
  try {
    // Ensure table exists
    await initLeadsTable();

    await sql`
      INSERT INTO leads (
        name, email, phone, message, guide_type, 
        client_lat, client_lon, client_city, client_country, client_ip
      )
      VALUES (
        ${lead.name}, ${lead.email}, ${lead.phone || null}, ${lead.message || null}, ${lead.guideType},
        ${lead.clientLat || null}, ${lead.clientLon || null}, ${lead.clientCity || null}, ${lead.clientCountry || null}, ${lead.clientIp || null}
      );
    `;
    console.log('Lead saved to database with location context');
    return true;
  } catch (error) {
    console.error('Failed to save lead to database:', error);
    return null;
  }
}

export async function getLeads(): Promise<Lead[]> {
  try {
    // Ensure table exists before querying
    await initLeadsTable();

    const result = await sql`
      SELECT 
        id, name, email, phone, message, guide_type as "guideType", timestamp,
        client_lat as "clientLat", client_lon as "clientLon", 
        client_city as "clientCity", client_country as "clientCountry", 
        client_ip as "clientIp"
      FROM leads 
      ORDER BY timestamp DESC;
    `;
    
    return result.map(row => ({
      id: row.id.toString(),
      name: row.name,
      email: row.email,
      phone: row.phone,
      message: row.message,
      guideType: row.guideType,
      timestamp: row.timestamp ? new Date(row.timestamp).toISOString() : new Date().toISOString(),
      clientLat: row.clientLat ? Number(row.clientLat) : undefined,
      clientLon: row.clientLon ? Number(row.clientLon) : undefined,
      clientCity: row.clientCity || undefined,
      clientCountry: row.clientCountry || undefined,
      clientIp: row.clientIp || undefined,
    }));
  } catch (error) {
    console.error('Failed to get leads from database:', error);
    return [];
  }
}

import { neon } from '@neondatabase/serverless';

export interface Lead {
  id: string;
  name: string;
  email: string;
  guideType: string;
  timestamp: string;
}

const sql = neon(process.env.POSTGRES_URL || '');

export async function initLeadsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        guide_type TEXT NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Leads table initialized');
  } catch (error) {
    console.error('Failed to initialize leads table:', error);
  }
}

export async function saveLead(lead: Omit<Lead, 'id' | 'timestamp'>) {
  try {
    // Ensure table exists
    await initLeadsTable();

    await sql`
      INSERT INTO leads (name, email, guide_type)
      VALUES (${lead.name}, ${lead.email}, ${lead.guideType});
    `;
    console.log('Lead saved to database');
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
      SELECT id, name, email, guide_type as "guideType", timestamp 
      FROM leads 
      ORDER BY timestamp DESC;
    `;
    
    return result.map(row => ({
      id: row.id.toString(),
      name: row.name,
      email: row.email,
      guideType: row.guideType,
      timestamp: row.timestamp ? new Date(row.timestamp).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Failed to get leads from database:', error);
    return [];
  }
}

import fs from 'fs';
import path from 'path';

export interface Lead {
  id: string;
  name: string;
  email: string;
  guideType: string;
  timestamp: string;
}

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

export async function saveLead(lead: Omit<Lead, 'id' | 'timestamp'>) {
  const newLead: Lead = {
    ...lead,
    id: Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toISOString(),
  };

  try {
    const dir = path.dirname(LEADS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let leads: Lead[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf8');
      leads = JSON.parse(data);
    }

    leads.push(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    return newLead;
  } catch (error) {
    console.error('Failed to save lead:', error);
    return null;
  }
}

export async function getLeads(): Promise<Lead[]> {
  try {
    if (!fs.existsSync(LEADS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to get leads:', error);
    return [];
  }
}

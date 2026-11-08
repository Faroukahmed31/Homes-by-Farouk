import { describe, it, expect, vi } from 'vitest';
import sitemap from './sitemap';

vi.mock('@/lib/properties', () => ({
  getPropertiesFromNeon: vi.fn().mockResolvedValue([
    { slug: 'test-property-1' },
    { slug: 'test-property-2' },
  ]),
}));

describe('sitemap', () => {
  it('generates correct sitemap entries including static and dynamic property routes', async () => {
    const entries = await sitemap();

    expect(Array.isArray(entries)).toBe(true);

    const urls = entries.map((e) => e.url);

    // Static pages
    expect(urls).toContain('https://homesbyfarouk.co.ke');
    expect(urls).toContain('https://homesbyfarouk.co.ke/properties');
    expect(urls).toContain('https://homesbyfarouk.co.ke/investment-guide');
    expect(urls).toContain('https://homesbyfarouk.co.ke/about');
    expect(urls).toContain('https://homesbyfarouk.co.ke/contact');
    expect(urls).toContain('https://homesbyfarouk.co.ke/privacy');
    expect(urls).toContain('https://homesbyfarouk.co.ke/terms');

    // Dynamic properties
    expect(urls).toContain('https://homesbyfarouk.co.ke/properties/test-property-1');
    expect(urls).toContain('https://homesbyfarouk.co.ke/properties/test-property-2');
  });
});

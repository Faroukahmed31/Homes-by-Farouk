import { describe, it, expect } from 'vitest';
import robots from './robots';

describe('robots', () => {
  it('returns valid robots.txt rules and points to sitemap.xml', () => {
    const config = robots();

    expect(config.sitemap).toBe('https://homesbyfarouk.co.ke/sitemap.xml');
    expect(config.rules).toBeDefined();

    const rules = Array.isArray(config.rules) ? config.rules[0] : config.rules;
    expect(rules.allow).toBe('/');
    expect(rules.disallow).toContain('/admin/');
    expect(rules.disallow).toContain('/api/');
  });
});

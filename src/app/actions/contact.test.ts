import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitInquiry } from './contact';
import { saveLead } from '@/lib/leads';
import { Resend } from 'resend';

// Mock the dependencies
vi.mock('@/lib/leads', () => ({
  saveLead: vi.fn().mockResolvedValue(true),
  initLeadsTable: vi.fn().mockResolvedValue(true),
}));

vi.mock('resend', () => {
  return {
    Resend: vi.fn().mockImplementation(function (this: any) {
      this.emails = {
        send: vi.fn().mockResolvedValue({ id: 'mock-id' }),
      };
      return this;
    }),
  };
});

describe('submitInquiry Action', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 'mock_resend_key';
    vi.clearAllMocks();
  });

  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '0712345678',
    inquiryType: 'buy-home',
    message: 'I am interested in buying a luxury villa.',
  };

  it('saves the inquiry to the database', async () => {
    await submitInquiry(validData);
    
    expect(saveLead).toHaveBeenCalledWith({
      name: validData.name,
      email: validData.email,
      phone: validData.phone,
      message: validData.message,
      guideType: `Inquiry: ${validData.inquiryType}`,
    });
  });

  it('returns success message when everything is valid', async () => {
    const result = await submitInquiry(validData);
    expect(result.success).toBe(true);
    expect(result.message).toContain('shortly');
  });

  it('handles missing Resend API key gracefully', async () => {
    delete process.env.RESEND_API_KEY;
    
    const result = await submitInquiry(validData);
    expect(result.success).toBe(true);
    expect(result.message).toContain('skipped');
  });
});

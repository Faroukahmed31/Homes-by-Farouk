import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitInquiry } from './contact';
import { saveLead } from '@/lib/leads';

// Mock the dependencies
vi.mock('@/lib/leads', () => ({
  saveLead: vi.fn().mockResolvedValue(true),
  initLeadsTable: vi.fn().mockResolvedValue(true),
}));

const mockSend = vi.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null });

vi.mock('resend', () => {
  return {
    Resend: vi.fn().mockImplementation(function (this: any) {
      this.emails = {
        send: mockSend,
      };
      return this;
    }),
  };
});

describe('submitInquiry Action', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 'mock_resend_key';
    vi.clearAllMocks();
    mockSend.mockResolvedValue({ data: { id: 'mock-id' }, error: null });
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

  it('sends automated confirmation email to the user with correct from, to, subject and template', async () => {
    const result = await submitInquiry(validData);
    expect(result.success).toBe(true);
    expect(result.message).toContain('shortly');

    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'Farouk Ahmed <farouk@homesbyfarouk.co.ke>',
        to: 'john@example.com',
        subject: 'Thank You for Contacting Homes by Farouk',
        html: expect.stringContaining('Thank you for reaching out, John Doe.'),
        text: expect.stringContaining('Thank you for contacting Homes by Farouk.'),
      })
    );
  });

  it('handles missing Resend API key gracefully', async () => {
    delete process.env.RESEND_API_KEY;
    
    const result = await submitInquiry(validData);
    expect(result.success).toBe(true);
    expect(result.message).toContain('skipped');
  });

  it('handles Resend error response appropriately', async () => {
    mockSend.mockResolvedValueOnce({
      data: null,
      error: { message: 'Domain verification failed', name: 'validation_error' },
    });

    const result = await submitInquiry(validData);
    expect(result.success).toBe(false);
    expect(result.message).toContain('Domain verification failed');
  });
});

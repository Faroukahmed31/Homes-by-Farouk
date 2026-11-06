import { describe, it, expect, vi, beforeEach } from 'vitest';
import { captureLead } from './leads';
import { saveLead } from '@/lib/leads';
import fs from 'fs';

// Mock the dependencies
vi.mock('@/lib/leads', () => ({
  saveLead: vi.fn().mockResolvedValue(true),
  initLeadsTable: vi.fn().mockResolvedValue(true),
}));

const mockSend = vi.fn().mockResolvedValue({ id: 'mock-id' });

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

vi.mock('next/headers', () => ({
  headers: vi.fn().mockResolvedValue({
    get: vi.fn().mockReturnValue(''),
  }),
}));

describe('captureLead Action', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 'mock_resend_key';
    vi.clearAllMocks();
  });

  it('saves the lead to the database', async () => {
    const formData = new FormData();
    formData.append('name', 'Sarah Connor');
    formData.append('email', 'sarah@example.com');
    formData.append('phone', '+254700000000');
    formData.append('guideType', 'local');

    const result = await captureLead(formData);

    expect(result.success).toBe(true);
    expect(saveLead).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Sarah Connor',
        email: 'sarah@example.com',
        phone: '+254700000000',
        guideType: 'local',
      })
    );
  });

  it('sends the email with the local PDF guide attached', async () => {
    const formData = new FormData();
    formData.append('name', 'David Kamau');
    formData.append('email', 'david@example.com');
    formData.append('guideType', 'local');

    await captureLead(formData);

    // Should call Resend twice: once for admin (leads alert without attachment), once for user (with PDF attached)
    expect(mockSend).toHaveBeenCalledTimes(2);

    // Verify admin alert has no attachments (leads info only)
    const adminCall = mockSend.mock.calls.find((call) => call[0].to === 'faroukahmed3121@gmail.com');
    expect(adminCall).toBeDefined();
    expect(adminCall[0].attachments).toBeUndefined();

    // Check user email call has the PDF attached
    const userCall = mockSend.mock.calls.find((call) => call[0].to === 'david@example.com');
    expect(userCall).toBeDefined();
    expect(userCall[0].subject).toContain('The Nairobi Real Estate Playbook');
    expect(userCall[0].attachments).toBeDefined();
    expect(userCall[0].attachments[0].filename).toBe('Homes_by_Farouk_Local_Buyer_Playbook.pdf');
    expect(userCall[0].attachments[0].content).toBeInstanceOf(Buffer);
  });

  it('sends the email with the foreign investor PDF guide attached', async () => {
    const formData = new FormData();
    formData.append('name', 'Michael Scott');
    formData.append('email', 'michael@example.com');
    formData.append('guideType', 'foreign');

    await captureLead(formData);

    const userCall = mockSend.mock.calls.find((call) => call[0].to === 'michael@example.com');
    expect(userCall).toBeDefined();
    expect(userCall[0].subject).toContain('Investing in Nairobi');
    expect(userCall[0].attachments).toBeDefined();
    expect(userCall[0].attachments[0].filename).toBe('Homes_by_Farouk_Foreign_Investor_Guide.pdf');
    expect(userCall[0].attachments[0].content).toBeInstanceOf(Buffer);
  });

  it('handles missing Resend API key gracefully without crashing', async () => {
    delete process.env.RESEND_API_KEY;

    const formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('guideType', 'local');

    const result = await captureLead(formData);
    expect(result.success).toBe(true);
    expect(mockSend).not.toHaveBeenCalled();
  });
});


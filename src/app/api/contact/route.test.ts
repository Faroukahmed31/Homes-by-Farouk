import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import * as contactAction from '@/app/actions/contact';

vi.mock('@/app/actions/contact', () => ({
  submitInquiry: vi.fn(),
}));

describe('/api/contact Route Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 400 when name or email is missing', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.message).toContain('required');
  });

  it('calls submitInquiry and returns 200 on success', async () => {
    vi.mocked(contactAction.submitInquiry).mockResolvedValueOnce({
      success: true,
      message: 'Thank you for contacting Homes by Farouk. We will be in touch shortly!',
    });

    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+254700000000',
        inquiryType: 'Buy',
        message: 'Interested in properties.',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(contactAction.submitInquiry).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+254700000000',
      inquiryType: 'Buy',
      message: 'Interested in properties.',
    });
  });

  it('returns 400 when submitInquiry returns failure', async () => {
    vi.mocked(contactAction.submitInquiry).mockResolvedValueOnce({
      success: false,
      message: 'Email delivery failed.',
    });

    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@example.com',
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.message).toBe('Email delivery failed.');
  });
});


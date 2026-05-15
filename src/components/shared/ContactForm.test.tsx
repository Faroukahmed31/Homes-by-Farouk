import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactForm } from './ContactForm';
import { submitInquiry } from '@/app/actions/contact';

// Mock the server action
vi.mock('@/app/actions/contact', () => ({
  submitInquiry: vi.fn().mockResolvedValue({ success: true, message: 'Success' }),
}));

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Inquiry Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tell us about your investment goals/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<ContactForm />);
    
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(screen.getByText(/Name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '0712345678' } });
    fireEvent.change(screen.getByLabelText(/Inquiry Type/i), { target: { value: 'buy-home' } });
    fireEvent.change(screen.getByLabelText(/Tell us about your investment goals/i), { target: { value: 'I want to buy a house in Nairobi.' } });
    
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);
    
    await waitFor(() => {
      expect(submitInquiry).toHaveBeenCalled();
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Inquiry Received/i)).toBeInTheDocument();
    });
  });
});

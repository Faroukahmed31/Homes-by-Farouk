import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LeadMagnetSplit } from './LeadMagnetSplit';
import * as leadsAction from '@/app/actions/leads';

// Mock the server action
vi.mock('@/app/actions/leads', () => ({
  captureLead: vi.fn(() => Promise.resolve({ success: true }))
}));

describe('LeadMagnetSplit', () => {
  it('shows success message after local playbook submission', async () => {
    render(<LeadMagnetSplit />);
    
    const forms = document.querySelectorAll('form');
    const localForm = forms[0];
    
    const nameInput = localForm.querySelector('input[placeholder*="Full Name"]') as HTMLInputElement;
    const emailInput = localForm.querySelector('input[placeholder*="Email Address"]') as HTMLInputElement;
    const submitButton = localForm.querySelector('button') as HTMLButtonElement;
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Check Your Email!/i)).toBeInTheDocument();
    });
    
    expect(leadsAction.captureLead).toHaveBeenCalled();
  });

  it('shows success message after foreign guide submission', async () => {
    render(<LeadMagnetSplit />);
    
    // Find inputs in the second form (Side B)
    const forms = document.querySelectorAll('form');
    const foreignForm = forms[1];
    
    const nameInput = foreignForm.querySelector('input[placeholder*="Full Name"]') as HTMLInputElement;
    const phoneInput = foreignForm.querySelector('input[placeholder*="Phone Number"]') as HTMLInputElement;
    const submitButton = foreignForm.querySelector('button') as HTMLButtonElement;
    
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(phoneInput, { target: { value: '+123456789' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Guide is on its way!/i)).toBeInTheDocument();
    });
  });
});

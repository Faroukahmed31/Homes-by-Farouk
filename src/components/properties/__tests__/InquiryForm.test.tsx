import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InquiryForm } from '../InquiryForm';
import { Property } from '@/types/property';

// Mock the leads action to avoid database connection errors
vi.mock('@/app/actions/leads', () => ({
  captureLead: vi.fn(() => Promise.resolve({ success: true })),
}));

// Mock the property data
const mockProperty: Property = {
  slug: 'test-property',
  title: 'Test Property',
  location: 'Test Location',
  description: 'Test Description',
  longDescription: ['Line 1', 'Line 2'],
  bedrooms: '3',
  bathrooms: '2',
  squareMeters: '100',
  completionDate: '2025',
  status: 'Ready',
  heroImage: '',
  galleryImages: [],
  units: [],
  amenities: [],
  locationFeatures: [],
  mapImage: '',
};

describe('InquiryForm', () => {
  it('renders correctly with Ready status placeholder', () => {
    render(<InquiryForm property={mockProperty} />);
    expect(screen.getByText(/Inquire About This Unit/i)).toBeInTheDocument();
    
    const messageInput = screen.getByLabelText(/Message/i);
    expect(messageInput).toHaveValue(`I'm interested in Test Property 3 bedroom.`);
  });

  it('renders correctly with Off-Plan status placeholder', () => {
    render(<InquiryForm property={{ ...mockProperty, status: 'Off-Plan' }} />);
    const messageInput = screen.getByLabelText(/Message/i);
    expect(messageInput).toHaveValue(`I'm interested in knowing about the payment plans available for Test Property.`);
  });

  it('updates form fields on user input', () => {
    render(<InquiryForm property={mockProperty} />);
    
    const nameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');
  });

  it('opens WhatsApp with correct message on button click', () => {
    const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<InquiryForm property={mockProperty} />);
    
    const whatsappButton = screen.getByRole('button', { name: /WhatsApp/i });
    fireEvent.click(whatsappButton);
    
    expect(windowSpy).toHaveBeenCalledWith(
      expect.stringContaining('Hi%20Farouk%2C%20I%20am%20interested%20in%20Test%20Property%20in%20Test%20Location...'),
      '_blank'
    );
    windowSpy.mockRestore();
  });
});

'use server';

import { Resend } from 'resend';
import { saveLead } from '@/lib/leads';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function submitInquiry(formData: {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
}) {
  const { name, email, phone, inquiryType, message } = formData;

  console.log(`Inquiry Received: ${name} (${email}) - ${inquiryType}`);

  // Save to database
  await saveLead({ 
    name, 
    email, 
    phone, 
    message, 
    guideType: `Inquiry: ${inquiryType}` 
  });

  // Simulate network delay for UX
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!resend) {
    console.warn('RESEND_API_KEY is missing. Email notification skipped.');
    return { success: true, message: 'Inquiry captured (email skipped)' };
  }

  try {
    // Send notification to Farouk
    await resend.emails.send({
      from: 'Homes by Farouk <onboarding@resend.dev>',
      to: 'faroukahmed3121@gmail.com',
      replyTo: email,
      subject: `New Inquiry: ${inquiryType} from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Inquiry Type: ${inquiryType}
        
        Message:
        ${message}
      `,
    });
    
    return { success: true, message: 'Thank you for your inquiry. We will get back to you shortly!' };
  } catch (error) {
    console.error('Error sending inquiry email:', error);
    return { success: true, message: 'Inquiry captured, but notification failed.' };
  }
}

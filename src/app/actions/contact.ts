'use server';

import { Resend } from 'resend';
import { saveLead } from '@/lib/leads';
import { getConfirmationEmailHtml, getConfirmationEmailText } from '@/lib/email-templates';

const getResend = () => (process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null);

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

  const resend = getResend();
  if (!resend) {
    console.warn('RESEND_API_KEY is missing. Email notification skipped.');
    return { success: true, message: 'Inquiry captured (email skipped)' };
  }

  const senderAddress = 'Farouk Ahmed <farouk@homesbyfarouk.co.ke>';

  try {
    // 1. Send automated confirmation email directly to the user
    const userEmailResult = await resend.emails.send({
      from: senderAddress,
      to: email,
      subject: 'Thank You for Contacting Homes by Farouk',
      html: getConfirmationEmailHtml(name),
      text: getConfirmationEmailText(name),
    });

    if (userEmailResult && 'error' in userEmailResult && userEmailResult.error) {
      console.warn('Resend user confirmation email error:', userEmailResult.error);
      return {
        success: false,
        message: userEmailResult.error.message || 'Failed to send confirmation email.',
      };
    }

    // 2. Also send internal alert to Farouk
    await resend.emails.send({
      from: senderAddress,
      to: 'farouk@homesbyfarouk.co.ke',
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
    }).catch((err) => console.warn('Admin notification notice:', err));
    
    return { 
      success: true, 
      message: 'Thank you for contacting Homes by Farouk. We will be in touch shortly!' 
    };
  } catch (error: any) {
    console.error('Error sending inquiry email:', error);
    return { 
      success: false, 
      message: error?.message || 'Error sending confirmation email.' 
    };
  }
}

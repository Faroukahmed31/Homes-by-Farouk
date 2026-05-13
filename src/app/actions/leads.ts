'use server';

import { Resend } from 'resend';

import { saveLead } from '@/lib/leads';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function captureLead(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const guideType = formData.get('guideType') as string;

  console.log(`Lead Captured: ${name} (${email}) requested ${guideType}`);

  // Save to local storage for the dashboard
  await saveLead({ name, email, guideType });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!resend) {
    console.warn('RESEND_API_KEY is missing. Email skipped.');
    // We still return success: true because we want the user to see the success state 
    // and use the "Download Directly" button we added.
    return { success: true, message: 'Lead captured (email skipped due to configuration)' };
  }

  try {
    // Send notification to admin
    await resend.emails.send({
      from: 'Homes by Farouk <onboarding@resend.dev>',
      to: 'faroukahmed3121@gmail.com',
      replyTo: email,
      subject: `New Lead: ${name} requested ${guideType}`,
      text: `Name: ${name}\nEmail: ${email}\nGuide: ${guideType}`,
    });
    
    // Send the guide to the user
    await resend.emails.send({
      from: 'Homes by Farouk <onboarding@resend.dev>',
      to: email,
      subject: `Your Guide: ${guideType === 'local' ? 'The Nairobi Real Estate Playbook' : 'Investing in Nairobi Guide'}`,
      text: `Hi ${name},\n\nThank you for your interest in Homes by Farouk.\n\nYou can download your guide here: https://homesbyfarouk.com/assets/${guideType === 'local' ? 'Homes_by_Farouk_Local_Buyer_Playbook.pdf' : 'Homes_by_Farouk_Foreign_Investor_Guide.pdf'}\n\nBest regards,\nFarouk Ahmed`,
    });
    
    return { success: true, message: 'Your guide is on its way!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: true, message: 'Lead captured, but there was an error sending the email.' };
  }
}

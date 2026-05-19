'use server';

import { Resend } from 'resend';
import { saveLead } from '@/lib/leads';
import { headers } from 'next/headers';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function captureLead(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string || '';
  const message = formData.get('message') as string || '';
  const guideType = formData.get('guideType') as string;
  
  // Retrieve coordinates passed from the frontend (if allowed by browser geolocation)
  const clientLatVal = formData.get('clientLat');
  const clientLonVal = formData.get('clientLon');
  
  let clientLat = clientLatVal ? Number(clientLatVal) : undefined;
  let clientLon = clientLonVal ? Number(clientLonVal) : undefined;
  let clientCity: string | undefined = undefined;
  let clientCountry: string | undefined = undefined;
  let clientIp: string | undefined = undefined;

  // Fallback to Server IP-based Geolocation if browser coordinates are missing
  if (!clientLat || !clientLon) {
    try {
      const reqHeaders = await headers();
      const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0] || reqHeaders.get('x-real-ip') || '';
      
      if (ip && ip !== '127.0.0.1' && ip !== '::1') {
        clientIp = ip;
        const res = await fetch(`http://ip-api.com/json/${ip}`, { signal: AbortSignal.timeout(2000) });
        if (res.ok) {
          const data = await res.json();
          if (data && data.status === 'success') {
            clientLat = data.lat;
            clientLon = data.lon;
            clientCity = data.city;
            clientCountry = data.country;
          }
        }
      }
    } catch (e) {
      console.warn('IP Geolocation failed or timed out:', e);
    }
  }

  console.log(`Lead Captured: ${name} (${email}) requested ${guideType} (Coords: ${clientLat}, ${clientLon})`);

  // Save to database with geolocation context
  await saveLead({ 
    name, 
    email, 
    phone,
    message,
    guideType,
    clientLat,
    clientLon,
    clientCity,
    clientCountry,
    clientIp
  });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!resend) {
    console.warn('RESEND_API_KEY is missing. Email skipped.');
    return { success: true, message: 'Lead captured (email skipped due to configuration)' };
  }

  try {
    // Send notification to admin
    await resend.emails.send({
      from: 'Homes by Farouk <onboarding@resend.dev>',
      to: 'faroukahmed3121@gmail.com',
      replyTo: email,
      subject: `New Lead: ${name} requested ${guideType}`,
      text: `Name: ${name}\nEmail: ${email}\nGuide/Property: ${guideType}\nPhone: ${phone}\nMessage: ${message}\nLocation: ${clientCity || 'Unknown'}, ${clientCountry || 'Unknown'} (Coords: ${clientLat || 'N/A'}, ${clientLon || 'N/A'})`,
    });
    
    // Send the guide to the user if it was a playbook download
    if (guideType === 'local' || guideType === 'foreign') {
      await resend.emails.send({
        from: 'Homes by Farouk <onboarding@resend.dev>',
        to: email,
        subject: `Your Guide: ${guideType === 'local' ? 'The Nairobi Real Estate Playbook' : 'Investing in Nairobi Guide'}`,
        text: `Hi ${name},\n\nThank you for your interest in Homes by Farouk.\n\nYou can download your guide here: https://homesbyfarouk.com/assets/${guideType === 'local' ? 'Homes_by_Farouk_Local_Buyer_Playbook.pdf' : 'Homes_by_Farouk_Foreign_Investor_Guide.pdf'}\n\nBest regards,\nFarouk Ahmed`,
      });
    }
    
    return { success: true, message: 'Your inquiry has been successfully logged!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: true, message: 'Lead captured, but there was an error sending the email.' };
  }
}

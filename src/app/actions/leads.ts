'use server';

import { Resend } from 'resend';
import { saveLead } from '@/lib/leads';
import { headers } from 'next/headers';
import fs from 'fs';
import path from 'path';

const getResend = () => (process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null);

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

  const resend = getResend();
  if (!resend) {
    console.warn('RESEND_API_KEY is missing. Email skipped.');
    return { success: true, message: 'Lead captured (email skipped due to configuration)' };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Homes by Farouk <onboarding@resend.dev>';

  // Prepare PDF attachment if this was a guide or playbook request
  const isGuideRequest = guideType === 'local' || guideType === 'foreign' || guideType === 'investment-guide' || guideType === 'guide';
  let attachments: { filename: string; content: Buffer }[] = [];
  let guideTitle = '';

  if (isGuideRequest) {
    const isLocal = guideType === 'local';
    const pdfFilename = isLocal 
      ? 'Homes_by_Farouk_Local_Buyer_Playbook.pdf' 
      : 'Homes_by_Farouk_Foreign_Investor_Guide.pdf';
    guideTitle = isLocal
      ? 'The Nairobi Real Estate Playbook: 5 Costly Mistakes'
      : 'The Complete Guide to Investing in Nairobi Real Estate';

    const filePath = path.join(process.cwd(), 'public', 'assets', pdfFilename);

    try {
      if (fs.existsSync(filePath)) {
        attachments = [
          {
            filename: pdfFilename,
            content: fs.readFileSync(filePath),
          },
        ];
      } else {
        console.warn(`Guide PDF not found on disk: ${filePath}`);
      }
    } catch (fileErr) {
      console.warn('Failed to load PDF attachment for lead guide:', fileErr);
    }
  }

  try {
    // Send lead alert ONLY to admin (strictly lead information, no guide attachment)
    const adminSendResult = await resend.emails.send({
      from: fromEmail,
      to: 'farouk@homesbyfarouk.co.ke',
      replyTo: email,
      subject: `New Lead: ${name} requested ${guideType}`,
      text: `Name: ${name}\nEmail: ${email}\nGuide/Property: ${guideType}\nPhone: ${phone}\nMessage: ${message}\nLocation: ${clientCity || 'Unknown'}, ${clientCountry || 'Unknown'} (Coords: ${clientLat || 'N/A'}, ${clientLon || 'N/A'})`,
    });

    if (adminSendResult.error) {
      console.warn('Admin notification email error:', adminSendResult.error);
    }
    
    // Send the guide PDF ONLY to the user's email address
    if (isGuideRequest) {
      const clientName = name?.trim() || 'Investor';

      const userSendResult = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Your Guide: ${guideTitle}`,
        text: `Hi ${clientName},\n\nThank you for your interest in Homes by Farouk.\n\nPlease find your complimentary copy of "${guideTitle}" attached directly to this email as a PDF.\n\nInside, you will find actionable market insights to help you navigate Nairobi's prime residential market, off-plan structures, and safeguarding your capital.\n\nIf you have any questions or would like to discuss current opportunities, feel free to reply directly to this email or reach out on WhatsApp at +254 721 599 075.\n\nWarm regards,\nFarouk Ahmed\nHomes by Farouk\nNairobi, Kenya`,
        ...(attachments.length > 0 ? { attachments } : {}),
      });

      if (userSendResult.error) {
        console.warn('User guide delivery error (Resend domain verification required to send to external recipients):', userSendResult.error);
      }
    }
    
    return { success: true, message: 'Your inquiry has been successfully logged!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: true, message: 'Lead captured, but there was an error sending the email.' };
  }
}

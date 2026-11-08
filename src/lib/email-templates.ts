export function getConfirmationEmailHtml(name: string): string {
  const safeName = name?.trim() || 'Valued Client';
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Homes by Farouk</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A1015; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0A1015; width: 100%; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #11161A; border: 1px solid rgba(212, 175, 55, 0.25); border-radius: 8px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.4);">
          
          <!-- Top Gold Accent Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #D4AF37 0%, #F2CA50 50%, #D4AF37 100%); height: 4px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 36px 36px 24px 36px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #D4AF37;">
                HOMES BY FAROUK
              </h1>
              <p style="margin: 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #8E9BAE;">
                Prime Nairobi Real Estate Advisory
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px;">
              <h2 style="margin: 0 0 20px 0; font-size: 22px; font-weight: 600; color: #FFFFFF; line-height: 1.3;">
                Thank you for reaching out, ${safeName}.
              </h2>

              <p style="margin: 0 0 18px 0; font-size: 15px; line-height: 1.7; color: #D1D5DB;">
                Thank you for your interest in Nairobi&apos;s prime real estate. We have received your inquiry and truly appreciate you considering Homes by Farouk for your property journey.
              </p>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.7; color: #D1D5DB;">
                Whether you are exploring luxury residences in prime nodes like Riverside, Brookside, and Runda, evaluating high-yield off-plan developments, or seeking strategic capital preservation, our team is committed to providing you with clear market insight and access to Nairobi&apos;s most prestigious addresses.
              </p>

              <!-- Confirmation Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 28px 0; background-color: #171E24; border-left: 3px solid #D4AF37; border-radius: 4px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #D4AF37;">
                      Inquiry Confirmed
                    </p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #E5E7EB;">
                      Your message has been safely received. I am personally reviewing your requirements and will be in touch shortly with tailored property recommendations, floor plans, and pricing schedules.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Call to Action / Direct Contact -->
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #9CA3AF;">
                If your inquiry is urgent or you prefer immediate conversation, you can connect directly with me on WhatsApp:
              </p>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 32px 0;">
                <tr>
                  <td style="border-radius: 4px; background-color: #D4AF37;">
                    <a href="https://wa.me/254721599075" target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #0A1015; text-decoration: none; border-radius: 4px;">
                      Chat on WhatsApp (+254 721 599 075)
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Signoff -->
              <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 24px;">
                <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 600; color: #FFFFFF;">
                  Warm regards,
                </p>
                <p style="margin: 0 0 2px 0; font-size: 16px; font-weight: 700; color: #D4AF37;">
                  Farouk Ahmed
                </p>
                <p style="margin: 0; font-size: 13px; color: #8E9BAE; line-height: 1.6;">
                  Homes by Farouk &bull; Nairobi, Kenya<br>
                  <a href="mailto:farouk@homesbyfarouk.co.ke" style="color: #D4AF37; text-decoration: none;">farouk@homesbyfarouk.co.ke</a> &bull; <a href="https://homesbyfarouk.co.ke" style="color: #D4AF37; text-decoration: none;">homesbyfarouk.co.ke</a>
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px; background-color: #0D1217; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05);">
              <p style="margin: 0; font-size: 11px; color: #6B7280; line-height: 1.5;">
                &copy; ${year} Homes by Farouk. All rights reserved.<br>
                Independent Real Estate Consultancy &bull; Prime Nairobi Residential Nodes
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getConfirmationEmailText(name: string): string {
  const safeName = name?.trim() || 'Valued Client';
  return `Hi ${safeName},

Thank you for contacting Homes by Farouk.

Thank you for your interest in Nairobi's prime real estate market. This email confirms that we have received your message.

I am personally reviewing your inquiry and will be in touch with you shortly to discuss your requirements, provide detailed property brochures, pricing schedules, or coordinate a viewing.

If you have urgent questions, you can reach me directly on WhatsApp or mobile at +254 721 599 075 or reply directly to this email.

Warm regards,

Farouk Ahmed
Homes by Farouk
Nairobi, Kenya
Email: farouk@homesbyfarouk.co.ke
Website: https://homesbyfarouk.co.ke
`;
}


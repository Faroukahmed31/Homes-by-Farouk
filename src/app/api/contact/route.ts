import { NextResponse } from 'next/server';
import { submitInquiry } from '@/app/actions/contact';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, inquiryType, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    const result = await submitInquiry({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : '',
      inquiryType: inquiryType ? String(inquiryType).trim() : 'General Inquiry',
      message: message ? String(message).trim() : '',
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Error in /api/contact route:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}

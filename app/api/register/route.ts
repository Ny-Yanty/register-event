import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import type { FormData } from '@/components/register/register-form';

export async function POST(request: Request) {
  // Load environment variables
  const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env;

  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    throw new Error('Missing required environment variables');
  }

  // Set up Google Auth
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const formData: FormData = await request.json();

    const range = 'Registrations!A1'; // Adjust the range based on your sheet

    // Prepare formData for insertion
    console.log(formData)
    const values = [
      [
        formData.fullName || '',
        formData.gender || '',
        formData.age || '',
        formData.educationLevel || '',
        formData.schoolName || '',
        formData.preferredMajor || '',
        formData.IELTS || '',
        formData.email || '',
        formData.appointmentPreference || '',
        formData.selectedTimeSlot?.date || '',
        formData.selectedTimeSlot?.time || '',
      ],
    ];
    const resource = {
      values,
    };

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range,
      requestBody: resource,
      valueInputOption: 'RAW'
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

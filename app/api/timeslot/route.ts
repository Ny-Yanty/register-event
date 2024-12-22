import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

interface TimeSlot {
  date: string;
  time: string;
  maxCapacity: number;
}

interface TimeSlotCounts {
  [key: string]: number;
}

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
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

    // Define ranges
    const timeSlotRange = 'TimeSlots!A1:C'; // Add columns for Date, Time, and Max Capacity
    const registrationRange = 'Registrations!A1:M'; // Replace with your registration sheet name and range

    // Fetch time slot data
    const timeSlotResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: timeSlotRange,
    });

    const timeSlotRows = timeSlotResponse.data.values || [];
    const timeSlots: TimeSlot[] = timeSlotRows.slice(1).map((row) => ({
      date: row[0], // Assuming the first column is the date
      time: row[1], // Assuming the second column is the time
      maxCapacity: parseInt(row[2], 10), // Assuming the third column is the max capacity
    }));

    // Fetch registration data
    const registrationResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: registrationRange,
    });

    const registrationRows = registrationResponse.data.values || [];
    const timeSlotCounts: TimeSlotCounts = {};

    // Count registrations per time slot
    registrationRows.forEach((row) => {
      const dateTime = `${row[11]}-${row[12]}`; // Assuming date is in the 10th column
      if (dateTime) {
        timeSlotCounts[dateTime] = (timeSlotCounts[dateTime] || 0) + 1;
      }
    });

    // Format response data
    const formattedData = timeSlots.reduce((acc: any[], slot) => {
      const currentCount = timeSlotCounts[`${slot.date}-${slot.time}`] || 0;
      const isAvailable = currentCount < slot.maxCapacity;

      // Find or create an entry for the date
      let dateEntry = acc.find((entry) => entry.date === slot.date);
      if (!dateEntry) {
        dateEntry = { date: slot.date, slots: [] };
        acc.push(dateEntry);
      }

      // Add the time slot to the date entry
      dateEntry.slots.push({ time: slot.time, available: isAvailable });

      return acc;
    }, []);
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error('Error fetching time slots:', error.message);
    return NextResponse.json({ message: 'Internal server error', error: error.message });
  }
}

import { FormData } from "@/components/register/register-form";

export async function submitToGoogleSheets(formData: FormData) {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}

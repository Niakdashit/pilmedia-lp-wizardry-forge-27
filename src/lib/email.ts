import { resend } from './resend';

export const sendBasicEmail = async (to: string, subject: string, html: string) => {
  try {
    if (!to || !subject || !html) {
      throw new Error('Missing required email parameters');
    }

    const res = await resend.emails.send({
      from: 'Leadya <contact@leadya.fr>',
      to,
      subject,
      html,
    });

    if (!res || !res.data || !res.data.id) {
      console.error('❌ Invalid response from Resend:', res);
      throw new Error('Email service returned invalid response');
    }

    return res.data.id;
  } catch (error: any) {
    console.error('❌ Resend API Error:', {
      message: error?.message,
      stack: error?.stack,
      to,
      subject,
    });

    throw new Error(`Email service error: ${error?.message || 'Unknown error'}`);
  }
};

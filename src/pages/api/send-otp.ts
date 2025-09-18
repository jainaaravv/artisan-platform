// pages/api/send-otp.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

if (!process.env.SENDGRID_API_KEY) {
  console.error("❌ SENDGRID_API_KEY is not defined");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}
console.log("SendGrid API Key:", process.env.SENDGRID_API_KEY);
console.log("Verified Email:", process.env.SENDGRID_VERIFIED_EMAIL);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 5);

  try {
    // Insert OTP into Supabase using Admin client (bypasses RLS)
    console.log("Handling OTP request for email:", email);

const { data, error } = await supabaseAdmin
  .from('otps')
  .insert([
    {
      id: randomUUID(),
      email,
      otp,
      expires: expires.toISOString(),
    },
  ])
  .select();

console.log("Insert response:", data, error);


    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ message: 'DB insert error', error: error.message });
    }

    // Send OTP via SendGrid
    const msg = {
      to: email,
      from: 'helpartisans990@gmail.com', // Use your verified sender address
      subject: 'Your Login OTP',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };

    await sgMail.send(msg);

    return res.status(200).json({ message: 'OTP sent successfully' });

  } catch (error: any) {
    console.error('Unexpected server error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
  

}
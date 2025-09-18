import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const { data, error } = await supabase
    .from('otps')
    .select('*')
    .eq('email', email)
    .order('expires', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  if (data.otp !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  if (Date.now() > data.expires) {
    return res.status(400).json({ message: 'OTP has expired' });
  }

  // ✅ OTP verified! You can now log the user in or create a session.

  return res.status(200).json({ message: 'OTP verified successfully' });
}
import { createClient } from "@supabase/supabase-js";

// Replace these with your own Supabase Project URL and anon key
const supabaseUrl = "https://lxuixmnqcdpxrtzbfppd.supabase.co";  // Paste your Project URL here (from Supabase API settings)
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dWl4bW5xY2RweHJ0emJmcHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODU1MzgsImV4cCI6MjA3Mjc2MTUzOH0.ZpHAJgz0-NTsGvyM92E9kqxpVsrov0umjUpS-5uaR5g";         // Paste your anon public key here (from Supabase API Keys)

// Initialize and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

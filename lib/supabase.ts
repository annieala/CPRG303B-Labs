// lib/supabase.ts - Minimal version
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pyjwwfwoovhlbhqfusdv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5and3Zndvb3ZobGJocWZ1c2R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTkxMDgsImV4cCI6MjA2ODE3NTEwOH0.6jZkDUmd4f9kp_NuME1fy5d6C8iSmJrdDJeN7DhyxiE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
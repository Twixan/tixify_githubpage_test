import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://lvrpwceetvgdwpzjidxm.supabase.co'; // Replace with your Supabase project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2cnB3Y2VldHZnZHdwemppZHhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODc1NTIxOSwiZXhwIjoyMDE0MzMxMjE5fQ.rZ5dXoI3MR-lrXFJHLD_VqEQRMJmOI4KUX6lZ0ycHGs'; // Replace with your Supabase anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
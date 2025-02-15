import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgqjctqwswcdczfxblvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZncWpjdHF3c3djZGN6ZnhibHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MzA2ODIsImV4cCI6MjA1NTIwNjY4Mn0.gu4lTk52SjccDdQmNnCnN5ncU_LYTJMZ4fb2Lwxycxg';

export const supabase = createClient(supabaseUrl, supabaseKey);
import { createClient } from '@supabase/supabase-js';
// FIX: Import User and Session types directly from auth package to resolve module export errors.
import type { User, Session } from '@supabase/gotrue-js';

// IMPORTANT: Replace with your Supabase project's URL and Anon Key
const supabaseUrl = 'https://oqasxrkbosdqaldwydeu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xYXN4cmtib3NkcWFsZHd5ZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1OTUzNTEsImV4cCI6MjA3MjE3MTM1MX0.41vviHDSO0CiSI6FxLsdKx4iYDw1E4uUApMmFFWFC8A';

// The createClient function will throw an error if credentials are missing or invalid.

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// FIX: Export correct types from Supabase v2 client library.
export type { User, Session };
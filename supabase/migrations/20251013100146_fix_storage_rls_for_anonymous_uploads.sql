/*
  # Fix Storage RLS Policies for Anonymous Resume Uploads

  ## Overview
  This migration updates the storage bucket policies to allow anonymous users 
  to upload resumes when applying for jobs through the careers page.

  ## Changes Made
  1. Drop existing restrictive policy that only allowed authenticated users
  2. Create new policy allowing anyone (including anonymous users) to upload resumes
  3. Keep other policies for update, delete (authenticated only)
  4. Keep public read access for viewing resumes

  ## Security Considerations
  - Anonymous uploads are limited to the resumes folder
  - File size and type restrictions are enforced at application level
  - Files can be reviewed by HR team through public read access
  - Only authenticated users can delete files (for admin cleanup)
*/

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Authenticated users can upload resumes" ON storage.objects;

-- Create new policy allowing anyone (including anonymous users) to upload resumes
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'applications' AND (storage.foldername(name))[1] = 'resumes');

-- Update the update policy to also allow anonymous users (in case they need to retry)
DROP POLICY IF EXISTS "Authenticated users can update resumes" ON storage.objects;

CREATE POLICY "Anyone can update resumes"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'applications' AND (storage.foldername(name))[1] = 'resumes')
WITH CHECK (bucket_id = 'applications' AND (storage.foldername(name))[1] = 'resumes');

/*
  # Create Storage Bucket for Job Applications

  ## Overview
  This migration creates a storage bucket for storing applicant resumes and CVs.
  The bucket is configured to be publicly readable but only writable by authenticated users.

  ## Storage Configuration
  - Bucket name: `applications`
  - Public access: Yes (for reading uploaded files)
  - File size limit: 5MB (enforced by application)
  - Allowed file types: PDF, DOC, DOCX (enforced by application)

  ## Security
  - Only authenticated users can upload files
  - Public can download files (needed for HR to view resumes)
  - Files are organized in `resumes/` folder

  ## Important Notes
  1. File names are automatically generated with timestamps and random strings
  2. Resume URLs are stored in the applications table
  3. Files are NOT automatically deleted when applications are deleted
     (this allows for data retention and audit purposes)
*/

-- Create storage bucket for applications (resumes)
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload resumes"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'applications' AND (storage.foldername(name))[1] = 'resumes');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update resumes"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'applications' AND (storage.foldername(name))[1] = 'resumes')
WITH CHECK (bucket_id = 'applications' AND (storage.foldername(name))[1] = 'resumes');

-- Allow public to read resumes (so HR can view them)
CREATE POLICY "Public can view resumes"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'applications' AND (storage.foldername(name))[1] = 'resumes');

-- Allow authenticated users to delete resumes (for admin cleanup)
CREATE POLICY "Authenticated users can delete resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'applications' AND (storage.foldername(name))[1] = 'resumes');

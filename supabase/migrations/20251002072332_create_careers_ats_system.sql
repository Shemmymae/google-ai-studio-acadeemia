/*
  # Careers Management / ATS System

  ## Overview
  This migration creates a comprehensive Applicant Tracking System (ATS) for company career management.
  The system supports job postings, application tracking, candidate management, and interview scheduling.

  ## New Tables

  ### 1. `jobs`
  Main table for job postings and openings
  - `id` (uuid, primary key) - Unique job identifier
  - `title` (text, not null) - Job title/position name
  - `description` (text) - Detailed job description and responsibilities
  - `requirements` (text) - Job requirements and qualifications
  - `location` (text) - Job location (office, remote, hybrid)
  - `employment_type` (text) - Full-time, Part-time, Contract, Internship
  - `salary_range` (text) - Salary range information
  - `salary_min` (numeric) - Minimum salary amount
  - `salary_max` (numeric) - Maximum salary amount
  - `currency` (text) - Currency code (USD, EUR, KES, etc.)
  - `department` (text) - Department/team name
  - `experience_level` (text) - Entry, Mid, Senior, Executive
  - `status` (text, not null, default 'draft') - draft, published, closed, archived
  - `application_deadline` (timestamptz) - Last date to accept applications
  - `created_by` (uuid) - User who created the job
  - `created_at` (timestamptz, default now()) - Creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp
  - `published_at` (timestamptz) - When the job was published
  - `closed_at` (timestamptz) - When the job was closed

  ### 2. `applications`
  Tracks all job applications
  - `id` (uuid, primary key) - Unique application identifier
  - `job_id` (uuid, foreign key to jobs) - Associated job posting
  - `candidate_name` (text, not null) - Candidate's full name
  - `candidate_email` (text, not null) - Candidate's email address
  - `candidate_phone` (text) - Contact phone number
  - `resume_url` (text) - URL to uploaded resume/CV
  - `cover_letter` (text) - Cover letter text
  - `linkedin_url` (text) - LinkedIn profile URL
  - `portfolio_url` (text) - Portfolio website URL
  - `years_experience` (numeric) - Total years of experience
  - `current_company` (text) - Current employer name
  - `current_position` (text) - Current job title
  - `status` (text, not null, default 'applied') - applied, under_review, interview_scheduled, rejected, hired
  - `applied_at` (timestamptz, default now()) - Application submission timestamp
  - `reviewed_at` (timestamptz) - When application was first reviewed
  - `reviewed_by` (uuid) - Reviewer user ID
  - `rating` (numeric) - Rating from 1-5
  - `notes` (text) - Internal notes about candidate
  - `rejection_reason` (text) - Reason for rejection (if applicable)
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ### 3. `interviews`
  Manages interview scheduling and outcomes
  - `id` (uuid, primary key) - Unique interview identifier
  - `application_id` (uuid, foreign key to applications) - Associated application
  - `interview_type` (text, not null) - phone_screen, technical, behavioral, panel, final
  - `scheduled_at` (timestamptz, not null) - Interview date and time
  - `duration_minutes` (integer, default 60) - Expected duration
  - `location` (text) - Physical location or video conference link
  - `interviewer_ids` (uuid[]) - Array of interviewer user IDs
  - `status` (text, not null, default 'scheduled') - scheduled, completed, cancelled, rescheduled
  - `notes` (text) - Interview notes and feedback
  - `rating` (numeric) - Interview rating from 1-5
  - `outcome` (text) - pass, fail, needs_followup
  - `created_at` (timestamptz, default now()) - Creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp
  - `completed_at` (timestamptz) - When interview was marked complete

  ### 4. `application_status_history`
  Audit trail for application status changes
  - `id` (uuid, primary key) - Unique history record identifier
  - `application_id` (uuid, foreign key to applications) - Associated application
  - `old_status` (text) - Previous status
  - `new_status` (text, not null) - New status
  - `changed_by` (uuid) - User who made the change
  - `notes` (text) - Reason or notes for status change
  - `changed_at` (timestamptz, default now()) - Change timestamp

  ## Security
  - All tables have Row Level Security (RLS) enabled
  - Public can view published jobs
  - Only authenticated users can manage applications
  - Status history is automatically tracked

  ## Indexes
  - Indexed foreign keys for optimal query performance
  - Status and date fields indexed for filtering
  - Email indexed for candidate lookup

  ## Important Notes
  1. All monetary values stored with currency codes for multi-currency support
  2. Status values are text-based for flexibility and easy extension
  3. Interview times stored in UTC with timezone support
  4. All timestamps include timezone information
  5. Resume URLs point to Supabase storage (to be configured separately)
*/

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  requirements text,
  location text,
  employment_type text,
  salary_range text,
  salary_min numeric,
  salary_max numeric,
  currency text DEFAULT 'USD',
  department text,
  experience_level text,
  status text NOT NULL DEFAULT 'draft',
  application_deadline timestamptz,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz,
  closed_at timestamptz
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  candidate_name text NOT NULL,
  candidate_email text NOT NULL,
  candidate_phone text,
  resume_url text,
  cover_letter text,
  linkedin_url text,
  portfolio_url text,
  years_experience numeric,
  current_company text,
  current_position text,
  status text NOT NULL DEFAULT 'applied',
  applied_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid,
  rating numeric CHECK (rating >= 1 AND rating <= 5),
  notes text,
  rejection_reason text,
  updated_at timestamptz DEFAULT now()
);

-- Create interviews table
CREATE TABLE IF NOT EXISTS interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE NOT NULL,
  interview_type text NOT NULL,
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  location text,
  interviewer_ids uuid[],
  status text NOT NULL DEFAULT 'scheduled',
  notes text,
  rating numeric CHECK (rating >= 1 AND rating <= 5),
  outcome text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Create application status history table
CREATE TABLE IF NOT EXISTS application_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE NOT NULL,
  old_status text,
  new_status text NOT NULL,
  changed_by uuid,
  notes text,
  changed_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_by ON jobs(created_by);
CREATE INDEX IF NOT EXISTS idx_jobs_published_at ON jobs(published_at);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at);

CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(candidate_email);
CREATE INDEX IF NOT EXISTS idx_applications_applied_at ON applications(applied_at);
CREATE INDEX IF NOT EXISTS idx_applications_reviewed_by ON applications(reviewed_by);

CREATE INDEX IF NOT EXISTS idx_interviews_application_id ON interviews(application_id);
CREATE INDEX IF NOT EXISTS idx_interviews_scheduled_at ON interviews(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_interviews_status ON interviews(status);

CREATE INDEX IF NOT EXISTS idx_status_history_application_id ON application_status_history(application_id);
CREATE INDEX IF NOT EXISTS idx_status_history_changed_at ON application_status_history(changed_at);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_status_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for jobs table
-- Allow public to view published jobs
CREATE POLICY "Anyone can view published jobs"
  ON jobs FOR SELECT
  USING (status = 'published');

-- Authenticated users can view all jobs
CREATE POLICY "Authenticated users can view all jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert jobs
CREATE POLICY "Authenticated users can insert jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update jobs
CREATE POLICY "Authenticated users can update jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete jobs
CREATE POLICY "Authenticated users can delete jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for applications table
-- Authenticated users can view all applications
CREATE POLICY "Authenticated users can view all applications"
  ON applications FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert applications
CREATE POLICY "Authenticated users can insert applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update applications
CREATE POLICY "Authenticated users can update applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete applications
CREATE POLICY "Authenticated users can delete applications"
  ON applications FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for interviews table
-- Authenticated users can view all interviews
CREATE POLICY "Authenticated users can view all interviews"
  ON interviews FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert interviews
CREATE POLICY "Authenticated users can insert interviews"
  ON interviews FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update interviews
CREATE POLICY "Authenticated users can update interviews"
  ON interviews FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete interviews
CREATE POLICY "Authenticated users can delete interviews"
  ON interviews FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for application_status_history table
-- Authenticated users can view status history
CREATE POLICY "Authenticated users can view status history"
  ON application_status_history FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert status history
CREATE POLICY "Authenticated users can insert status history"
  ON application_status_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to auto-update updated_at columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_jobs_updated_at'
  ) THEN
    CREATE TRIGGER update_jobs_updated_at
      BEFORE UPDATE ON jobs
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_applications_updated_at'
  ) THEN
    CREATE TRIGGER update_applications_updated_at
      BEFORE UPDATE ON applications
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_interviews_updated_at'
  ) THEN
    CREATE TRIGGER update_interviews_updated_at
      BEFORE UPDATE ON interviews
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Create trigger function to log application status changes
CREATE OR REPLACE FUNCTION log_application_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO application_status_history (application_id, old_status, new_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, NEW.reviewed_by);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to automatically log status changes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'log_application_status_changes'
  ) THEN
    CREATE TRIGGER log_application_status_changes
      AFTER UPDATE ON applications
      FOR EACH ROW
      EXECUTE FUNCTION log_application_status_change();
  END IF;
END $$;
/*
  # Careers Management / ATS System

  ## Overview
  This migration creates a comprehensive Applicant Tracking System (ATS) for company career management.
  The system supports job postings, application tracking, candidate management, and interview scheduling.

  ## New Tables

  ### 1. `jobs`
  Main table for job postings and openings
  - Complete job information with status tracking
  - Support for salary ranges and multi-currency
  - Department and experience level categorization

  ### 2. `applications`
  Tracks all job applications
  - Candidate information and contact details
  - Application status workflow
  - Rating and review system

  ### 3. `interviews`
  Manages interview scheduling and outcomes
  - Multiple interview types support
  - Interviewer tracking
  - Outcome and rating system

  ### 4. `application_status_history`
  Audit trail for application status changes
  - Automatic logging of status changes
  - User tracking for accountability

  ## Security
  - All tables have Row Level Security (RLS) enabled
  - Public can view published jobs
  - Public can submit job applications (anonymous applications allowed)
  - Only authenticated users can manage applications
  - Status history is automatically tracked

  ## Indexes
  - Indexed foreign keys for optimal query performance
  - Status and date fields indexed for filtering
  - Email indexed for candidate lookup
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
CREATE POLICY "Anyone can view published jobs"
  ON jobs FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for applications table
CREATE POLICY "Anyone can submit job applications"
  ON applications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all applications"
  ON applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete applications"
  ON applications FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for interviews table
CREATE POLICY "Authenticated users can view all interviews"
  ON interviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert interviews"
  ON interviews FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update interviews"
  ON interviews FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete interviews"
  ON interviews FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for application_status_history table
CREATE POLICY "Authenticated users can view status history"
  ON application_status_history FOR SELECT
  TO authenticated
  USING (true);

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

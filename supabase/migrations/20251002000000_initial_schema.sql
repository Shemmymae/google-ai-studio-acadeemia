/*
  # Initial Database Schema for Acadeemia

  ## Overview
  This migration creates the foundational database schema for the Acadeemia school management system.
  It includes user profiles, schools, and all necessary base tables.

  ## New Tables

  ### 1. `user_profiles`
  Stores user profile information and role assignments
  - `id` (uuid, primary key) - Matches auth.users.id
  - `full_name` (text) - User's full name
  - `email` (text) - User's email address
  - `phone` (text) - Contact phone number
  - `role` (text, not null) - User role (Super Admin, School Admin, Teacher, etc.)
  - `school_id` (uuid) - Associated school reference
  - `avatar_url` (text) - Profile picture URL
  - `is_active` (boolean, default true) - Account active status
  - `created_at` (timestamptz, default now()) - Creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ### 2. `schools`
  Stores school/institution information
  - `id` (uuid, primary key) - Unique school identifier
  - `name` (text, not null) - School name
  - `address` (text) - Physical address
  - `phone` (text) - Contact phone
  - `email` (text) - Contact email
  - `website` (text) - School website
  - `logo_url` (text) - School logo URL
  - `is_active` (boolean, default true) - Active status
  - `subscription_status` (text, default 'trial') - Subscription status
  - `created_at` (timestamptz, default now()) - Creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ### 3. `students`
  Stores student information
  - `id` (uuid, primary key) - Unique student identifier
  - `school_id` (uuid, foreign key) - Associated school
  - `first_name` (text, not null) - Student's first name
  - `last_name` (text, not null) - Student's last name
  - `email` (text) - Student email
  - `phone` (text) - Contact phone
  - `date_of_birth` (date) - Date of birth
  - `gender` (text) - Gender
  - `admission_number` (text) - Unique admission number
  - `admission_date` (date) - Date of admission
  - `class` (text) - Current class/grade
  - `section` (text) - Section/division
  - `is_active` (boolean, default true) - Active status
  - `created_at` (timestamptz, default now()) - Creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ## Security
  - All tables have Row Level Security (RLS) enabled
  - Super Admins have full access
  - School staff can only access their school's data
  - Proper authentication checks on all policies

  ## Indexes
  - Indexed foreign keys for optimal query performance
  - Email and role fields indexed for user lookups
  - School relationships indexed

  ## Important Notes
  1. The `user_profiles` table is automatically populated when users sign up
  2. Super Admin role has unrestricted access across all schools
  3. All timestamps include timezone information
  4. Active flags allow soft deletion of records
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  phone text,
  role text NOT NULL DEFAULT 'Teacher',
  school_id uuid,
  avatar_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  phone text,
  email text,
  website text,
  logo_url text,
  is_active boolean DEFAULT true,
  subscription_status text DEFAULT 'trial',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add foreign key to user_profiles after schools table exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'user_profiles_school_id_fkey'
  ) THEN
    ALTER TABLE user_profiles
    ADD CONSTRAINT user_profiles_school_id_fkey
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  date_of_birth date,
  gender text,
  admission_number text,
  admission_date date,
  class text,
  section text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_school_id ON user_profiles(school_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

CREATE INDEX IF NOT EXISTS idx_schools_is_active ON schools(is_active);
CREATE INDEX IF NOT EXISTS idx_schools_subscription_status ON schools(subscription_status);

CREATE INDEX IF NOT EXISTS idx_students_school_id ON students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_admission_number ON students(admission_number);
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class);
CREATE INDEX IF NOT EXISTS idx_students_is_active ON students(is_active);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles table
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Super Admins can view all profiles
CREATE POLICY "Super Admins can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'Super Admin'
    )
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Super Admins can insert profiles
CREATE POLICY "Super Admins can insert profiles"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'Super Admin'
    )
  );

-- Super Admins can update profiles
CREATE POLICY "Super Admins can update profiles"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'Super Admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'Super Admin'
    )
  );

-- Allow authenticated users to insert their own profile (for initial setup)
CREATE POLICY "Users can create own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for schools table
-- Super Admins can view all schools
CREATE POLICY "Super Admins can view all schools"
  ON schools FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'Super Admin'
    )
  );

-- School staff can view their school
CREATE POLICY "School staff can view their school"
  ON schools FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT school_id FROM user_profiles
      WHERE id = auth.uid()
    )
  );

-- Super Admins can insert schools
CREATE POLICY "Super Admins can insert schools"
  ON schools FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'Super Admin'
    )
  );

-- Super Admins can update schools
CREATE POLICY "Super Admins can update schools"
  ON schools FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'Super Admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'Super Admin'
    )
  );

-- Super Admins can delete schools
CREATE POLICY "Super Admins can delete schools"
  ON schools FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'Super Admin'
    )
  );

-- RLS Policies for students table
-- Super Admins can view all students
CREATE POLICY "Super Admins can view all students"
  ON students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'Super Admin'
    )
  );

-- School staff can view their school's students
CREATE POLICY "School staff can view their students"
  ON students FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM user_profiles
      WHERE id = auth.uid()
    )
  );

-- School staff can insert students
CREATE POLICY "School staff can insert students"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (
    school_id IN (
      SELECT school_id FROM user_profiles
      WHERE id = auth.uid()
    )
  );

-- School staff can update their school's students
CREATE POLICY "School staff can update students"
  ON students FOR UPDATE
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM user_profiles
      WHERE id = auth.uid()
    )
  )
  WITH CHECK (
    school_id IN (
      SELECT school_id FROM user_profiles
      WHERE id = auth.uid()
    )
  );

-- School staff can delete their school's students
CREATE POLICY "School staff can delete students"
  ON students FOR DELETE
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM user_profiles
      WHERE id = auth.uid()
    )
  );

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
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_user_profiles_updated_at
      BEFORE UPDATE ON user_profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_schools_updated_at'
  ) THEN
    CREATE TRIGGER update_schools_updated_at
      BEFORE UPDATE ON schools
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_students_updated_at'
  ) THEN
    CREATE TRIGGER update_students_updated_at
      BEFORE UPDATE ON students
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

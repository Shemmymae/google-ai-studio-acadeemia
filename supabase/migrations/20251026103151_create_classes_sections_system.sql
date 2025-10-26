/*
  # Create Classes and Sections Management System

  ## Overview
  This migration creates the academic class and section management system for schools.
  It includes branches, classes, and sections with proper relationships.

  ## New Tables

  ### 1. `branches`
  Stores school branch/campus information
  - `id` (uuid, primary key) - Unique branch identifier
  - `name` (text, not null) - Branch name
  - `code` (text, unique) - Branch code
  - `address` (text) - Branch address
  - `is_active` (boolean, default true) - Active status
  - `created_at` (timestamptz, default now()) - Creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ### 2. `classes`
  Stores class information
  - `id` (uuid, primary key) - Unique class identifier
  - `branch_id` (uuid, not null) - Foreign key to branches
  - `name` (text, not null) - Class name (e.g., "Six", "Seven")
  - `class_numeric` (integer, not null) - Numeric value for sorting
  - `section` (text, not null) - Section name (e.g., "A", "B")
  - `created_at` (timestamptz, default now()) - Creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ### 3. `sections`
  Stores section information with capacity
  - `id` (uuid, primary key) - Unique section identifier
  - `branch_id` (uuid, not null) - Foreign key to branches
  - `name` (text, not null) - Section name (e.g., "A", "B")
  - `capacity` (integer, default 0) - Maximum students allowed
  - `created_at` (timestamptz, default now()) - Creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ## Security
  - RLS enabled on all tables
  - Authenticated users can manage all records
  - Public read access disabled

  ## Indexes
  - Index on branch_id for foreign key relationships
  - Index on class_numeric for sorting
*/

-- Create branches table
CREATE TABLE IF NOT EXISTS branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text UNIQUE,
  address text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name text NOT NULL,
  class_numeric integer NOT NULL,
  section text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
  name text NOT NULL,
  capacity integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_classes_branch_id ON classes(branch_id);
CREATE INDEX IF NOT EXISTS idx_classes_numeric ON classes(class_numeric);
CREATE INDEX IF NOT EXISTS idx_sections_branch_id ON sections(branch_id);

-- Enable Row Level Security
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for branches
CREATE POLICY "Authenticated users can view branches"
  ON branches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert branches"
  ON branches FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update branches"
  ON branches FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete branches"
  ON branches FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for classes
CREATE POLICY "Authenticated users can view classes"
  ON classes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert classes"
  ON classes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update classes"
  ON classes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete classes"
  ON classes FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for sections
CREATE POLICY "Authenticated users can view sections"
  ON sections FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert sections"
  ON sections FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sections"
  ON sections FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sections"
  ON sections FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample branches
INSERT INTO branches (name, code, address) VALUES
('Icon School & College', 'ISC001', '123 Education Street, City Center'),
('Oxford International', 'OXF001', '456 Academic Avenue, Downtown');

-- Insert sample sections
INSERT INTO sections (branch_id, name, capacity)
SELECT b.id, 'A', 100 FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'B', 100 FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'A', 35 FROM branches b WHERE b.code = 'OXF001'
UNION ALL
SELECT b.id, 'B', 30 FROM branches b WHERE b.code = 'OXF001';

-- Insert sample classes
INSERT INTO classes (branch_id, name, class_numeric, section)
SELECT b.id, 'Six', 6, 'A' FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'Six', 6, 'B' FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'Seven', 7, 'A' FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'Seven', 7, 'B' FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'Eight', 8, 'A' FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'Eight', 8, 'B' FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'Nine', 9, 'A' FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'Nine', 9, 'B' FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'Ten', 10, 'A' FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'Ten', 10, 'B' FROM branches b WHERE b.code = 'ISC001'
UNION ALL
SELECT b.id, 'Six', 6, 'A' FROM branches b WHERE b.code = 'OXF001'
UNION ALL
SELECT b.id, 'Six', 6, 'B' FROM branches b WHERE b.code = 'OXF001'
UNION ALL
SELECT b.id, 'Seven', 7, 'A' FROM branches b WHERE b.code = 'OXF001'
UNION ALL
SELECT b.id, 'Seven', 7, 'B' FROM branches b WHERE b.code = 'OXF001'
UNION ALL
SELECT b.id, 'Eight', 8, 'A' FROM branches b WHERE b.code = 'ISC001';

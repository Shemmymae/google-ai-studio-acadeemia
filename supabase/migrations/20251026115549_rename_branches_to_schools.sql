/*
  # Rename branches table to schools

  ## Overview
  This migration renames the `branches` table to `schools` and updates all related
  foreign key columns from `branch_id` to `school_id` for consistency.

  ## Changes Made
  1. Rename `branches` table to `schools`
  2. Rename `branch_id` columns to `school_id` in:
     - `classes` table
     - `sections` table
  3. Update all indexes and constraints accordingly
  4. RLS policies are automatically transferred with the table rename

  ## Security
  - All existing RLS policies remain intact
  - No changes to security model
*/

-- Rename the branches table to schools
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'branches') THEN
    ALTER TABLE branches RENAME TO schools;
  END IF;
END $$;

-- Rename branch_id column to school_id in classes table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'classes' AND column_name = 'branch_id'
  ) THEN
    ALTER TABLE classes RENAME COLUMN branch_id TO school_id;
  END IF;
END $$;

-- Rename branch_id column to school_id in sections table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'sections' AND column_name = 'branch_id'
  ) THEN
    ALTER TABLE sections RENAME COLUMN branch_id TO school_id;
  END IF;
END $$;

-- Rename indexes
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_classes_branch_id') THEN
    ALTER INDEX idx_classes_branch_id RENAME TO idx_classes_school_id;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_sections_branch_id') THEN
    ALTER INDEX idx_sections_branch_id RENAME TO idx_sections_school_id;
  END IF;
END $$;

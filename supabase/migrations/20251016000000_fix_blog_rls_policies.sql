/*
  # Fix Blog RLS Policies

  ## Overview
  Updates the blog_posts RLS policies to allow Super Admins and authenticated users
  to manage all blog content, fixing the issue where saving posts was stuck.

  ## Changes
  - Drop existing restrictive UPDATE and DELETE policies
  - Create new policies that allow:
    - Super Admins to update/delete any post
    - Authenticated users to update/delete any post (for blog management)
  - This ensures the blog manager can function properly

  ## Security Notes
  - Still maintains authentication requirement
  - Public users can only read published posts
  - All blog management requires authentication
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authors can update own posts" ON blog_posts;
DROP POLICY IF EXISTS "Authors can delete own posts" ON blog_posts;

-- Create new permissive policies for authenticated users
-- This allows Super Admins and blog managers to edit all posts
CREATE POLICY "Authenticated users can update all posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete all posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Add policy to allow Super Admins full control (redundant but explicit)
CREATE POLICY "Super Admins can manage all posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'Super Admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'Super Admin'
    )
  );

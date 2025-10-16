/*
  # Create Affiliate Tools System

  ## Overview
  This migration creates the affiliate tools system for the Acadeemia platform.
  It stores recommended tools and resources with affiliate links for the Affiliate Picks page.

  ## New Tables

  ### 1. `affiliate_tools`
  Stores affiliate tool information and links
  - Complete tool details with logo, description, and affiliate links
  - Active status for show/hide control
  - Display order for custom sorting
  - Category support for grouping

  ## Security
  - RLS enabled on affiliate_tools table
  - Public read access for active tools
  - Only authenticated users can manage tools

  ## Indexes
  - Index on display_order for sorting
  - Index on is_active for filtering active tools
  - Index on category for grouping
*/

-- Create affiliate_tools table
CREATE TABLE IF NOT EXISTS affiliate_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  logo_url text NOT NULL,
  affiliate_link text NOT NULL,
  category text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_affiliate_tools_display_order ON affiliate_tools(display_order);
CREATE INDEX IF NOT EXISTS idx_affiliate_tools_active ON affiliate_tools(is_active);
CREATE INDEX IF NOT EXISTS idx_affiliate_tools_category ON affiliate_tools(category);

-- Enable Row Level Security
ALTER TABLE affiliate_tools ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can view active tools
CREATE POLICY "Anyone can view active affiliate tools"
  ON affiliate_tools FOR SELECT
  USING (is_active = true);

-- RLS Policy: Authenticated users can view all tools
CREATE POLICY "Authenticated users can view all affiliate tools"
  ON affiliate_tools FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy: Authenticated users can insert tools
CREATE POLICY "Authenticated users can insert affiliate tools"
  ON affiliate_tools FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policy: Authenticated users can update tools
CREATE POLICY "Authenticated users can update affiliate tools"
  ON affiliate_tools FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policy: Authenticated users can delete tools
CREATE POLICY "Authenticated users can delete affiliate tools"
  ON affiliate_tools FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_affiliate_tools_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to auto-update updated_at column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_affiliate_tools_updated_at_trigger'
  ) THEN
    CREATE TRIGGER update_affiliate_tools_updated_at_trigger
      BEFORE UPDATE ON affiliate_tools
      FOR EACH ROW
      EXECUTE FUNCTION update_affiliate_tools_updated_at();
  END IF;
END $$;

-- Insert sample data
INSERT INTO affiliate_tools (name, description, logo_url, affiliate_link, category, display_order) VALUES
(
  'Google Classroom',
  'Free web service for schools that aims to simplify creating, distributing, and grading assignments. Seamlessly integrates with Google Workspace to provide a paperless way to organize coursework.',
  'https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png',
  'https://classroom.google.com',
  'Learning Management',
  1
),
(
  'Zoom for Education',
  'Video conferencing platform designed specifically for education. Host virtual classes, breakout sessions, and collaborate with students in real-time with HD video and audio quality.',
  'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg',
  'https://zoom.us/education',
  'Video Conferencing',
  2
),
(
  'Canva for Education',
  'Free design tool for teachers and students. Create engaging presentations, posters, infographics, and more with thousands of templates and easy drag-and-drop functionality.',
  'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg',
  'https://www.canva.com/education/',
  'Design Tools',
  3
),
(
  'Kahoot!',
  'Game-based learning platform that makes it easy to create, share, and play learning games. Engage students with interactive quizzes and bring fun to the classroom or remote learning.',
  'https://upload.wikimedia.org/wikipedia/commons/1/17/Kahoot%21_logo.svg',
  'https://kahoot.com',
  'Student Engagement',
  4
),
(
  'Grammarly',
  'AI-powered writing assistant that helps students and educators improve their writing. Checks for grammar, spelling, punctuation, and style errors in real-time across multiple platforms.',
  'https://upload.wikimedia.org/wikipedia/commons/9/99/Grammarly_logo.svg',
  'https://www.grammarly.com/edu',
  'Writing Tools',
  5
),
(
  'Notion',
  'All-in-one workspace for notes, wikis, databases, and project management. Perfect for organizing lesson plans, tracking student progress, and collaborative documentation.',
  'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
  'https://www.notion.so/product/notion-for-education',
  'Productivity',
  6
)
ON CONFLICT DO NOTHING;
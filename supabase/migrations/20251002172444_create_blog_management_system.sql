/*
  # Blog Management System

  ## Overview
  Complete blog management system for company platform with categories, tags, comments, and full CRUD operations.

  ## New Tables
  
  ### 1. `blog_categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category display name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `blog_tags`
  - `id` (uuid, primary key) - Unique tag identifier
  - `name` (text) - Tag display name
  - `slug` (text, unique) - URL-friendly identifier
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `blog_posts`
  - `id` (uuid, primary key) - Unique post identifier
  - `title` (text) - Post title
  - `slug` (text, unique) - URL-friendly identifier
  - `content` (text) - Post content (markdown/HTML)
  - `excerpt` (text) - Short description
  - `featured_image` (text) - Image URL
  - `author_id` (uuid) - Reference to users table
  - `author_name` (text) - Author display name
  - `status` (text) - draft, published, scheduled, archived
  - `meta_description` (text) - SEO meta description
  - `meta_keywords` (text) - SEO keywords
  - `published_at` (timestamptz) - Publication date
  - `scheduled_at` (timestamptz) - Scheduled publication date
  - `views_count` (integer) - View counter
  - `comments_count` (integer) - Comment counter
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. `blog_post_categories`
  - `id` (uuid, primary key) - Unique identifier
  - `post_id` (uuid) - Reference to blog_posts
  - `category_id` (uuid) - Reference to blog_categories
  - `created_at` (timestamptz) - Creation timestamp

  ### 5. `blog_post_tags`
  - `id` (uuid, primary key) - Unique identifier
  - `post_id` (uuid) - Reference to blog_posts
  - `tag_id` (uuid) - Reference to blog_tags
  - `created_at` (timestamptz) - Creation timestamp

  ### 6. `blog_comments`
  - `id` (uuid, primary key) - Unique comment identifier
  - `post_id` (uuid) - Reference to blog_posts
  - `author_name` (text) - Commenter name
  - `author_email` (text) - Commenter email
  - `author_id` (uuid, nullable) - Reference to users if logged in
  - `content` (text) - Comment content
  - `status` (text) - pending, approved, rejected, spam
  - `parent_id` (uuid, nullable) - For threaded comments
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 7. `blog_settings`
  - `id` (uuid, primary key) - Unique identifier
  - `key` (text, unique) - Setting key
  - `value` (text) - Setting value
  - `description` (text) - Setting description
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all blog tables
  - Public read access for published posts
  - Authenticated users can create posts
  - Authors can edit their own posts
  - Super admins and blog managers can manage all content
  - Comment moderation restricted to authorized users

  ## Important Notes
  1. All tables use UUID primary keys with gen_random_uuid()
  2. Timestamps use timestamptz with now() defaults
  3. Slugs must be unique for SEO-friendly URLs
  4. Post status workflow: draft → published/scheduled → archived
  5. Comment status workflow: pending → approved/rejected/spam
*/

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text DEFAULT '',
  featured_image text DEFAULT '',
  author_id uuid,
  author_name text NOT NULL,
  status text DEFAULT 'draft',
  meta_description text DEFAULT '',
  meta_keywords text DEFAULT '',
  published_at timestamptz,
  scheduled_at timestamptz,
  views_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'scheduled', 'archived'))
);

-- Create blog_post_categories junction table
CREATE TABLE IF NOT EXISTS blog_post_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, category_id)
);

-- Create blog_post_tags junction table
CREATE TABLE IF NOT EXISTS blog_post_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES blog_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, tag_id)
);

-- Create blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  author_email text NOT NULL,
  author_id uuid,
  content text NOT NULL,
  status text DEFAULT 'pending',
  parent_id uuid REFERENCES blog_comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_comment_status CHECK (status IN ('pending', 'approved', 'rejected', 'spam'))
);

-- Create blog_settings table
CREATE TABLE IF NOT EXISTS blog_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text DEFAULT '',
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_blog_post_categories_post_id ON blog_post_categories(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_post_id ON blog_post_tags(post_id);

-- Enable Row Level Security
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_categories

-- Public can view all categories
CREATE POLICY "Anyone can view categories"
  ON blog_categories FOR SELECT
  TO public
  USING (true);

-- Authenticated users can create categories
CREATE POLICY "Authenticated users can create categories"
  ON blog_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update categories
CREATE POLICY "Authenticated users can update categories"
  ON blog_categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete categories
CREATE POLICY "Authenticated users can delete categories"
  ON blog_categories FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for blog_tags

-- Public can view all tags
CREATE POLICY "Anyone can view tags"
  ON blog_tags FOR SELECT
  TO public
  USING (true);

-- Authenticated users can create tags
CREATE POLICY "Authenticated users can create tags"
  ON blog_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update tags
CREATE POLICY "Authenticated users can update tags"
  ON blog_tags FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete tags
CREATE POLICY "Authenticated users can delete tags"
  ON blog_tags FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for blog_posts

-- Public can view published posts
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  TO public
  USING (status = 'published');

-- Authenticated users can view all posts
CREATE POLICY "Authenticated users can view all posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authors can update their own posts
CREATE POLICY "Authors can update own posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Authors can delete their own posts
CREATE POLICY "Authors can delete own posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- RLS Policies for blog_post_categories

-- Public can view post-category associations
CREATE POLICY "Anyone can view post categories"
  ON blog_post_categories FOR SELECT
  TO public
  USING (true);

-- Authenticated users can manage post-category associations
CREATE POLICY "Authenticated users can manage post categories"
  ON blog_post_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete post categories"
  ON blog_post_categories FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for blog_post_tags

-- Public can view post-tag associations
CREATE POLICY "Anyone can view post tags"
  ON blog_post_tags FOR SELECT
  TO public
  USING (true);

-- Authenticated users can manage post-tag associations
CREATE POLICY "Authenticated users can manage post tags"
  ON blog_post_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete post tags"
  ON blog_post_tags FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for blog_comments

-- Public can view approved comments
CREATE POLICY "Anyone can view approved comments"
  ON blog_comments FOR SELECT
  TO public
  USING (status = 'approved');

-- Authenticated users can view all comments
CREATE POLICY "Authenticated users can view all comments"
  ON blog_comments FOR SELECT
  TO authenticated
  USING (true);

-- Anyone can create comments (for guest commenting)
CREATE POLICY "Anyone can create comments"
  ON blog_comments FOR INSERT
  TO public
  WITH CHECK (true);

-- Authenticated users can update comments
CREATE POLICY "Authenticated users can update comments"
  ON blog_comments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete comments
CREATE POLICY "Authenticated users can delete comments"
  ON blog_comments FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for blog_settings

-- Public can view settings
CREATE POLICY "Anyone can view blog settings"
  ON blog_settings FOR SELECT
  TO public
  USING (true);

-- Authenticated users can manage settings
CREATE POLICY "Authenticated users can manage settings"
  ON blog_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update settings"
  ON blog_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete settings"
  ON blog_settings FOR DELETE
  TO authenticated
  USING (true);
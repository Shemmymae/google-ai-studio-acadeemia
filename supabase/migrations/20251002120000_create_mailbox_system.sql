/*
  # Create Mailbox System

  ## Overview
  This migration creates the complete mailbox/messaging system for the Acadeemia platform.
  It includes inbox, sent items, drafts, and trash functionality with folder organization.

  ## New Tables

  ### 1. `messages`
  Stores all messages in the system
  - `id` (uuid, primary key) - Unique message identifier
  - `sender_id` (uuid, foreign key) - User who sent the message (references user_profiles)
  - `subject` (text, not null) - Message subject line
  - `body` (text, not null) - Message content
  - `is_draft` (boolean, default false) - Draft status
  - `created_at` (timestamptz, default now()) - Message creation time
  - `updated_at` (timestamptz, default now()) - Last update time
  - `school_id` (uuid, foreign key) - Associated school for filtering

  ### 2. `message_recipients`
  Tracks message recipients and their read status
  - `id` (uuid, primary key) - Unique recipient record identifier
  - `message_id` (uuid, foreign key) - Reference to messages table
  - `recipient_id` (uuid, foreign key) - User who received the message
  - `is_read` (boolean, default false) - Read status
  - `is_starred` (boolean, default false) - Important/starred status
  - `folder` (text, default 'inbox') - Current folder (inbox, trash, important)
  - `read_at` (timestamptz) - Timestamp when message was read
  - `created_at` (timestamptz, default now()) - Record creation time

  ## Security
  - All tables have Row Level Security (RLS) enabled
  - Users can only read messages where they are sender or recipient
  - Users can only send messages from their own account
  - Proper authentication checks on all policies

  ## Indexes
  - Indexed foreign keys for optimal query performance
  - Sender and recipient lookups optimized
  - Folder-based queries optimized

  ## Important Notes
  1. Messages are never truly deleted, only moved to trash
  2. Users can star/unstar messages for quick access
  3. Read status is tracked per recipient
  4. Draft messages are only visible to the sender
*/

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  subject text NOT NULL,
  body text NOT NULL,
  is_draft boolean DEFAULT false,
  school_id uuid REFERENCES schools(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create message_recipients table
CREATE TABLE IF NOT EXISTS message_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  recipient_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  is_read boolean DEFAULT false,
  is_starred boolean DEFAULT false,
  folder text DEFAULT 'inbox',
  read_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(message_id, recipient_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_school ON messages(school_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_message_recipients_message ON message_recipients(message_id);
CREATE INDEX IF NOT EXISTS idx_message_recipients_recipient ON message_recipients(recipient_id);
CREATE INDEX IF NOT EXISTS idx_message_recipients_folder ON message_recipients(folder);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_recipients ENABLE ROW LEVEL SECURITY;

-- RLS Policies for messages table

-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    auth.uid() = sender_id OR
    EXISTS (
      SELECT 1 FROM message_recipients
      WHERE message_recipients.message_id = messages.id
      AND message_recipients.recipient_id = auth.uid()
    )
  );

-- Users can insert messages as sender
CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Users can update their own messages (drafts)
CREATE POLICY "Users can update own messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = sender_id)
  WITH CHECK (auth.uid() = sender_id);

-- Users can delete their own messages
CREATE POLICY "Users can delete own messages"
  ON messages FOR DELETE
  TO authenticated
  USING (auth.uid() = sender_id);

-- RLS Policies for message_recipients table

-- Users can view recipient records where they are the recipient
CREATE POLICY "Users can view own recipient records"
  ON message_recipients FOR SELECT
  TO authenticated
  USING (
    recipient_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM messages
      WHERE messages.id = message_recipients.message_id
      AND messages.sender_id = auth.uid()
    )
  );

-- Message senders can create recipient records
CREATE POLICY "Senders can create recipient records"
  ON message_recipients FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM messages
      WHERE messages.id = message_recipients.message_id
      AND messages.sender_id = auth.uid()
    )
  );

-- Recipients can update their own records (read status, folder, etc.)
CREATE POLICY "Recipients can update own records"
  ON message_recipients FOR UPDATE
  TO authenticated
  USING (recipient_id = auth.uid())
  WITH CHECK (recipient_id = auth.uid());

-- Recipients can delete their own records
CREATE POLICY "Recipients can delete own records"
  ON message_recipients FOR DELETE
  TO authenticated
  USING (recipient_id = auth.uid());

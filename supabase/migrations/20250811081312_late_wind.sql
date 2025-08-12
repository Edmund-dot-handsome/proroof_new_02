/*
  # Create inspections table with proper RLS policy

  1. New Tables
    - `inspections`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `phone` (text, required)
      - `address` (text, optional)
      - `preferred_time` (text, optional)
      - `message` (text, optional)
      - `source_page` (text, optional)
      - `utm_source` (text, optional)
      - `utm_medium` (text, optional)
      - `utm_campaign` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `inspections` table
    - Add policy for anonymous users to insert inspection requests
    - Add policy for authenticated users to read all inspections
*/

-- Create inspections table if it doesn't exist
CREATE TABLE IF NOT EXISTS inspections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  address text,
  preferred_time text,
  message text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous users to insert inspections" ON inspections;
DROP POLICY IF EXISTS "Allow authenticated users to read inspections" ON inspections;

-- Create policy to allow anonymous users to insert inspection requests
CREATE POLICY "Allow anonymous users to insert inspections"
  ON inspections
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all inspections
CREATE POLICY "Allow authenticated users to read inspections"
  ON inspections
  FOR SELECT
  TO authenticated
  USING (true);
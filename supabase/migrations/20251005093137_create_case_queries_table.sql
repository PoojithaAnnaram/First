/*
  # Create case queries storage table

  1. New Tables
    - `case_queries`
      - `id` (uuid, primary key) - Unique identifier for each query
      - `case_type` (text) - Type of case (e.g., CRL, CS, WP)
      - `case_number` (text) - Case number entered by user
      - `year` (text) - Year of the case
      - `state` (text) - State where case was filed
      - `district` (text) - District where case was filed
      - `court_level` (text) - Level of court (High Court, District Court, etc.)
      - `raw_response` (jsonb) - Complete response data from the court system
      - `query_timestamp` (timestamptz) - When the query was made
      - `user_id` (uuid, nullable) - Optional user ID if authentication is added later
      - `ip_address` (text, nullable) - IP address of the requester for tracking
      - `status` (text) - Status of the query (success, error, etc.)
      
  2. Security
    - Enable RLS on `case_queries` table
    - Add policy for public read access (for statistics)
    - Add policy for service role to insert data
    
  3. Indexes
    - Add index on case_number for faster lookups
    - Add index on query_timestamp for time-based queries
    - Add index on state and district for location-based filtering
*/

CREATE TABLE IF NOT EXISTS case_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_type text NOT NULL,
  case_number text NOT NULL,
  year text NOT NULL,
  state text NOT NULL,
  district text,
  court_level text NOT NULL,
  raw_response jsonb NOT NULL,
  query_timestamp timestamptz DEFAULT now(),
  user_id uuid,
  ip_address text,
  status text DEFAULT 'success',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE case_queries ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read case queries (for public access to court data)
CREATE POLICY "Anyone can view case queries"
  ON case_queries
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow service role to insert queries
CREATE POLICY "Service role can insert queries"
  ON case_queries
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Authenticated users can insert their own queries
CREATE POLICY "Authenticated users can insert queries"
  ON case_queries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_case_queries_case_number ON case_queries(case_number);
CREATE INDEX IF NOT EXISTS idx_case_queries_timestamp ON case_queries(query_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_case_queries_state_district ON case_queries(state, district);
CREATE INDEX IF NOT EXISTS idx_case_queries_year ON case_queries(year);
CREATE INDEX IF NOT EXISTS idx_case_queries_status ON case_queries(status);

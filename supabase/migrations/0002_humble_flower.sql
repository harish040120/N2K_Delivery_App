/*
  # Create delivery service tables

  1. New Tables
    - `customers` - Store customer information
    - `routes` - Store fixed delivery routes
    - `parcels` - Store parcel information
    - `vehicles` - Store vehicle information
    - `delivery_personnel` - Store delivery staff information
    
  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each role
*/

-- Create enum types
CREATE TYPE parcel_status AS ENUM ('pending', 'in_transit', 'delivered');
CREATE TYPE vehicle_type AS ENUM ('small', 'medium', 'large');
CREATE TYPE route_status AS ENUM ('active', 'inactive');

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  customer_code TEXT UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create routes table
CREATE TABLE IF NOT EXISTS routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  status route_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create parcels table
CREATE TABLE IF NOT EXISTS parcels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number TEXT UNIQUE NOT NULL,
  sender_id UUID REFERENCES customers(id),
  receiver_name TEXT NOT NULL,
  receiver_phone TEXT NOT NULL,
  receiver_address TEXT NOT NULL,
  route_id UUID REFERENCES routes(id),
  status parcel_status DEFAULT 'pending',
  weight DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_number TEXT UNIQUE NOT NULL,
  vehicle_type vehicle_type NOT NULL,
  capacity DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create delivery_personnel table
CREATE TABLE IF NOT EXISTS delivery_personnel (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  route_id UUID REFERENCES routes(id),
  vehicle_id UUID REFERENCES vehicles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_personnel ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access for routes"
  ON routes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can manage routes"
  ON routes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM delivery_personnel dp
      WHERE dp.user_id = auth.uid()
    )
  );

CREATE POLICY "Customers can view own parcels"
  ON parcels FOR SELECT
  TO authenticated
  USING (
    sender_id IN (
      SELECT id FROM customers WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Staff can manage parcels"
  ON parcels FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM delivery_personnel dp
      WHERE dp.user_id = auth.uid()
    )
  );

-- Insert default routes
INSERT INTO routes (name, description, status) VALUES
  ('Nambiyur-Trichy', 'Main route connecting Nambiyur to Trichy', 'active'),
  ('Nambiyur-Salem', 'Main route connecting Nambiyur to Salem', 'active'),
  ('Nambiyur-Coimbatore', 'Main route connecting Nambiyur to Coimbatore', 'active'),
  ('Nambiyur-Local-1', 'Local delivery route 1', 'active'),
  ('Nambiyur-Local-2', 'Local delivery route 2', 'active')
ON CONFLICT DO NOTHING;
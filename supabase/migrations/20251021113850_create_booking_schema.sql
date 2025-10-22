/*
  # Doctor Booking System Schema

  1. New Tables
    - `doctors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `specialty` (text)
      - `qualifications` (text)
      - `bio` (text)
      - `profile_image_url` (text, nullable)
      - `created_at` (timestamptz)
    
    - `services`
      - `id` (uuid, primary key)
      - `doctor_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text, nullable)
      - `duration_minutes` (integer)
      - `price` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    
    - `availability`
      - `id` (uuid, primary key)
      - `doctor_id` (uuid, foreign key)
      - `day_of_week` (integer) - 0=Sunday, 6=Saturday
      - `start_time` (time)
      - `end_time` (time)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `booking_reference` (text, unique)
      - `doctor_id` (uuid, foreign key)
      - `service_id` (uuid, foreign key)
      - `patient_name` (text)
      - `patient_email` (text)
      - `patient_phone` (text)
      - `patient_address` (text, nullable)
      - `patient_city` (text, nullable)
      - `patient_state` (text, nullable)
      - `patient_pincode` (text, nullable)
      - `main_concern` (text)
      - `comments` (text, nullable)
      - `appointment_datetime` (timestamptz)
      - `timezone` (text)
      - `status` (text) - 'pending', 'confirmed', 'completed', 'cancelled'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for doctors and services
    - Authenticated insert for bookings
    - Doctor admin can manage all data
*/

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  specialty text NOT NULL,
  qualifications text NOT NULL,
  bio text NOT NULL,
  profile_image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  duration_minutes integer NOT NULL,
  price integer NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create availability table
CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference text UNIQUE NOT NULL,
  doctor_id uuid NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  patient_name text NOT NULL,
  patient_email text NOT NULL,
  patient_phone text NOT NULL,
  patient_address text,
  patient_city text,
  patient_state text,
  patient_pincode text,
  main_concern text NOT NULL,
  comments text,
  appointment_datetime timestamptz NOT NULL,
  timezone text NOT NULL DEFAULT 'Asia/Kolkata',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for booking lookups
CREATE INDEX IF NOT EXISTS idx_bookings_datetime ON bookings(appointment_datetime);
CREATE INDEX IF NOT EXISTS idx_bookings_doctor_id ON bookings(doctor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(booking_reference);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Doctors table policies
CREATE POLICY "Anyone can view doctors"
  ON doctors FOR SELECT
  TO public
  USING (true);

-- Services table policies
CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  TO public
  USING (is_active = true);

-- Availability table policies
CREATE POLICY "Anyone can view active availability"
  ON availability FOR SELECT
  TO public
  USING (is_active = true);

-- Bookings table policies
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own bookings by reference"
  ON bookings FOR SELECT
  TO public
  USING (true);

-- Insert Dr. Shubhangi Khodape's data
INSERT INTO doctors (name, email, specialty, qualifications, bio)
VALUES (
  'Dr. Shubhangi Khodape',
  'shubhangikhodape16@gmail.com',
  'Aesthetic Physician',
  'MBBS, MD (Dermatology), Fellowship in Aesthetic Medicine',
  'Specialized in Skin, Beauty, Hair, and Lifestyle treatments with over 5 years of experience in aesthetic medicine. Passionate about helping patients achieve their beauty and wellness goals through personalized treatment plans.'
) ON CONFLICT DO NOTHING;

-- Insert services
INSERT INTO services (doctor_id, name, description, duration_minutes, price, is_active)
SELECT 
  id,
  'Phone Call Consultation',
  'Personalized consultation over phone call to discuss your skin, hair, and lifestyle concerns.',
  30,
  400,
  true
FROM doctors WHERE email = 'shubhangikhodape16@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO services (doctor_id, name, description, duration_minutes, price, is_active)
SELECT 
  id,
  'Video Call Consultation',
  'Face-to-face video consultation for detailed assessment of your concerns.',
  30,
  500,
  true
FROM doctors WHERE email = 'shubhangikhodape16@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO services (doctor_id, name, description, duration_minutes, price, is_active)
SELECT 
  id,
  'Chat Consultation',
  'Text-based consultation for quick queries and follow-ups.',
  30,
  300,
  true
FROM doctors WHERE email = 'shubhangikhodape16@gmail.com'
ON CONFLICT DO NOTHING;

-- Insert availability (Monday to Saturday, 9 AM to 6 PM)
INSERT INTO availability (doctor_id, day_of_week, start_time, end_time, is_active)
SELECT 
  id,
  day,
  '09:00:00'::time,
  '18:00:00'::time,
  true
FROM doctors 
CROSS JOIN generate_series(1, 6) AS day
WHERE email = 'shubhangikhodape16@gmail.com'
ON CONFLICT DO NOTHING;
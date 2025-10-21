# Dr. Shubhangi Khodape - Booking Portfolio

A modern, full-stack doctor's booking and portfolio website built with Next.js 15, TypeScript, and Supabase.

## Features

- **Beautiful Landing Page**: Modern dark theme with gradient accents showcasing doctor's profile and services
- **Smart Booking System**: Multi-step booking flow with service selection, calendar, and time slot picker
- **Real-time Availability**: Prevents double-booking by checking existing appointments
- **Patient Management**: Comprehensive booking form with validation
- **Email Notifications**: Automated confirmation emails for both doctor and patients
- **Admin Dashboard**: Protected dashboard for managing appointments (password: `admin123`)
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Email**: Supabase Edge Functions

## Database Structure

- **doctors**: Doctor profile information
- **services**: Consultation types (Phone Call, Video Call, Chat)
- **availability**: Doctor's working hours
- **bookings**: Patient appointment records with full details

## Getting Started

1. The application is already configured with Supabase
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

## Routes

- `/` - Home page with doctor profile and services
- `/booking` - Multi-step booking flow
- `/dashboard` - Admin dashboard (password: `admin123`)

## Admin Dashboard

Access the admin dashboard at `/dashboard` with password: `admin123`

Features:
- View all bookings (upcoming and past)
- Filter by status (pending, confirmed, completed, cancelled)
- Update booking status
- View patient details and contact information
- Real-time statistics

## Booking Flow

1. **Service Selection**: Choose from available consultation types
2. **Date & Time**: Pick date and available time slot (timezone support)
3. **Patient Details**: Fill in contact information and main concern
4. **Confirmation**: Receive booking reference and email confirmation

## Security Features

- Row Level Security (RLS) enabled on all tables
- Double-booking prevention
- Form validation (client and server-side)
- Admin dashboard password protection
- Secure API routes

## Contact

For any queries, reach out to Dr. Shubhangi Khodape at: shubhangikhodape16@gmail.com

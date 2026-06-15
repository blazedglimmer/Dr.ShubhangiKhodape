import BookingShell from '@/components/booking/booking-shell';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type Doctor = Database['public']['Tables']['doctors']['Row'];

const HARDCODED_DOCTOR: Doctor = {
  id: 'doc_1',
  name: 'Dr. Shubhangi Khodape',
  email: 'shubhangikhodape16@gmail.com',
  specialty:
    'Aesthetic Physician • Skin, Hair • Cosmetology • Dermatology • Trichology',
  qualifications: 'MBBS, MD (Dermatology)',
  bio: 'Dr. Shubhangi Khodape is an aesthetic physician specializing in skin, hair and cosmetic procedures.',
  profile_image_url: null,
  created_at: new Date().toISOString(),
};

const HARDCODED_SERVICES: Service[] = [
  {
    id: 'svc_consultation',
    doctor_id: HARDCODED_DOCTOR.id,
    name: 'Online Consultation',
    description: 'Video/phone consultation with the physician.',
    duration_minutes: 30,
    price: 799,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'svc_consult',
    doctor_id: HARDCODED_DOCTOR.id,
    name: 'General Consultation',
    description: 'A 30-minute general consultation.',
    duration_minutes: 30,
    price: 500,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'svc_followup',
    doctor_id: HARDCODED_DOCTOR.id,
    name: 'Follow-up Visit',
    description: 'A 15-minute follow-up.',
    duration_minutes: 15,
    price: 300,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'svc_botox',
    doctor_id: HARDCODED_DOCTOR.id,
    name: 'Botox / Neurotoxin',
    description: 'Facial aesthetic toxin treatment.',
    duration_minutes: 30,
    price: 3500,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'svc_fillers',
    doctor_id: HARDCODED_DOCTOR.id,
    name: 'Dermal Fillers',
    description: 'Lip, cheek and contouring fillers.',
    duration_minutes: 45,
    price: 6000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'svc_prp',
    doctor_id: HARDCODED_DOCTOR.id,
    name: 'PRP for Hair',
    description: 'Platelet-rich plasma hair restoration session.',
    duration_minutes: 60,
    price: 4500,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'svc_skin_glow',
    doctor_id: HARDCODED_DOCTOR.id,
    name: 'Skin Glow / Chemical Peel',
    description: 'Superficial chemical peel for glow and texture.',
    duration_minutes: 45,
    price: 2500,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'svc_acne_treatment',
    doctor_id: HARDCODED_DOCTOR.id,
    name: 'Acne & Scar Treatment',
    description: 'Individualized acne management and scar revision.',
    duration_minutes: 45,
    price: 3000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'svc_hair_loss',
    doctor_id: HARDCODED_DOCTOR.id,
    name: 'Hair Loss Consultation',
    description: 'Trichology-focused consultation for hair loss.',
    duration_minutes: 30,
    price: 999,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'svc_laser',
    doctor_id: HARDCODED_DOCTOR.id,
    name: 'Laser Hair Reduction (per session)',
    description: 'Laser-based permanent hair reduction session.',
    duration_minutes: 30,
    price: 2000,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export default function BookingPage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  const initialServiceId = searchParams?.service ?? null;

  return (
    <BookingShell
      services={HARDCODED_SERVICES}
      doctor={HARDCODED_DOCTOR}
      initialServiceId={initialServiceId}
    />
  );
}

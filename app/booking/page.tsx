import BookingShell from '@/components/booking/booking-shell';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type Doctor = Database['public']['Tables']['doctors']['Row'];

const HARDCODED_DOCTOR: Doctor = {
  id: 'doc_1',
  name: 'Dr. Shubhangi Khodape',
  email: 'shubhangikhodape16@gmail.com',
  specialty: 'General Physician',
  qualifications: 'MBBS, MD',
  bio: 'Dr. Shubhangi Khodape is an experienced general physician providing compassionate care.',
  profile_image_url: null,
  created_at: new Date().toISOString(),
};

const HARDCODED_SERVICES: Service[] = [
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

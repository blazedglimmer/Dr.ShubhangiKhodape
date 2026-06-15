'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ServiceSelection } from '@/components/booking/service-selection';
import { DateTimeSelection } from '@/components/booking/datetime-selection';
import { BookingForm } from '@/components/booking/booking-form';
import { BookingConfirmation } from '@/components/booking/booking-confirmation';
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

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>(HARDCODED_SERVICES);
  const [doctor, setDoctor] = useState<Doctor | null>(HARDCODED_DOCTOR);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [bookingReference, setBookingReference] = useState('');

  useEffect(() => {
    // If a service query param is present, auto-select it.
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const svc = services.find(s => s.id === serviceId);
      if (svc) {
        setSelectedService(svc);
        setStep(2);
      }
    }
  }, [searchParams, services]);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        <ServiceSelection
          services={services}
          doctor={doctor!}
          onSelect={service => {
            setSelectedService(service);
            setStep(2);
          }}
        />

        {step === 2 && selectedService && (
          <DateTimeSelection
            service={selectedService}
            doctor={doctor!}
            selectedDateTime={selectedDateTime}
            timezone={timezone}
            onDateTimeSelect={setSelectedDateTime}
            onTimezoneChange={setTimezone}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}

        {step === 3 && selectedService && selectedDateTime && (
          <BookingForm
            service={selectedService}
            doctor={doctor!}
            dateTime={selectedDateTime}
            timezone={timezone}
            onBack={() => setStep(2)}
            onSuccess={reference => {
              setBookingReference(reference);
              setStep(4);
            }}
          />
        )}

        {step === 4 &&
          bookingReference &&
          selectedService &&
          selectedDateTime && (
            <BookingConfirmation
              bookingReference={bookingReference}
              service={selectedService}
              doctor={doctor!}
              dateTime={selectedDateTime}
              timezone={timezone}
            />
          )}
      </div>
    </main>
  );
}

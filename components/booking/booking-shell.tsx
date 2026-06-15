'use client';

import { useState, useEffect } from 'react';
import { ServiceSelection } from './service-selection';
import { DateTimeSelection } from './datetime-selection';
import { BookingForm } from './booking-form';
import { BookingConfirmation } from './booking-confirmation';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type Doctor = Database['public']['Tables']['doctors']['Row'];

interface BookingShellProps {
  services: Service[];
  doctor: Doctor;
  initialServiceId?: string | null;
}

export default function BookingShell({
  services,
  doctor,
  initialServiceId,
}: BookingShellProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [bookingReference, setBookingReference] = useState('');

  useEffect(() => {
    if (initialServiceId) {
      const svc = services.find(s => s.id === initialServiceId);
      if (svc) {
        setSelectedService(svc);
        setStep(2);
      }
    }
  }, [initialServiceId, services]);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        <ServiceSelection
          services={services}
          doctor={doctor}
          onSelect={service => {
            setSelectedService(service);
            setStep(2);
          }}
        />

        {step === 2 && selectedService && (
          <DateTimeSelection
            service={selectedService}
            doctor={doctor}
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
            doctor={doctor}
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
              doctor={doctor}
              dateTime={selectedDateTime}
              timezone={timezone}
            />
          )}
      </div>
    </main>
  );
}

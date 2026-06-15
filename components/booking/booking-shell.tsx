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
          <BookingForm
            service={selectedService}
            doctor={doctor}
            onBack={() => setStep(1)}
            onSuccess={() => {
              setStep(3);
            }}
          />
        )}

        {step === 3 && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-8 glass-effect rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Redirecting to WhatsApp
              </h2>
              <p className="text-muted-foreground">
                You will be redirected to WhatsApp to confirm your booking.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ServiceSelection } from '@/components/booking/service-selection';
import { DateTimeSelection } from '@/components/booking/datetime-selection';
import { BookingForm } from '@/components/booking/booking-form';
import { BookingConfirmation } from '@/components/booking/booking-confirmation';
import { Loader2 } from 'lucide-react';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type Doctor = Database['public']['Tables']['doctors']['Row'];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [bookingReference, setBookingReference] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [doctorRes, servicesRes] = await Promise.all([
        supabase
          .from('doctors')
          .select('*')
          .eq('email', 'shubhangikhodape16@gmail.com')
          .maybeSingle(),
        supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true }),
      ]);

      if (doctorRes.data) setDoctor(doctorRes.data);
      if (servicesRes.data) setServices(servicesRes.data);

      const serviceId = searchParams.get('service');
      if (serviceId && servicesRes.data && Array.isArray(servicesRes.data)) {
        const service = (servicesRes.data as Service[]).find((s) => s.id === serviceId);
        if (service) {
          setSelectedService(service);
          setStep(2);
        }
      }

      setLoading(false);
    }

    fetchData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!doctor) {
    return <div className="min-h-screen flex items-center justify-center">Doctor not found</div>;
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        {step === 1 && (
          <ServiceSelection
            services={services}
            doctor={doctor}
            onSelect={(service) => {
              setSelectedService(service);
              setStep(2);
            }}
          />
        )}

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
            onSuccess={(reference) => {
              setBookingReference(reference);
              setStep(4);
            }}
          />
        )}

        {step === 4 && bookingReference && selectedService && selectedDateTime && (
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

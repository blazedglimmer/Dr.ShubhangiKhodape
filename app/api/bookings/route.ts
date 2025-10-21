import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      bookingReference,
      doctorId,
      serviceId,
      patientName,
      patientEmail,
      patientPhone,
      patientAddress,
      patientCity,
      patientState,
      patientPincode,
      mainConcern,
      comments,
      appointmentDatetime,
      timezone,
    } = body;

    if (
      !bookingReference ||
      !doctorId ||
      !serviceId ||
      !patientName ||
      !patientEmail ||
      !patientPhone ||
      !mainConcern ||
      !appointmentDatetime
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const appointmentDate = new Date(appointmentDatetime);
    const { data: existingBookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('doctor_id', doctorId)
      .eq('appointment_datetime', appointmentDate.toISOString())
      .in('status', ['pending', 'confirmed']);

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        { error: 'This time slot is already booked. Please select another time.' },
        { status: 409 }
      );
    }

    const bookingData: Database['public']['Tables']['bookings']['Insert'] = {
      booking_reference: bookingReference,
      doctor_id: doctorId,
      service_id: serviceId,
      patient_name: patientName,
      patient_email: patientEmail,
      patient_phone: patientPhone,
      patient_address: patientAddress || null,
      patient_city: patientCity || null,
      patient_state: patientState || null,
      patient_pincode: patientPincode || null,
      main_concern: mainConcern,
      comments: comments || null,
      appointment_datetime: appointmentDate.toISOString(),
      timezone: timezone || 'Asia/Kolkata',
      status: 'pending',
    };

    const { data: booking, error: bookingError } = await (supabase
      .from('bookings') as any)
      .insert(bookingData)
      .select()
      .single();

    if (bookingError) {
      console.error('Booking error:', bookingError);
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    const { data: service } = await supabase
      .from('services')
      .select('*')
      .eq('id', serviceId)
      .single();

    const { data: doctor } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', doctorId)
      .single();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-booking-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          booking,
          service,
          doctor,
        }),
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

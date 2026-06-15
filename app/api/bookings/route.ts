import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
      !serviceId ||
      !patientName ||
      !patientEmail ||
      !patientPhone ||
      !mainConcern ||
      !appointmentDatetime
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Resolve the actual doctor id on the server side. The app previously
    // sent non-UUID identifiers (e.g. "doc_1") which caused Postgres to
    // reject the value when DB columns were UUID typed. We always use a
    // single constant doctor for bookings (configurable via DOCTOR_EMAIL).
    const doctorEmail =
      process.env.DOCTOR_EMAIL || 'shubhangikhodape16@gmail.com';
    const doctor = await prisma.doctor.findUnique({ where: { email: doctorEmail } });
    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found on server' }, { status: 500 });
    }

    const appointmentDate = new Date(appointmentDatetime);
    const resolvedDoctorId = doctor.id;

    const existingBookings = await prisma.booking.findMany({
      where: {
        doctorId: resolvedDoctorId,
        appointmentDatetime: appointmentDate,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
      select: { id: true },
    });

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        {
          error:
            'This time slot is already booked. Please select another time.',
        },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        bookingReference,
        doctorId: resolvedDoctorId,
        serviceId,
        patientName,
        patientEmail,
        patientPhone,
        patientAddress: patientAddress || null,
        patientCity: patientCity || null,
        patientState: patientState || null,
        patientPincode: patientPincode || null,
        mainConcern,
        comments: comments || null,
        appointmentDatetime: appointmentDate,
        timezone: timezone || 'Asia/Kolkata',
        status: 'PENDING',
      },
    });

    // Optionally send notification email here using your own mailer.

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const date = url.searchParams.get('date');
    const doctorId = url.searchParams.get('doctorId');

    const where: any = {};

    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    if (doctorId) {
      where.doctorId = doctorId;
    }

    if (date) {
      const d = new Date(date);
      const start = new Date(d);
      start.setHours(0, 0, 0, 0);
      const end = new Date(d);
      end.setHours(23, 59, 59, 999);
      where.appointmentDatetime = {
        gte: start,
        lte: end,
      };
    }

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { appointmentDatetime: 'asc' },
      include: { service: true },
    });

    // map Prisma `service` to `services` to match existing client expectations
    const mapped = bookings.map(b => ({ ...b, services: b.service }));

    return NextResponse.json(mapped, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, newStatus } = body;

    if (!bookingId || !newStatus) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: newStatus.toUpperCase(), updatedAt: new Date() },
    });

    return NextResponse.json(
      { success: true, booking: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

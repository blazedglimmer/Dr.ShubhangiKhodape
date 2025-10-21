import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingEmailRequest {
  booking: any;
  service: any;
  doctor: any;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { booking, service, doctor }: BookingEmailRequest = await req.json();

    const appointmentDate = new Date(booking.appointment_datetime);
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = appointmentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const patientEmailBody = `
Dear ${booking.patient_name},

Your consultation booking has been confirmed!

Booking Details:
- Booking ID: ${booking.booking_reference}
- Doctor: ${doctor.name}
- Service: ${service.name}
- Date: ${formattedDate}
- Time: ${formattedTime}
- Duration: ${service.duration_minutes} minutes
- Fee: ₹${service.price}
- Timezone: ${booking.timezone}

Your Main Concern: ${booking.main_concern}

Important:
Our team will contact you shortly on ${booking.patient_phone} for payment process and further instructions.

For any queries, please contact us at ${doctor.email}

Thank you for choosing Dr. Shubhangi Khodape's services.

Best regards,
Dr. Shubhangi Khodape's Team
    `;

    const doctorEmailBody = `
New Booking Received!

Booking Details:
- Booking ID: ${booking.booking_reference}
- Patient Name: ${booking.patient_name}
- Patient Email: ${booking.patient_email}
- Patient Phone: ${booking.patient_phone}
- Service: ${service.name}
- Date: ${formattedDate}
- Time: ${formattedTime}
- Duration: ${service.duration_minutes} minutes
- Fee: ₹${service.price}
- Timezone: ${booking.timezone}

Patient Address:
${booking.patient_address || 'Not provided'}
${booking.patient_city || ''} ${booking.patient_state || ''} ${booking.patient_pincode || ''}

Main Concern: ${booking.main_concern}

Comments: ${booking.comments || 'None'}

Please follow up with the patient for payment and further instructions.
    `;

    console.log('Booking email prepared for:', {
      patient: booking.patient_email,
      doctor: doctor.email,
      bookingRef: booking.booking_reference,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email notifications prepared',
        patientEmail: patientEmailBody,
        doctorEmail: doctorEmailBody,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing booking email:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process booking email',
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Copy, Phone, IndianRupee } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type Doctor = Database['public']['Tables']['doctors']['Row'];

interface BookingConfirmationProps {
  bookingReference: string;
  service: Service;
  doctor: Doctor;
  dateTime: Date;
  timezone: string;
}

export function BookingConfirmation({
  bookingReference,
  service,
  doctor,
  dateTime,
  timezone,
}: BookingConfirmationProps) {
  const handleCopyReference = () => {
    navigator.clipboard.writeText(bookingReference);
    toast.success('Booking ID copied to clipboard');
  };

  const serviceIcons: Record<string, any> = {
    'Phone Call Consultation': Phone,
  };

  const Icon = serviceIcons[service.name] || Phone;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-8 glass-effect text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Booking confirmed</h1>
        <p className="text-muted-foreground mb-8">with {doctor.name}</p>

        <div className="space-y-6 text-left">
          <div className="flex items-start justify-between py-3 border-b border-border">
            <span className="text-muted-foreground">Date & time</span>
            <div className="text-right">
              <p className="font-medium">
                {format(dateTime, 'EEEE, dd MMMM yyyy')} ·{' '}
                {format(dateTime, 'h:mm a')} -{' '}
                {format(
                  new Date(
                    dateTime.getTime() + service.duration_minutes * 60000
                  ),
                  'h:mm a'
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                Time zone ({timezone})
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-muted-foreground">Booking ID</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium">{bookingReference}</span>
              <Button variant="ghost" size="sm" onClick={handleCopyReference}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="py-3 border-b border-border">
            <span className="text-muted-foreground block mb-3">Service</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {service.duration_minutes} mins · with {doctor.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 font-bold text-emerald-400">
                <IndianRupee className="w-4 h-4" />
                <span>{service.price}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 text-lg font-bold">
            <span>Total to pay</span>
            <div className="flex items-center gap-1 text-emerald-400">
              <IndianRupee className="w-5 h-5" />
              <span>{service.price}</span>
            </div>
          </div>
        </div>

        <Card className="p-4 bg-emerald-500/10 border-emerald-500/20 mt-6">
          <p className="text-sm text-center">
            A confirmation has been emailed to you
          </p>
        </Card>

        <Link href="/">
          <Button variant="outline" size="lg" className="mt-6">
            Book another appointment
          </Button>
        </Link>
      </Card>
    </div>
  );
}

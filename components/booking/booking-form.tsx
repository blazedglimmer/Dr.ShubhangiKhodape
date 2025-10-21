'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, Loader2, IndianRupee } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type Doctor = Database['public']['Tables']['doctors']['Row'];

interface BookingFormProps {
  service: Service;
  doctor: Doctor;
  dateTime: Date;
  timezone: string;
  onBack: () => void;
  onSuccess: (reference: string) => void;
}

export function BookingForm({
  service,
  doctor,
  dateTime,
  timezone,
  onBack,
  onSuccess,
}: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '+91',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    mainConcern: '',
    comments: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingReference = generateBookingReference();

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingReference,
          doctorId: doctor.id,
          serviceId: service.id,
          patientName: formData.name,
          patientEmail: formData.email,
          patientPhone: `${formData.countryCode}${formData.phone}`,
          patientAddress: formData.address,
          patientCity: formData.city,
          patientState: formData.state,
          patientPincode: formData.pincode,
          mainConcern: formData.mainConcern,
          comments: formData.comments,
          appointmentDatetime: dateTime.toISOString(),
          timezone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create booking');
      }

      toast.success('Booking created successfully!');
      onSuccess(bookingReference);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  function generateBookingReference(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="grid lg:grid-cols-[1fr,400px] gap-6">
        <Card className="p-6 glass-effect">
          <h2 className="text-2xl font-semibold mb-6">Your details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-2 mt-1">
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+971">+971</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pincode">PIN code</Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="mainConcern">
                Main Concern <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="mainConcern"
                value={formData.mainConcern}
                onChange={(e) => setFormData({ ...formData, mainConcern: e.target.value })}
                required
                className="mt-1 min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                className="mt-1 min-h-[80px]"
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Confirming...
                </>
              ) : (
                'Confirm Booking'
              )}
            </Button>

            <Card className="p-4 bg-secondary/50 border-none text-sm space-y-3">
              <div>
                <p className="font-semibold mb-1">Booking policy:</p>
                <p className="text-muted-foreground text-xs">
                  Welcome! Let's get your skin, hair & gut health in check. After you book a consultation,
                  you will receive a follow up message from our team for further process & payment on your
                  mentioned contact info.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Cancellation policy:</p>
                <p className="text-muted-foreground text-xs">
                  Cancellation and rescheduling is not permitted once the appointment is booked.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Additional information:</p>
                <p className="text-muted-foreground text-xs">
                  When booking with {doctor.name}, you may receive appointment-specific communication via
                  email and SMS.
                </p>
              </div>
            </Card>
          </form>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 glass-effect">
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{doctor.name}</h3>
                <p className="text-sm text-muted-foreground">5.0 ⭐</p>
              </div>
            </div>

            <h4 className="font-semibold mb-4">Summary</h4>

            <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
              <p className="text-sm font-medium mb-1">
                {format(dateTime, 'h:mm a')} -{' '}
                {format(new Date(dateTime.getTime() + service.duration_minutes * 60000), 'h:mm a')}
              </p>
              <p className="text-xs text-muted-foreground">{format(dateTime, 'EEEE, dd MMMM yyyy')}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {service.duration_minutes} mins • with {doctor.name.split(' ')[0]}
                  </p>
                </div>
                <div className="flex items-center gap-1 font-bold text-emerald-400">
                  <IndianRupee className="w-4 h-4" />
                  <span>{service.price}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total to pay</span>
                <div className="flex items-center gap-1 text-emerald-400">
                  <IndianRupee className="w-5 h-5" />
                  <span>{service.price}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

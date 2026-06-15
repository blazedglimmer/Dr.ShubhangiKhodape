'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, Loader2, IndianRupee } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type Doctor = Database['public']['Tables']['doctors']['Row'];

interface BookingFormProps {
  service: Service;
  doctor: Doctor;
  onBack: () => void;
  onSuccess: () => void;
}

export function BookingForm({
  service,
  doctor,
  onBack,
  onSuccess,
}: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Build a WhatsApp message per service
      const whatsappPhone =
        process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '918123456789';
      const serviceMessages: Record<string, string> = {
        svc_consultation: `Hello Dr. Shubhangi, I would like to book an Online Consultation for *${service.name}* (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`,
        svc_consult: `Hello Dr. Shubhangi, I would like to book a *General Consultation* (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`,
        svc_followup: `Hello Dr. Shubhangi, I would like to book a *Follow-up Visit* (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`,
        svc_botox: `Hello Dr. Shubhangi, I'm interested in *Botox / Neurotoxin* treatment (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`,
        svc_fillers: `Hello Dr. Shubhangi, I'm interested in *Dermal Fillers* (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`,
        svc_prp: `Hello Dr. Shubhangi, I'm interested in *PRP for Hair* (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`,
        svc_skin_glow: `Hello Dr. Shubhangi, I'm interested in *Skin Glow / Chemical Peel* (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`,
        svc_acne_treatment: `Hello Dr. Shubhangi, I'm interested in *Acne & Scar Treatment* (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`,
        svc_hair_loss: `Hello Dr. Shubhangi, I'm interested in *Hair Loss Consultation* (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`,
        svc_laser: `Hello Dr. Shubhangi, I'm interested in *Laser Hair Reduction* (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`,
      };

      const defaultMessage = `Hello Dr. Shubhangi, I'm interested in *${service.name}* (₹${service.price}). My name is *${name}*, email: ${email} and phone: ${countryCode}${phone}.`;
      const message = serviceMessages[service.id] ?? defaultMessage;
      const encoded = encodeURIComponent(message);
      const url = `https://wa.me/${whatsappPhone}?text=${encoded}`;

      // Redirect to WhatsApp
      window.location.href = url;
      onSuccess();
    } catch (err) {
      toast.error('Failed to open WhatsApp');
      setLoading(false);
    }
  };

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
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <div className="flex gap-2 mt-1">
                <Select value={countryCode} onValueChange={setCountryCode}>
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
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="flex-1"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Redirecting...
                </>
              ) : (
                'Continue on WhatsApp'
              )}
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 glass-effect">
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  {doctor.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{doctor.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {doctor.specialty}
                </p>
              </div>
            </div>

            <h4 className="font-semibold mb-4">Service Summary</h4>

            <div className="mb-6 p-3 bg-secondary/50 rounded-lg space-y-2">
              <p className="font-medium text-sm">{service.name}</p>
              <p className="text-xs text-muted-foreground">
                {service.description}
              </p>
              <p className="text-xs text-muted-foreground">
                Duration: {service.duration_minutes} mins
              </p>
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

            <Card className="p-3 bg-blue-500/10 border-blue-500/20 mt-6 text-xs">
              <p className="text-center text-muted-foreground">
                You will be redirected to WhatsApp to confirm your booking with
                Dr. Shubhangi.
              </p>
            </Card>
          </Card>
        </div>
      </div>
    </div>
  );
}

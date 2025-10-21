'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, Clock, IndianRupee, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type Doctor = Database['public']['Tables']['doctors']['Row'];

interface DateTimeSelectionProps {
  service: Service;
  doctor: Doctor;
  selectedDateTime: Date | null;
  timezone: string;
  onDateTimeSelect: (date: Date) => void;
  onTimezoneChange: (timezone: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function DateTimeSelection({
  service,
  doctor,
  selectedDateTime,
  timezone,
  onDateTimeSelect,
  onTimezoneChange,
  onBack,
  onNext,
}: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(selectedDateTime || undefined);
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots(selectedDate);
      fetchBookedSlots(selectedDate);
    }
  }, [selectedDate]);

  async function fetchBookedSlots(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data } = await (supabase
      .from('bookings') as any)
      .select('appointment_datetime')
      .eq('doctor_id', doctor.id)
      .gte('appointment_datetime', startOfDay.toISOString())
      .lte('appointment_datetime', endOfDay.toISOString())
      .in('status', ['pending', 'confirmed']);

    if (data && Array.isArray(data)) {
      setBookedSlots(data.map((b: any) => b.appointment_datetime));
    }
  }

  function generateTimeSlots(date: Date) {
    const slots: Date[] = [];
    const dayOfWeek = date.getDay();

    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slot = setMinutes(setHours(new Date(date), hour), minute);
        if (slot > new Date()) {
          slots.push(slot);
        }
      }
    }

    setAvailableSlots(slots);
  }

  function isSlotBooked(slot: Date): boolean {
    return bookedSlots.some((booked) => {
      const bookedDate = new Date(booked);
      return bookedDate.getTime() === slot.getTime();
    });
  }

  const handleSlotSelect = (slot: Date) => {
    onDateTimeSelect(slot);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="grid lg:grid-cols-[1fr,400px] gap-6">
        <div className="space-y-6">
          <Card className="p-6 glass-effect">
            <h2 className="text-2xl font-semibold mb-4">{service.name}</h2>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Time zone</label>
              <Select value={timezone} onValueChange={onTimezoneChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">India - Kolkata</SelectItem>
                  <SelectItem value="America/New_York">America - New York</SelectItem>
                  <SelectItem value="Europe/London">Europe - London</SelectItem>
                  <SelectItem value="Asia/Dubai">Asia - Dubai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Select a date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="rounded-md border"
              />
            </div>

            {selectedDate && availableSlots.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {format(selectedDate, 'EEEE, dd MMMM yyyy')}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {availableSlots.map((slot) => {
                    const isBooked = isSlotBooked(slot);
                    const isSelected =
                      selectedDateTime && slot.getTime() === selectedDateTime.getTime();

                    return (
                      <Button
                        key={slot.toISOString()}
                        variant={isSelected ? 'default' : 'outline'}
                        disabled={isBooked}
                        onClick={() => handleSlotSelect(slot)}
                        className="h-auto py-3"
                      >
                        {format(slot, 'h:mm a')}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        </div>

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

            {selectedDateTime && (
              <div className="mb-4 p-3 bg-secondary/50 rounded-lg">
                <p className="text-sm font-medium mb-1">
                  {format(selectedDateTime, 'h:mm a')} -{' '}
                  {format(
                    new Date(selectedDateTime.getTime() + service.duration_minutes * 60000),
                    'h:mm a'
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(selectedDateTime, 'EEEE, dd MMMM yyyy')}
                </p>
              </div>
            )}

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
              <div className="flex justify-between items-center text-lg font-bold mb-4">
                <span>Total to pay</span>
                <div className="flex items-center gap-1 text-emerald-400">
                  <IndianRupee className="w-5 h-5" />
                  <span>{service.price}</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!selectedDateTime}
                onClick={onNext}
              >
                Continue
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { Card } from '@/components/ui/card';

import {
  Phone,
  Video,
  MessageSquare,
  Clock,
  IndianRupee,
  ArrowRight,
  User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type Doctor = Database['public']['Tables']['doctors']['Row'];

const serviceIcons: Record<string, any> = {
  'Phone Call Consultation': Phone,
  'Video Call Consultation': Video,
  'Chat Consultation': MessageSquare,
};

interface ServiceSelectionProps {
  services: Service[];
  doctor: Doctor;
  onSelect: (service: Service) => void;
}

export function ServiceSelection({
  services,
  doctor,
  onSelect,
}: ServiceSelectionProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Select a service</h1>
      </div>

      <Card className="p-6 glass-effect max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-16 h-16">
            <AvatarImage
              src="https://res.cloudinary.com/dhyds1gcy/image/upload/v1761109446/Screenshot_2025-10-22_at_10.33.47_AM_zykuoi.png"
              alt="@shadcn"
            />
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xl">
              {doctor.name
                .split(' ')
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">{doctor.name}</h2>
            <p className="text-muted-foreground">5.0 ⭐ Aesthetic Physician</p>
          </div>
        </div>

        <Card className="p-4 bg-secondary/50 border-emerald-500/20 mb-6">
          <h3 className="font-semibold mb-2">Our Booking Policy</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Welcome! Let's get your skin, hair & gut health in check. After you
            book a consultation, you will receive a follow up message from our
            team for further process & payment on your mentioned contact info.
          </p>
        </Card>
      </Card>

      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Services</h3>
        <div className="space-y-4">
          {services.map(service => {
            const Icon = serviceIcons[service.name] || Phone;

            return (
              <Card
                key={service.id}
                className="p-6 glass-effect border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer group"
                onClick={() => onSelect(service)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">
                        {service.name}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {service.duration_minutes} mins
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          with {doctor.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-2xl font-bold text-emerald-400">
                        <IndianRupee className="w-5 h-5" />
                        <span>{service.price}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

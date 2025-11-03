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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];
type Doctor = Database['public']['Tables']['doctors']['Row'];

const serviceIcons: Record<string, any> = {
  'Phone Call Consultation': Phone,
  'Video Call Consultation': Video,
  'Chat Consultation': MessageSquare,
};

const whatsappLinks: Record<string, string> = {
  'Chat Consultation':
    'https://wa.me/918850454287?text=Hi%20Dr.%20Shubhangi,%20I%27d%20like%20a%20Chat%20Consultation',
  'Phone Call Consultation':
    'https://wa.me/918850454287?text=Hi%20Dr.%20Shubhangi,%20I%27d%20like%20a%20Phone%20Call%20Consultation',
  'Video Call Consultation':
    'https://wa.me/918850454287?text=Hi%20Dr.%20Shubhangi,%20I%27d%20like%20a%20Video%20Call%20Consultation',
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
    <div className="space-y-6 sm:space-y-8 px-4">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Select a service
        </h1>
      </div>

      <Card className="p-4 sm:p-6 glass-effect max-w-3xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-4 mb-6">
          <Avatar className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
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
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold truncate">
              {doctor.name}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              5.0 ⭐ Aesthetic Physician
            </p>
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
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Services</h3>
        <div className="space-y-3 sm:space-y-4">
          {services.map(service => {
            const Icon = serviceIcons[service.name] || Phone;

            return (
              <Card
                key={service.id}
                className="p-4 sm:p-6 glass-effect border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer group"
                onClick={() => {
                  const whatsappLink = whatsappLinks[service.name];
                  if (whatsappLink) {
                    window.open(whatsappLink, '_blank');
                  } else {
                    onSelect(service);
                  }
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base sm:text-lg font-semibold mb-1 flex items-center gap-2 flex-wrap">
                        <span className="break-words">{service.name}</span>
                        <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] flex-shrink-0" />
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="whitespace-nowrap">
                            {service.duration_minutes} mins
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">with {doctor.name}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                    <div className="text-left sm:text-right">
                      <div className="flex items-center gap-1 text-xl sm:text-2xl font-bold text-emerald-400">
                        <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span>{service.price}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-emerald-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
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

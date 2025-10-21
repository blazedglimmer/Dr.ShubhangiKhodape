import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Video, MessageSquare, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import type { Database } from '@/types/database';

type Service = Database['public']['Tables']['services']['Row'];

const serviceIcons: Record<string, any> = {
  'Phone Call Consultation': Phone,
  'Video Call Consultation': Video,
  'Chat Consultation': MessageSquare,
};

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-24 px-4 bg-gradient-to-b from-background to-emerald-950/5">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Consultation <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the consultation type that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.name] || Phone;

            return (
              <Card
                key={service.id}
                className="p-6 glass-effect border-emerald-500/20 hover:border-emerald-500/40 transition-all group hover:scale-105"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-all">
                  <Icon className="w-7 h-7 text-emerald-400" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{service.name}</h3>

                {service.description && (
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                )}

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration_minutes} mins</span>
                  </div>
                  <div className="flex items-center gap-1 text-2xl font-bold text-emerald-400">
                    <IndianRupee className="w-6 h-6" />
                    <span>{service.price}</span>
                  </div>
                </div>

                <Link href={`/booking?service=${service.id}`}>
                  <Button className="w-full group/btn">
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

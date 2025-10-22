import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar } from 'lucide-react';
import type { Database } from '@/types/database';
import Image from 'next/image';

type Doctor = Database['public']['Tables']['doctors']['Row'];
const profileImage =
  'https://res.cloudinary.com/dhyds1gcy/image/upload/v1761092022/Screenshot_2025-10-22_at_5.41.13_AM_x5dpzl.png';

export function Hero({ doctor }: { doctor: Doctor }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-background to-teal-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(20,184,166,0.1),transparent_50%)]" />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-emerald-500/20 shadow-2xl">
              <Image
                src={profileImage}
                alt={doctor.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm mb-4">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-muted-foreground">
              Aesthetic Medicine Specialist
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="gradient-text">{doctor.name}</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {doctor.specialty}
          </p>

          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto">
            Skin | Beauty | Hair | Lifestyle
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/booking">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              asChild
            >
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

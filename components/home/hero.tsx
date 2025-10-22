import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import type { Database } from '@/types/database';
import Image from 'next/image';

type Doctor = Database['public']['Tables']['doctors']['Row'];
const profileImage =
  'https://res.cloudinary.com/dhyds1gcy/image/upload/v1761109446/Screenshot_2025-10-22_at_10.33.47_AM_zykuoi.png';

export function Hero({ doctor }: { doctor: Doctor }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-background to-teal-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(20,184,166,0.1),transparent_50%)]" />

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Profile Image with subtle animation */}
          <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-emerald-500/30 shadow-2xl hover:ring-emerald-500/50 transition-all duration-300">
              <Image
                src={profileImage}
                alt={doctor.name}
                fill
                className="object-cover"
                priority
              />
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm animate-in fade-in slide-in-from-top-5 duration-700 delay-100">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-emerald-300">
              Aesthetic Medicine Specialist
            </span>
          </div>

          {/* Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-top-6 duration-700 delay-200">
            <span className="gradient-text">{doctor.name}</span>
          </h1>

          {/* Specialty */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-top-7 duration-700 delay-300">
            {doctor.specialty}
          </p>

          {/* Services Tagline */}
          <div className="flex items-center justify-center gap-2 text-base md:text-lg text-muted-foreground/80 animate-in fade-in slide-in-from-top-8 duration-700 delay-400">
            <span>Skin</span>
            <span className="text-emerald-500">•</span>
            <span>Beauty</span>
            <span className="text-emerald-500">•</span>
            <span>Hair</span>
            <span className="text-emerald-500">•</span>
            <span>Lifestyle</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button
              size="lg"
              className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-emerald-500/25 transition-all group w-fit"
              asChild
            >
              <Link href="/booking">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book Consultation
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/5 w-fit"
              asChild
            >
              <a href="#about">Learn More</a>
            </Button>
          </div>

          {/* Trust indicators (optional) */}
          <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-in fade-in duration-700 delay-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>500+ Happy Patients</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>3+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Certified Specialist</span>
            </div>
          </div>
        </div>
      </div>

      {/* Softer bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </section>
  );
}

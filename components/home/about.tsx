import { Award, GraduationCap, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { Database } from '@/types/database';

type Doctor = Database['public']['Tables']['doctors']['Row'];

export function About({ doctor }: { doctor: Doctor }) {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Dr. Shubhangi</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dedicated to helping you achieve your beauty and wellness goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 glass-effect border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Care</h3>
            <p className="text-muted-foreground">
              Specialized in aesthetic medicine with a focus on personalized treatment plans
            </p>
          </Card>

          <Card className="p-6 glass-effect border-teal-500/20 hover:border-teal-500/40 transition-all">
            <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Qualifications</h3>
            <p className="text-muted-foreground">
              {doctor.qualifications}
            </p>
          </Card>

          <Card className="p-6 glass-effect border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Patient-Centered</h3>
            <p className="text-muted-foreground">
              Compassionate care focused on understanding and meeting your unique needs
            </p>
          </Card>
        </div>

        <Card className="p-8 glass-effect">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {doctor.bio}
          </p>
        </Card>
      </div>
    </section>
  );
}

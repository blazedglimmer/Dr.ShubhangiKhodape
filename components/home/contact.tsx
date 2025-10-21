import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import type { Database } from '@/types/database';

type Doctor = Database['public']['Tables']['doctors']['Row'];

export function Contact({ doctor }: { doctor: Doctor }) {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-12">
          Have questions? Feel free to reach out
        </p>

        <Card className="p-8 glass-effect">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
              <Mail className="w-8 h-8 text-emerald-400" />
            </div>

            <div>
              <p className="text-muted-foreground mb-2">Email</p>
              <a
                href={`mailto:${doctor.email}`}
                className="text-xl font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {doctor.email}
              </a>
            </div>

            <Button size="lg" asChild>
              <a href={`mailto:${doctor.email}`}>
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
            </Button>
          </div>
        </Card>

        <footer className="mt-16 pt-8 border-t border-border/50">
          <p className="text-muted-foreground text-sm">
            {new Date().getFullYear()} Dr. Shubhangi Khodape. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}

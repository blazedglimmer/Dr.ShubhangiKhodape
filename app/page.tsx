import { supabase } from '@/lib/supabase';
import { Hero } from '@/components/home/hero';
import { About } from '@/components/home/about';
import { Services } from '@/components/home/services';
import { Contact } from '@/components/home/contact';

async function getDoctorData() {
  const { data: doctor } = await supabase
    .from('doctors')
    .select('*')
    .eq('email', 'shubhangikhodape16@gmail.com')
    .maybeSingle();

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true });

  return { doctor, services };
}

export default async function Home() {
  const { doctor, services } = await getDoctorData();

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen">
      <Hero doctor={doctor} />
      <About doctor={doctor} />
      <Services services={services || []} />
      <Contact doctor={doctor} />
    </main>
  );
}

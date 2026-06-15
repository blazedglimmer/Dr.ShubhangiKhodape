import './page-linktree.css';
import ProfileCard from '@/components/profile/profile-card';

export default async function Home() {
  // Hardcoded doctor data — app is single-doctor focused
  const doctor = {
    name: 'Dr. Shubhangi Khodape',
    email: 'shubhangikhodape16@gmail.com',
  };

  return (
    <main className="min-h-screen">
      <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-blue-200">
        <ProfileCard />
      </div>
    </main>
  );
}

import { Instagram, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ShareButton } from '../share-button';

const profileImage =
  'https://res.cloudinary.com/dhyds1gcy/image/upload/v1761109446/Screenshot_2025-10-22_at_10.33.47_AM_zykuoi.png';

const ProfileCard = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main Profile Card */}
      <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border border-border/50 relative bg-gradient-to-br from-violet-200 via-indigo-200 to-red-200">
        {/* Action Buttons - Top Right */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          {/* Share Button */}
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
            <ShareButton
              url="https://dr-shubhangi-khodape.vercel.app/"
              text="Check out Dr. Shubhangi Khodape - Aesthetic Physician!"
              title="Share Dr. Shubhangi Khodape's Profile"
            >
              <Share2 className="w-5 h-5 text-foreground" />
            </ShareButton>
          </button>

          {/* Instagram Button */}
          <Link
            href="https://www.instagram.com/dr_shubhangi167/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <Instagram className="w-5 h-5 text-foreground" />
          </Link>
        </div>

        {/* Avatar with Gradient Border */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[image:var(--gradient-avatar)] p-1">
              <div className="w-full h-full rounded-full bg-card" />
            </div>
            <Image
              src={profileImage}
              alt="Dr. Shubhangi Khodape"
              className="relative w-32 h-32 rounded-full object-cover border-4 border-card"
              height={128}
              width={128}
            />
          </div>
        </div>

        {/* Name and Bio */}
        <h1 className="text-2xl font-bold text-center text-foreground mb-2">
          Dr. Shubhangi Khodape
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Transforming skin, beauty, and confidence for a vibrant you ✨
        </p>

        {/* Appointment Button */}
        <Link
          href="/booking"
          className="block bg-card rounded-2xl p-2 shadow-[var(--shadow-button)] border border-border/50 hover:shadow-[var(--shadow-card)] hover:scale-[1.02] transition-all duration-300 bg-gradient-to-r from-purple-200 via-indigo-200 to-pink-200"
        >
          <div className="flex items-center justify-center gap-4">
            <Image
              src={profileImage}
              alt="Schedule appointment"
              className="w-12 h-12 rounded-full object-cover border-2 border-card"
              width={48}
              height={48}
            />
            <span className="text-foreground font-medium text-neutral-700">
              SCHEDULE YOUR APPOINTMENT
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;

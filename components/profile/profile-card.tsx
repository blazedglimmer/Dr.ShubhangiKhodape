import { Instagram, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ShareButton } from '../share-button';

const profileImage =
  'https://res.cloudinary.com/dhyds1gcy/image/upload/v1761109446/Screenshot_2025-10-22_at_10.33.47_AM_zykuoi.png';

const ProfileCard = () => {
  return (
    <div className="w-full max-w-md mx-auto ">
      {/* Main Profile Card */}
      <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border border-border/50 relative bg-indigo-100">
        {/* Share Button */}
        <button className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
          {/* <Share2 className="w-5 h-5 text-foreground" /> */}

          <ShareButton
            url={'https://dr-shubhangi-khodape.vercel.app/'}
            children={<Share2 className="w-5 h-5 text-foreground" />}
            text={'Check out Dr. Shubhangi Khodape - Aesthetic Physician!'}
          />
        </button>

        {/* Avatar with Gradient Border */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[image:var(--gradient-avatar)] p-1">
              <div className="w-full h-full rounded-full bg-card"></div>
            </div>
            <Image
              src={profileImage}
              alt="Profile"
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
          {/* Helping you glow inside and out, every day ✨ */}
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <Link
            href="https://www.instagram.com/dr_shubhangi167/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-110"
          >
            <Instagram className="w-6 h-6" />
          </Link>
          {/* <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-110"
          >
            <Youtube className="w-6 h-6" />
          </a> */}
        </div>

        {/* Action Cards */}
        <div className="mt-4 space-y-1 ">
          <Link
            href="/booking"
            className="block bg-card rounded-2xl p-2 shadow-[var(--shadow-button)] border border-border/50 hover:shadow-[var(--shadow-card)] hover:scale-[1.02] transition-all duration-300 bg-violet-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
                <span className="text-foreground font-medium">
                  SCHEDULE YOUR APPOINTMENT
                </span>
              </div>
            </div>
          </Link>

          {/* <a
            href="#services"
            className="block bg-card rounded-2xl p-5 shadow-[var(--shadow-button)] border border-border/50 hover:shadow-[var(--shadow-card)] hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-foreground font-medium">
                  VIEW SERVICES
                </span>
              </div>
            </div>
          </a> */}

          {/* <a
            href="#contact"
            className="block bg-card rounded-2xl p-5 shadow-[var(--shadow-button)] border border-border/50 hover:shadow-[var(--shadow-card)] hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-foreground font-medium">CONTACT ME</span>
              </div>
            </div>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

import { ImageResponse } from 'next/og';
// import { Instagram, Share2 } from 'lucide-react';

export const runtime = 'edge';
export const alt = 'Dr. Shubhangi Khodape - Aesthetic Physician';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const profileImage =
  'https://res.cloudinary.com/dhyds1gcy/image/upload/v1761109446/Screenshot_2025-10-22_at_10.33.47_AM_zykuoi.png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          padding: '80px',
          background: '#BFDBFE',
        }}
      >
        {/* Main Profile Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '900px',
            background:
              'linear-gradient(135deg, #ddd6fe 0%, #c7d2fe 50%, #fecaca 100%)',
            borderRadius: '48px',
            padding: '15px',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Action Icons - Top Right */}
          <div
            style={{
              position: 'absolute',
              top: '48px',
              right: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Share Icon */}
            <div
              style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>

            {/* Instagram Icon */}
            <div
              style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </div>

          {/* Avatar */}
          <img
            src={profileImage}
            alt="Dr. Shubhangi Khodape"
            width="200"
            height="200"
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              border: '8px solid white',
              marginBottom: '32px',
            }}
          />

          {/* Name */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1f2937',
              marginBottom: '16px',
              margin: '0',
            }}
          >
            Dr. Shubhangi Khodape
          </h1>

          {/* Bio */}
          <p
            style={{
              fontSize: '32px',
              textAlign: 'center',
              color: '#6b7280',
              marginBottom: '48px',
              margin: '0',
              marginTop: '16px',
              maxWidth: '700px',
            }}
          >
            Transforming skin, beauty, and confidence for a vibrant you ✨
          </p>

          {/* Appointment Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              background:
                'linear-gradient(90deg, #e9d5ff 0%, #c7d2fe 50%, #fbcfe8 100%)',
              borderRadius: '32px',
              padding: '24px 48px',
              marginTop: '32px',
            }}
          >
            <img
              src={profileImage}
              alt="Schedule"
              width="72"
              height="72"
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid white',
              }}
            />
            <span
              style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#404040',
                letterSpacing: '0.5px',
              }}
            >
              SCHEDULE YOUR APPOINTMENT
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

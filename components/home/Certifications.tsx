"use client";

import Image from 'next/image';
import { MotionDiv } from '../motion/MotionDiv';
import { scaleInUp } from '@/lib/motion/motionVariants'; // Hum naya scaleInUp animation use karenge

const certifications = [
  { id: 'fssai', name: 'FSSAI', imageUrl: '/certifications/fssai.jpg' },
  { id: 'iso', name: 'ISO 9001', imageUrl: '/certifications/iso.jpg' },
  { id: 'msme', name: 'MSME', imageUrl: '/certifications/msme.jpg' },
  { id: 'haccp', name: 'HACCP', imageUrl: '/certifications/haccp.jpg' },
  { id: 'gmp', name: 'GMP Certified', imageUrl: '/certifications/gmp.jpg' },
  { id: 'startupindia', name: 'Startup India', imageUrl: '/certifications/startupindia.jpg' }
];

export const Certifications = () => {
  const duplicatedCerts = [...certifications, ...certifications];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <MotionDiv
          variants={scaleInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
            Our Commitment to Quality
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Globally certified for purity, safety, and excellence.
          </p>
        </MotionDiv>

        {/* Infinite Scroller Container */}
        <div 
          className="group relative w-full overflow-hidden"
          // Yeh gradient logos ko side se fade in/out karta hai
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <MotionDiv 
            className="flex w-max animate-scroll-infinite group-hover:[animation-play-state:paused]"
          >
            {duplicatedCerts.map((cert, index) => (
              <div 
                key={`${cert.id}-${index}`} 
                className="flex-shrink-0 w-64 flex flex-col items-center justify-center mx-8"
              >
                <div className="relative h-24 w-24">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.name}
                    fill
                    sizes="10vw"
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <p className="mt-2 font-medium text-gray-500">{cert.name}</p>
              </div>
            ))}
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};
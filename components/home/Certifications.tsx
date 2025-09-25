"use client";

import Image from 'next/image';
import { MotionDiv } from '../motion/MotionDiv';
import { scaleInUp } from '@/lib/motion/motionVariants';

const certifications = [
  { id: 'gmp', name: 'GMP Certified', imageUrl: '/certifications/gmp.jpg' },
  { id: 'iso', name: 'ISO 2200', imageUrl: '/certifications/iso2200.jpg' },
  { id: 'iso', name: 'ISO 9001', imageUrl: '/certifications/iso9001.jpg' }, //
  { id: 'haccp', name: 'HACCP', imageUrl: '/certifications/haccp.jpg' },
  { id: '100% NATURAL', name: '100% NATURAL', imageUrl: '/certifications/natural100.jpg' },//
  { id: 'msme', name: 'MSME', imageUrl: '/certifications/msme.jpg' },
  { id: 'fssai', name: 'FSSAI', imageUrl: '/certifications/fssai.jpg' },
  { id: 'APEDA', name: 'APEDA', imageUrl: '/certifications/apeda.jpg' },//
  { id: 'startupindia', name: 'Startup India', imageUrl: '/certifications/startupindia.jpg' },
  { id: 'IMPORT EXPORT', name: 'IMPORT EXPORT', imageUrl: '/certifications/importexport.jpg' }
];

// Series as Numbers 
// 1. GMP
// 2. ISO 2200
// 3. ISO 9001
// 4. HACCP
// 5. 100% NATURAL
// 6. MSME
// 7. FSSAI
// 8. APEDA
// 9. STARTUP INDIA
// 10. IMPORT EXPORT

export const Certifications = () => {
  const triplicatedCerts = [...certifications, ...certifications, ...certifications];
  
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
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          {/* Option 1: CSS Animation Approach */}
          <div className="flex w-max animate-scroll-infinite group-hover:[animation-play-state:paused]">
            {triplicatedCerts.map((cert, index) => (
              <div
                key={`${cert.id}-${index}`}
                className="flex-shrink-0 w-64 flex flex-col items-center justify-center mx-8"
              >
                <div className="relative h-44 w-44 transition-all duration-300 hover:scale-110">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.name}
                    fill
                    sizes="10vw"
                    className="object-contain transition-all duration-300"
                  />
                </div>
                <p className="mt-2 font-medium text-gray-500 group-hover:text-brand-dark transition-colors">
                  {cert.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative: Framer Motion Approach */}
        {/* 
        <MotionDiv
          className="flex w-max"
          animate={{
            x: [0, -100 * certifications.length * 16] // 16rem = w-64
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {triplicatedCerts.map((cert, index) => (
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
        */}
      </div>
    </section>
  );
};
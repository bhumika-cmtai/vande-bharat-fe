"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv } from '../motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';

// Data for our categories (no change here)
const categories = [
  // { id: '1', name: 'Food Products', slug: 'food', imageUrl: '/hero1.jpg' },
  { id: '1', name: 'Personal Care', slug: 'personal-care', imageUrl: '/conditioner.jpg' },
  { id: '2', name: 'Skin Care', slug: 'skin-care', imageUrl: '/bodygel12.jpg' },
  { id: '3', name: 'Wellness', slug: 'wellness', imageUrl: '/tulsi1.jpg' },
];

// Component to render the floating flags, now using CSS classes
const flagPositions = [
  // Flag 1: Top Left
  {
    top: '10%',
    left: '15%',
    animationDuration: '22s',
    animationDelay: '0s',
    opacity: 0.3,
  },
  // Flag 2: Top Right
  {
    top: '20%',
    left: '80%',
    animationDuration: '18s',
    animationDelay: '2s',
    opacity: 0.4,
  },
  // Flag 3: Mid Left
  {
    top: '55%',
    left: '5%',
    animationDuration: '25s',
    animationDelay: '4s',
    opacity: 0.25,
  },
  // Flag 4: Mid Right (Lower)
  {
    top: '75%',
    left: '90%',
    animationDuration: '20s',
    animationDelay: '1s',
    opacity: 0.35,
  },
  // Flag 5: Bottom Left
  {
    top: '85%',
    left: '25%',
    animationDuration: '19s',
    animationDelay: '6s',
    opacity: 0.2,
  },
  // Flag 6: Center Right
  {
    top: '40%',
    left: '65%',
    animationDuration: '24s',
    animationDelay: '3s',
    opacity: 0.4,
  },
];

const FloatingFlags = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {/* Map over the predefined array of flag data */}
    {flagPositions.map((flag, i) => (
      <div
        key={i}
        className="flag-floater animate-float" // Classes from globals.css
        // Apply the fixed styles from our array
        style={{
          left: flag.left,
          top: flag.top,
          animationDuration: flag.animationDuration,
          animationDelay: flag.animationDelay,
          opacity: flag.opacity,
        }}
      />
    ))}
  </div>
);


export const CategorySlider = () => { 
  return (
    <section className="relative container mx-auto px-6 py-10 overflow-hidden">
      <div className='h-full w-full bg-[var(--brand-green-50)]/60 px-8 py-16 rounded-4xl'>

      
      {/* bg-gradient-to-br via-50% from-[var(--brand-orange)]/40 via-[var(--brand-blue)]/40 to-[var(--brand-green)]/34 */}
      {/* ===== FLOATING FLAGS BACKGROUND ===== */}
      {/* <FloatingFlags /> */}

      {/* Section Header (no change here) */}
      <MotionDiv
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="text-[var(--brand-orange)]">
            Shop By Category
          </span>
        </h2>
        <p className="text-lg text-gray-800 mt-3 font-medium">
          Explore our wide range of authentic, nature-inspired products.
        </p>
      </MotionDiv>

      {/* Categories Grid (no change here) */}
      <MotionDiv
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
      >
        {categories.map((category) => (
          <MotionDiv
            key={category.id}
            variants={fadeInUp}
            className="text-center"
          >
            <Link href={`/shop?category=${category.slug}`} className="group/item">
              <div 
                className="relative w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full p-1.5 transition-all duration-300 ease-in-out group-hover/item:scale-105 group-hover/item:shadow-xl"
                style={{ background: 'linear-gradient(to bottom right, #FF9933, #FFFFFF, #138808)' }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-100">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 40vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover/item:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover/item:bg-black/0 transition-colors duration-300"></div>
                </div>
              </div>
              <p className="mt-5 font-bold text-lg text-gray-800 transition-colors duration-300 group-hover/item:text-blue-800">
                {category.name}
              </p>
            </Link>
          </MotionDiv>
        ))}
      </MotionDiv>
      </div>
    </section>
  );
};
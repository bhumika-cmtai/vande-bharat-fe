"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv } from '../motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants'; // Path ko check kar lein

// Data for our categories
const categories = [
  { id: '1', name: 'Food Product', slug: 'food', imageUrl: '/hero1.jpg' }, // Use your own local images
  { id: '2', name: 'Personal Care', slug: 'personal-care', imageUrl: '/conditioner.jpg' },
  { id: '3', name: 'Skin Care', slug: 'skin-care', imageUrl: '/bodygel12.jpg' },
  { id: '4', name: 'Wellness', slug: 'wellness', imageUrl: '/tulsi1.jpg' },
];

export const CategorySlider = () => { 
  return (
    <section className="container mx-auto px-6 py-12">
      {/* Section Header */}
      <MotionDiv
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
          Shop By Category
        </h2>
        <p className="text-lg text-gray-600 mt-2">Explore our wide range of authentic products.</p>
      </MotionDiv>

      {/* Categories Grid - YEH MAIN CHANGE HAI */}
      <MotionDiv
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        // Grid layout for perfect centering and spacing
        className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
      >
        {categories.map((category) => (
          <MotionDiv
            key={category.id}
            variants={fadeInUp}
            className="text-center"
          >
            <Link href={`/shop?category=${category.slug}`} className="group/item">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden shadow-subtle bg-gray-100 transition-all duration-300 ease-in-out group-hover/item:shadow-lifted group-hover/item:scale-105">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 40vw, 20vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              <p className="mt-4 font-semibold text-brand-dark">{category.name}</p>
            </Link>
          </MotionDiv>
        ))}
      </MotionDiv>
    </section>
  );
};
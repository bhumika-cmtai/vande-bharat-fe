"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv } from '../motion/MotionDiv';
import { staggerContainer, fadeInUp, scaleInUp } from '@/lib/motion/motionVariants';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export const PromoBanner = () => {
  return (
    <section className="container mx-auto px-6 py-10">
      <MotionDiv
        variants={scaleInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        // Main Card
        className="relative overflow-hidden bg-gradient-to-br from-orange-500/80 via-white to-green-600/80 shadow-lg rounded-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-8 md:p-12">
          
          {/* Left Side: Text Content */}
          <MotionDiv 
            variants={staggerContainer}
            className="z-10 text-center md:text-left"
          >
            <MotionDiv variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-dark leading-tight">
                Pure Wellness Collection For You
              </h2>
            </MotionDiv>
            <MotionDiv variants={fadeInUp}>
              <p className="text-lg text-gray-600 mt-4 max-w-md mx-auto md:mx-0">
                For those who prefer a natural, holistic, and effective way to care for their body and mind.
              </p>
            </MotionDiv>
            <MotionDiv variants={fadeInUp} className="mt-8">
              <Link href="/shop">
                <Button 
                  size="lg" 
                  className="rounded-full group bg-white border-2 border-gray-300 text-[var(--brand-dark)] hover:bg-[var(--primary-button-theme)] hover:text-white hover:border-[var(--secondary-button-theme)] transition-all duration-300 shadow-md"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </MotionDiv>
          </MotionDiv>

          {/* Right Side: Image and Decorative Circles */}
          <div className="relative h-64 md:h-96">
            {/* Decorative Circle 1 (Blue) */}
            <MotionDiv
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-brand-blue/10 rounded-full"
            />
            {/* Decorative Circle 2 (Orange) */}
            <MotionDiv
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-2/3 -translate-y-1/3 w-64 h-64 md:w-80 md:h-80 bg-brand-orange/10 rounded-full"
            />

            {/* Product Image */}
            <MotionDiv
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
              className="absolute inset-0 z-10"
            >
              <Image 
                // Ek sundar Ayurvedic product ki image
                src="/tulsi1.jpg" // Yeh image 'public' folder mein honi chahiye
                alt="Ayurvedic Wellness Product"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 80vw, 40vw"
              />
            </MotionDiv>
          </div>
        </div>
      </MotionDiv>
    </section>
  );
};
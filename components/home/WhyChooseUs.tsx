"use client";

import Image from 'next/image';
import { MotionDiv } from '../motion/MotionDiv';
import { staggerContainer, fadeInUp, scaleInUp } from '@/lib/motion/motionVariants';
import { Accordion } from '../ui/accordion';
import { Accordion2 } from '../ui/accordion2';

// Accordion ke liye content
const accordionItems = [
    {
        title: "Unrivaled Purity & Quality",
        content: "We pride ourselves on offering products that meet the highest standards of quality. Each item is sourced from trusted organic farms and carefully tested to ensure durability and customer satisfaction."
    },
    {
        title: "Authentic Ayurvedic Roots",
        content: "Our formulas are based on centuries-old Ayurvedic wisdom, adapted for modern lifestyles. We believe in holistic wellness that starts from nature."
    },
    {
        title: "Sustainably Sourced",
        content: "We work directly with local farmers and artisans, ensuring fair trade practices and sustainable sourcing that honors mother nature and supports communities."
    },
    {
        title: "Legacy of Trust",
        content: "With years of excellence, Vande Bharat Mart has become a trusted name for authentic Indian products. Our commitment to you is our legacy."
    }
];

export const WhyChooseUs = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <MotionDiv 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Side: Image */}
          <MotionDiv variants={scaleInUp}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src="https://source.unsplash.com/a-woman-holding-a-bottle-of-face-serum-sCY-4G_4j6o"
                alt="Natural Ayurvedic Products"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </MotionDiv>

          {/* Right Side: Content & Accordion */}
          <MotionDiv variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 mb-8">
              At Vande Bharat Mart, we believe in bringing you the purest essence of India. Our products are a promise of quality, authenticity, and care.
            </p>
            <Accordion2 items={accordionItems} />
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};
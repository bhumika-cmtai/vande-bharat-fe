"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv } from './motion/MotionDiv';
import { staggerContainer, scaleInUp, fadeInUp } from '@/lib/motion/motionVariants';
import { Accordion2 } from './ui/accordion2'; // Humara pehle banaya hua Accordion component
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

// Accordion ke liye data
const accordionItems = [
    {
        title: "Unrivaled Purity & Quality",
        content: "We pride ourselves on offering products that meet the highest standards of quality. Each item is sourced from trusted organic farms."
    },
    {
        title: "Authentic Ayurvedic Roots",
        content: "Our formulas are based on centuries-old Ayurvedic wisdom, adapted for modern lifestyles to bring you holistic wellness."
    },
    {
        title: "Sustainably Sourced",
        content: "We work directly with local farmers and artisans, ensuring fair trade practices that honor both nature and communities."
    },
];

export const FeatureGrid = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <MotionDiv 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8"
        >
          {/* === TOP ROW === */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 1. Badi Image Card */}
            <MotionDiv variants={scaleInUp} className="lg:col-span-2 h-[450px] lg:h-auto">
              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="/hero2.jpg" // public folder mein ek aachi quality ki image daalein
                  alt="Vande Bharat Mart Natural Products"
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-3xl md:text-4xl font-bold">Essence of Nature</h3>
                    <p>Pure, Potent, and Preserved for You.</p>
                </div>
              </div>
            </MotionDiv>

            {/* 2. "Why Choose Us" Accordion Card */}
            <MotionDiv variants={fadeInUp} className="bg-gray-100 p-8 rounded-2xl shadow-lg flex flex-col">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">
                Why Choose Us?
              </h2>
              <p className="text-gray-600 mb-6">
                Our promise is purity, from the source to your home.
              </p>
              <div className="flex-grow">
                <Accordion2 items={accordionItems} />
              </div>
            </MotionDiv>
          </div>

          {/* === BOTTOM ROW === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* 3. Authentic Product Card */}
            <MotionDiv variants={fadeInUp} className="bg-[var(--brand-orange-100)] p-8 rounded-2xl shadow-lg flex flex-col group">
              <h3 className="font-bold text-xl text-brand-dark mb-2">100% Authentic Products</h3>
              <p className="text-gray-600 flex-grow">A guarantee of purity with every item, sourced directly from nature's lap.</p>
              <Link href="/about">
                <Button variant="outline" className="mt-6 w-full group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  Learn More <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
              </Link>
            </MotionDiv>

            {/* 4. Easy Returns Card */}
            <MotionDiv variants={fadeInUp} className="bg-[var(--brand-green-100)] p-8 rounded-2xl shadow-lg flex flex-col group">
              <h3 className="font-bold text-xl text-brand-dark mb-2">Free & Easy Returns</h3>
              <p className="text-gray-600 flex-grow">Our hassle-free policy ensures a worry-free and satisfying shopping experience.</p>
               <Link href="/returns">
                <Button variant="outline" className="mt-6 w-full group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  Our Policy <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
              </Link>
            </MotionDiv>

            {/* 5. Secure Payments Card */}
            <MotionDiv variants={fadeInUp} className="bg-[var(--brand-blue-100)] p-8 rounded-2xl shadow-lg flex flex-col group">
              <h3 className="font-bold text-xl text-brand-dark mb-2">Secure Payments</h3>
              <p className="text-gray-600 flex-grow">Shop with confidence using our secure, 100% encrypted payment gateways.</p>
               <Link href="/faq">
                <Button variant="outline" className="mt-6 w-full group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  See Details <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
              </Link>
            </MotionDiv>
            
            {/* 6. Promotional Card */}
            <MotionDiv variants={fadeInUp} className="relative rounded-2xl overflow-hidden shadow-lg group min-h-[250px] sm:col-span-2 lg:col-span-1">
               <Image
                  src="/hero3.jpg" // public folder mein ek promotional image daalein
                  alt="Monsoon Wellness Sale"
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold">Monsoon Wellness</h3>
                    <p className="text-lg">Up to 25% Off</p>
                </div>
                {/* Sale Badge */}
                <div className="absolute top-4 right-[-20px] bg-brand-orange text-white font-bold px-6 py-1 text-sm rotate-45">
                    SALE
                </div>
            </MotionDiv>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};
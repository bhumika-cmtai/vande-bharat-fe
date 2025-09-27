"use client";

import Image from 'next/image';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp, scaleInUp } from '@/lib/motion/motionVariants';
import { Award, Users, ThumbsUp, Newspaper, Milestone } from 'lucide-react'; // Icons for our achievements section
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Achievements Page Component
export default function AchievementsPage() {
  return (
    <main className="overflow-hidden bg-[var(--brand-orange)]/10">
        <Navbar />
      {/* === Hero Section === */}
      <section className="relative h-[70vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/achievements-hero.jpg"
            alt="Golden trophy symbolizing success and achievement"
            fill
            priority
            className="object-cover scale-105 hover:scale-110 transition-transform duration-[3000ms]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/70 via-[var(--brand-green-100)]/20 to-[var(--brand-blue-100)]/20" />
        </div>
        
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4"
        >
          <MotionDiv 
            variants={{
              hidden: { scale: 0.8, opacity: 0 },
              visible: { 
                scale: 1, 
                opacity: 1,
                transition: { 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }
            }}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-yellow-100 to-green-100 bg-clip-text text-transparent leading-tight">
              Our Milestones & Achievements
            </h1>
            <div className="absolute inset-0 text-5xl md:text-7xl font-bold text-white/20 blur-sm -z-10">
              Our Milestones & Achievements
            </div>
          </MotionDiv>
          <MotionDiv 
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { 
                y: 0, 
                opacity: 1,
                transition: { 
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut"
                }
              }
            }}
          >
            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              Celebrating the journey of Vande Bharat Mart and the trust you place in us.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-orange)] mx-auto mt-6 rounded-full"></div>
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* === Key Numbers Section === */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">By the Numbers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Our growth is a testament to our commitment to quality and our loyal community.</p>
          </MotionDiv>

          <MotionDiv 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20"
          >
            {/* Number 1 - Happy Customers */}
            <MotionDiv variants={fadeInUp} className="text-center p-8 bg-gray-50/50 rounded-2xl shadow-lg">
              <Users className="w-16 h-16 mx-auto text-[var(--brand-green)] mb-4" />
              <h3 className="text-5xl font-bold text-brand-dark">500,000+</h3>
              <p className="text-xl text-gray-700 mt-2">Happy Customers</p>
            </MotionDiv>

            {/* Number 2 - Positive Reviews */}
            <MotionDiv variants={fadeInUp} className="text-center p-8 bg-gray-50/50 rounded-2xl shadow-lg">
              <ThumbsUp className="w-16 h-16 mx-auto text-[var(--brand-orange)] mb-4" />
              <h3 className="text-5xl font-bold text-brand-dark">10,000+</h3>
              <p className="text-xl text-gray-700 mt-2">5-Star Reviews</p>
            </MotionDiv>

            {/* Number 3 - Products Shipped */}
            <MotionDiv variants={fadeInUp} className="text-center p-8 bg-gray-50/50 rounded-2xl shadow-lg">
              <Milestone className="w-16 h-16 mx-auto text-[var(--brand-blue)] mb-4" />
              <h3 className="text-5xl font-bold text-brand-dark">1 Million+</h3>
              <p className="text-xl text-gray-700 mt-2">Products Shipped</p>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>

      {/* === Awards & Recognition Section === */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-6">
          <MotionDiv
            variants={scaleInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We are honored to be recognized for our dedication to quality and ethical practices.</p>
          </MotionDiv>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Award 1 */}
            <MotionDiv 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center"
            >
              <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Best Natural Skincare Brand 2024</h3>
              <p className="text-lg text-gray-700">Awarded by the Indian Health & Wellness Association</p>
            </MotionDiv>

            {/* Award 2 */}
            <MotionDiv 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center"
            >
              <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Ethical & Sustainable Brand of the Year 2023</h3>
              <p className="text-lg text-gray-700">Recognized by the Fair Trade Federation of India</p>
            </MotionDiv>

            {/* Award 3 */}
            <MotionDiv 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center"
            >
              <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Top E-commerce Exporter 2023</h3>
              <p className="text-lg text-gray-700">Awarded by the India Export Council</p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* === As Featured In Section === */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <Newspaper className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">As Featured In</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We are proud to have been featured in these prestigious publications.</p>
          </MotionDiv>

          <MotionDiv 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-12 mt-20"
          >
            {/* Media Logos */}
            <MotionDiv variants={fadeInUp} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image src="/logo1.png" alt="Media Logo 1" width={150} height={50} />
            </MotionDiv>
            <MotionDiv variants={fadeInUp} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image src="/logo2.png" alt="Media Logo 2" width={150} height={50} />
            </MotionDiv>
            <MotionDiv variants={fadeInUp} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image src="/logo3.png" alt="Media Logo 3" width={150} height={50} />
            </MotionDiv>
            <MotionDiv variants={fadeInUp} className="grayscale hover:grayscale-0 transition-all duration-300">
              <Image src="/logo4.png" alt="Media Logo 4" width={150} height={50} />
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>
      <Footer />
    </main>
  );
}
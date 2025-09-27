"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp, scaleInUp } from '@/lib/motion/motionVariants';
import { ShieldCheck, Lock, CreditCard, Tag, Leaf, Gavel, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// Policy & Obligations Page Component
export default function PolicyObligationPage() {
  // Array of company's core obligations
  const obligations = [
    {
      title: 'Product Authenticity & Quality',
      description: 'We guarantee that every product is 100% authentic, natural, and sourced with the utmost care to meet the highest quality standards.',
      icon: <ShieldCheck className="w-10 h-10 text-[var(--brand-green)]" />,
      link: '/about-us',
      linkText: 'Our Quality Promise',
    },
    {
      title: 'Data Privacy & Security',
      description: 'Your privacy is sacred. We employ state-of-the-art security measures to protect your personal information and will never share it without your consent.',
      icon: <Lock className="w-10 h-10 text-[var(--brand-blue)]" />,
      link: '/legals',
      linkText: 'Read Privacy Policy',
    },
    {
      title: 'Transactional Integrity',
      description: 'All payments are processed through secure, SSL-encrypted gateways. We ensure complete transparency and security for every transaction.',
      icon: <CreditCard className="w-10 h-10 text-slate-600" />,
      link: '/legals',
      linkText: 'View Terms of Service',
    },
    {
      title: 'Fair & Transparent Pricing',
      description: 'We are committed to fair pricing with no hidden costs. The price you see is the price you pay, reflecting the true value of our products and the work of our artisans.',
      icon: <Tag className="w-10 h-10 text-[var(--brand-orange)]" />,
      link: '/faq',
      linkText: 'Learn More',
    },
    {
      title: 'Ethical Sourcing & Sustainability',
      description: 'We partner directly with local farmers and artisans, ensuring fair trade practices that empower communities and promote environmental sustainability.',
      icon: <Leaf className="w-10 h-10 text-emerald-600" />,
      link: '/about-us',
      linkText: 'Discover Our Story',
    },
    {
      title: 'Customer Grievance Redressal',
      description: 'We provide a structured and transparent mechanism to address and resolve your concerns in a fair and timely manner.',
      icon: <Gavel className="w-10 h-10 text-red-700" />,
      link: '/grievance-cell',
      linkText: 'Visit Grievance Cell',
    },
  ];

  return (
    <main className="overflow-hidden bg-gray-50">
      {/* === Hero Section === */}
      <Navbar />
      <section className="relative h-[60vh] flex items-center justify-center  bg-gradient-to-r from-orange-100  via-blue-100 to-green-100">
        <div className="absolute inset-0 z-0">
          <Image
            src="/policy-hero.jpg" // A professional, abstract image suggesting trust
            alt="A seal of approval, symbolizing policy and commitment"
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/80 to-brand-dark/60" />
        </div>
        
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4"
        >
          <MotionDiv variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r text-orange-600  leading-tight">
              Our Policies & Obligations
            </h1>
          </MotionDiv>
          <MotionDiv variants={fadeInUp}>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto font-light text-gray-500 leading-relaxed">
              A clear framework of our commitments, built on trust, transparency, and integrity.
            </p>
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* === Our Pledge Section === */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
            <MotionDiv
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Our Pledge to You</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    Our relationship with you is our most valuable asset. The following policies form the foundation of our operations and represent our core obligations to you, our valued customer. We believe that clarity and transparency are essential for building lasting trust.
                </p>
            </MotionDiv>
        </div>
      </section>

      {/* === Core Obligations Grid === */}
      <section className="py-20 md:py-24 bg-green-100">
        <div className="container mx-auto px-6">
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {obligations.map((item, index) => (
              <MotionDiv 
                key={index}
                variants={fadeInUp}
                className="group flex flex-col bg-white p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 border border-gray-100 transition-all duration-300"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
                  {item.icon}
                </div>
                <h3 className="font-bold text-2xl text-brand-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {item.description}
                </p>
                <Link href={item.link} className="inline-flex items-center mt-6 text-[var(--brand-blue)] font-semibold group-hover:text-[var(--brand-green)] transition-colors">
                    {item.linkText}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* === Questions Section === */}
       <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
             <MotionDiv
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-r from-[var(--brand-green)]/40 to-[var(--brand-blue)]/40 p-10 rounded-xl shadow-xl"
            >
                <h2 className="text-3xl font-bold text-white mb-4">Have Questions?</h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                    If you have any questions regarding our policies or obligations, please do not hesitate to reach out to our support team.
                </p>
                <Link href="/#contact-us" className="inline-block px-10 py-4 bg-white text-[var(--brand-blue)] font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg">
                    Contact Us
                </Link>
            </MotionDiv>
        </div>
       </section>
       <Footer />
    </main>
  );
}
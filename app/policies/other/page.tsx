"use client";

import Link from 'next/link';
import { Gavel, Ban, Scale, XCircle, Truck, FileText, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// === Other Policies Page Content ===
export default function OtherPoliciesPage() {
  const policyLinks = [
    {
      title: 'Terms & Conditions',
      description: 'The main agreement governing your use of our website and services.',
      icon: <Gavel className="w-8 h-8 text-slate-600" />,
      href: '/terms-and-conditions',
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal and private data.',
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      href: '/legals', // Assuming privacy policy is on the legals page
    },
    {
      title: 'Prohibitions',
      description: 'A list of activities that are strictly forbidden on our platform.',
      icon: <Ban className="w-8 h-8 text-red-600" />,
      href: '/prohibitions',
    },
    {
      title: 'Model Code of Conduct',
      description: 'The ethical principles and standards we expect from our community.',
      icon: <Scale className="w-8 h-8 text-green-600" />,
      href: '/model-code-of-conduct',
    },
    {
      title: 'Cancellation & Return Policy',
      description: 'Our process for cancelling orders and returning products.',
      icon: <XCircle className="w-8 h-8 text-orange-600" />,
      href: '/cancellation-return',
    },
    {
      title: 'Shipping & Delivery Policy',
      description: 'Information on timelines, costs, and procedures for shipping.',
      icon: <Truck className="w-8 h-8 text-purple-600" />,
      href: '/shipping-delivery',
    },
     {
      title: 'Grievance Redressal',
      description: 'The official mechanism for reporting and resolving your concerns.',
      icon: <Users className="w-8 h-8 text-yellow-600" />,
      href: '/grievance-cell',
    },
    // Add any other policy links here
  ];

  return (
    <div className="bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600/60 via-gray-100 to-blue-600/30 text-white">
           <div className="container mx-auto px-6 py-20 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h1 className="text-4xl md:text-6xl font-bold text-[var(--brand-orange-500)]/80">Our Policy Hub</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
                    Your central resource for understanding the guidelines that govern our platform.
                </p>
           </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-20 bg-amber-100">
            <div className="container mx-auto px-6">
                 <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Transparency and Trust</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        At Vande Bharat Mart, we believe in being clear and transparent about our operations. This hub provides easy access to all our key policies and legal documents. Please take a moment to review the documents relevant to you.
                    </p>
                </div>
            </div>
        </section>

        {/* Policies Grid */}
        <section className="py-16 md:py-20 bg-orange-50">
          <div className="container mx-auto px-6">
            <MotionDiv
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 "
            >
              {policyLinks.map((item, index) => (
                <MotionDiv key={index} variants={fadeInUp}>
                  <Link href={item.href}>
                    <div className="group bg-orange-300/50 p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 border border-gray-100 transition-all duration-300 h-full flex flex-col">
                      <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-5 group-hover:bg-blue-50 transition-colors">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-xl text-brand-dark mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed flex-grow">{item.description}</p>
                      <div className="mt-6 font-semibold text-[var(--brand-blue)] group-hover:text-[var(--brand-green)] transition-colors flex items-center">
                        View Policy <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </MotionDiv>
              ))}
            </MotionDiv>
          </div>
        </section>
        
        {/* Contact CTA Section */}
        <section className="py-20 bg-blue-50">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-brand-dark mb-4">Still Have Questions?</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        If you cannot find the information you are looking for or have specific questions about our policies, please feel free to contact our support team.
                    </p>
                    <Link href="/contact-us" className="inline-block px-10 py-4 bg-[var(--brand-blue)] text-white font-bold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg">
                        Contact Support
                    </Link>
                </div>
            </div>
       </section>
      </main>
      <Footer />
    </div>
  );
}
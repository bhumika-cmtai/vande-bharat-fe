"use client";

import Image from 'next/image';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp, scaleInUp } from '@/lib/motion/motionVariants';
import { FilePenLine, MailCheck, Search, CheckCircle, User, Mail, Phone, ShoppingBag, Type } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Grievance Cell Page Component
export default function GrievancePage() {
  const grievanceProcess = [
    {
      step: 'Step 1: Submission',
      title: 'Lodge Your Grievance',
      description: 'Fill out the detailed form below or email our Grievance Officer with all relevant details, including your order ID.',
      icon: <FilePenLine className="w-10 h-10 text-[var(--brand-blue)]" />,
    },
    {
      step: 'Step 2: Acknowledgement',
      title: 'Receive Confirmation',
      description: 'You will receive an automated acknowledgement with a unique ticket number for your reference within 48 hours.',
      icon: <MailCheck className="w-10 h-10 text-[var(--brand-orange)]" />,
    },
    {
      step: 'Step 3: Investigation',
      title: 'Internal Review',
      description: 'Our dedicated team will investigate your concern thoroughly, examining all the details provided.',
      icon: <Search className="w-10 h-10 text-[var(--brand-green)]" />,
    },
    {
      step: 'Step 4: Resolution',
      title: 'Fair & Timely Resolution',
      description: 'We will communicate our findings and the proposed resolution to you within 15 business days.',
      icon: <CheckCircle className="w-10 h-10 text-green-600" />,
    },
  ];

  return (
    <main className="overflow-hidden bg-gray-50">
        <Navbar />
      {/* === Hero Section === */}
      <section className="relative h-[60vh] flex items-center justify-center text-white bg-slate-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="/grievance-hero.jpg" // A professional, abstract, or office-related image
            alt="Scales of justice symbolizing fairness and grievance redressal"
            fill
            priority
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/70 to-brand-dark/50" />
        </div>
        
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4"
        >
          <MotionDiv variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-blue-100 bg-clip-text text-transparent leading-tight">
              Grievance Redressal Mechanism
            </h1>
          </MotionDiv>
          <MotionDiv variants={fadeInUp}>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto font-light text-gray-300 leading-relaxed">
              Our commitment to a fair and transparent process for resolving your concerns.
            </p>
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* === Our Commitment Section === */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
            <MotionDiv
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Our Commitment to You</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    At Vande Bharat Mart, customer satisfaction is paramount. We have established a robust Grievance Redressal Mechanism to ensure that your concerns are heard and addressed in a timely, fair, and effective manner. We are committed to upholding the highest standards of service and integrity.
                </p>
            </MotionDiv>
        </div>
      </section>

      {/* === Step-by-Step Process Section === */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">How It Works: Our 4-Step Process</h2>
            <p className="text-lg text-gray-600 mt-4">A clear and structured path to resolution.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {grievanceProcess.map((item, index) => (
              <MotionDiv 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center p-6"
              >
                <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-blue-100/50 mb-6">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-brand-dark mb-2">{item.step}</h3>
                <h4 className="font-semibold text-xl text-brand-dark mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* === Grievance Officer & Form Section === */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Grievance Officer Details */}
            <div className="lg:col-span-2">
              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-brand-dark mb-6">Contact Our Grievance Officer</h2>
                <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    For any unresolved issues or to formally lodge a grievance, you can contact our designated Grievance Officer.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">Name:</h4>
                      <p className="text-gray-600">Mr. Arjun Desai</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Designation:</h4>
                      <p className="text-gray-600">Head of Customer Relations</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email:</h4>
                      <a href="mailto:grievance@vandebharatmart.com" className="text-[var(--brand-blue)] hover:underline">
                        grievance@vandebharatmart.com
                      </a>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Response Time:</h4>
                      <p className="text-gray-600">We will address your email within 72 business hours.</p>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>
            
            {/* Grievance Form */}
            <div className="lg:col-span-3">
              <MotionDiv
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-brand-dark mb-6">Submit Your Grievance</h2>
                <form className="space-y-6 p-8 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" id="fullName" name="fullName" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brand-blue)] transition" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" id="email" name="email" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brand-blue)] transition" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                      <input type="tel" id="phone" name="phone" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brand-blue)] transition" />
                    </div>
                    <div>
                      <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                      <input type="text" id="orderId" name="orderId" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brand-blue)] transition" placeholder="e.g., VBM123456" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="grievanceType" className="block text-sm font-medium text-gray-700 mb-1">Nature of Grievance</label>
                    <select id="grievanceType" name="grievanceType" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brand-blue)] transition bg-white">
                      <option>Select an issue type</option>
                      <option>Order Delivery Issue</option>
                      <option>Product Quality Concern</option>
                      <option>Refund/Return Request</option>
                      <option>Payment Related Issue</option>
                      <option>Website Technical Problem</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Detailed Description of Grievance</label>
                    <textarea id="description" name="description" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--brand-blue)] transition"></textarea>
                  </div>
                  <div>
                    <button type="submit" className="w-full px-8 py-4 bg-[var(--brand-blue)] text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-lg">
                      Submit Grievance
                    </button>
                  </div>
                </form>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
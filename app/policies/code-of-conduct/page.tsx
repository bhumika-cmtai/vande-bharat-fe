"use client";

import { Scale, Users, HeartHandshake, ShieldCheck, Star, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';



// === Model Code of Conduct Page Content ===
export default function ModelCodeOfConductPage() {
  const corePrinciples = [
    {
      title: 'Integrity and Honesty',
      description: 'We are committed to truthfulness in all our interactions. This includes accurate product descriptions, transparent pricing, and honest customer reviews. We conduct our business with unwavering integrity.',
      icon: <Scale className="w-10 h-10" />,
      color: 'blue',
    },
    {
      title: 'Respect and Dignity',
      description: 'We treat every individual—customers, partners, and employees—with respect and dignity. We have a zero-tolerance policy for harassment, discrimination, and any form of abusive behavior.',
      icon: <Users className="w-10 h-10" />,
      color: 'green',
    },
    {
      title: 'Fairness and Professionalism',
      description: 'We engage in fair business practices and maintain the highest level of professionalism. We foster an environment of collaboration and mutual support, free from conflicts of interest.',
      icon: <HeartHandshake className="w-10 h-10" />,
      color: 'orange',
    },
     {
      title: 'Quality and Safety',
      description: 'Our foremost duty is to provide products that are safe, authentic, and of the highest quality. We adhere to all regulatory standards and are transparent about our sourcing and ingredients.',
      icon: <ShieldCheck className="w-10 h-10" />,
      color: 'green',
    },
    {
      title: 'Accountability and Responsibility',
      description: 'We take ownership of our actions and their outcomes. We are responsible for upholding our policies, protecting customer data, and ensuring the security and reliability of our platform.',
      icon: <Star className="w-10 h-10" />,
      color: 'blue',
    },
    {
      title: 'Community and Collaboration',
      description: 'We believe in building a positive and supportive community. We encourage constructive feedback and collaboration to create a better experience for everyone involved with Vande Bharat Mart.',
      icon: <LinkIcon className="w-10 h-10" />,
      color: 'orange',
    },
  ];
  
  const getColorClasses = (color:string) => {
    switch (color) {
      case 'blue':
        return {
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-600',
          border: 'border-blue-500',
        };
      case 'green':
        return {
          iconBg: 'bg-green-100',
          iconText: 'text-green-600',
          border: 'border-green-500',
        };
      case 'orange':
        return {
          iconBg: 'bg-orange-100',
          iconText: 'text-orange-600',
          border: 'border-orange-500',
        };
      default:
        return {
          iconBg: 'bg-gray-100',
          iconText: 'text-gray-600',
          border: 'border-gray-500',
        };
    }
  };

  return (
    <div className="bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-50 via-blue-50 to-orange-50 text-brand-dark">
           <div className="container mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold">Model Code of Conduct</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
                    Our shared commitment to upholding the highest standards of ethics and integrity.
                </p>
           </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-6">
                 <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Our Guiding Philosophy</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        The Vande Bharat Mart Code of Conduct is more than a set of rules; it is the ethical compass that guides our decisions and actions. It applies to all of us—employees, suppliers, partners, and customers—who contribute to our community. We believe that by adhering to these principles, we can create a trustworthy and positive ecosystem for everyone.
                    </p>
                </div>
            </div>
        </section>

        {/* Core Principles Grid */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-6">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Our Core Principles</h2>
                <p className="text-lg text-gray-600 mt-4">The foundation of our conduct.</p>
            </div>
            <MotionDiv
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {corePrinciples.map((item, index) => {
                const colors = getColorClasses(item.color);
                return (
                  <MotionDiv key={index} variants={fadeInUp} className={`bg-white p-8 rounded-lg shadow-md border-t-4 ${colors.border}`}>
                    <div className="flex items-center mb-5">
                      <div className={`flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full ${colors.iconBg} ${colors.iconText}`}>
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="font-bold text-2xl text-brand-dark mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </MotionDiv>
                )
              })}
            </MotionDiv>
          </div>
        </section>
        
        {/* Reporting Violations Section */}
        <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-lg p-10 text-center">
                    <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-brand-dark mb-4">Upholding Our Standards</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        We all have a responsibility to uphold this Code of Conduct. If you witness or suspect any behavior that violates these principles, we strongly encourage you to report it. All reports will be handled with confidentiality and investigated promptly.
                    </p>
                    <a href="/grievance-cell" className="inline-block px-10 py-4 bg-[var(--brand-blue)] text-white font-bold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg">
                        Report a Violation
                    </a>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
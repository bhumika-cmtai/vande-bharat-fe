"use client";

import { useState } from 'react';
import Image from 'next/image';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp, scaleInUp } from '@/lib/motion/motionVariants';
import { FileText, Download, ShieldCheck, Gavel, Eye } from 'lucide-react'; // Icons for our legals section
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PdfModal from '@/components/PdfModal'; // Import the PdfModal component

// Legals Page Component
export default function LegalsPage() {
  // State for managing the modal
  const [modalFileUrl, setModalFileUrl] = useState(null);

  // Function to open the modal
  const openModal = (fileUrl) => {
    setModalFileUrl(fileUrl);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalFileUrl(null);
  };

  // Function to handle direct download
  const handleDownload = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const legalDocuments = [
    {
      title: 'Terms of Service',
      description: 'The rules and regulations that govern your use of our website and services.',
      icon: <Gavel className="w-12 h-12 text-white" />,
      bgColor: 'from-[var(--brand-blue)] to-blue-400',
      fileUrl: '/downloads/terms-of-service.pdf',
    },
    {
      title: 'Privacy Policy',
      description: 'Details on how we collect, use, and protect your personal information.',
      icon: <ShieldCheck className="w-12 h-12 text-white" />,
      bgColor: 'from-[var(--brand-green)] to-emerald-400',
      fileUrl: '/downloads/privacy-policy.pdf',
    },
    {
      title: 'Return & Refund Policy',
      description: 'Information about the process for returning products and receiving refunds.',
      icon: <FileText className="w-12 h-12 text-white" />,
      bgColor: 'from-[var(--brand-orange)] to-orange-400',
      fileUrl: '/downloads/return-and-refund-policy.pdf',
    },
    {
      title: 'Shipping Policy',
      description: 'Complete details about our shipping procedures, timelines, and charges.',
      icon: <FileText className="w-12 h-12 text-white" />,
      bgColor: 'from-purple-500 to-purple-400',
      fileUrl: '/downloads/shipping-policy.pdf',
    },
  ];

  const certifications = [
    {
      title: 'FSSAI License',
      description: 'Certified by the Food Safety and Standards Authority of India.',
      icon: <ShieldCheck className="w-12 h-12 text-white" />,
      bgColor: 'from-green-600 to-green-500',
      fileUrl: '/downloads/fssai-license.pdf',
    },
    {
      title: 'ISO 9001:2015 Certification',
      description: 'International standard for quality management systems.',
      icon: <ShieldCheck className="w-12 h-12 text-white" />,
      bgColor: 'from-gray-700 to-gray-600',
      fileUrl: '/downloads/iso-certification.pdf',
    },
    {
      title: 'Organic Certificate',
      description: 'Guaranteeing the authenticity of our premium organic products.',
      icon: <ShieldCheck className="w-12 h-12 text-white" />,
      bgColor: 'from-yellow-600 to-yellow-500',
      fileUrl: '/downloads/organic-certificate.pdf',
    },
  ];

  return (
    <main className="overflow-hidden bg-[var(--brand-orange)]/10">
      <Navbar />
      {/* === Hero Section === */}
      <section className="relative h-[70vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/legal-hero.jpg"
            alt="A gavel and law books symbolizing legality and trust"
            fill
            priority
            className="object-cover scale-105 hover:scale-110 transition-transform duration-[3000ms]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/70 via-[var(--brand-green-100)]/70 to-[var(--brand-blue-100)]/50" />
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
          >
            <h1 className="text-5xl md:text-7xl font-bold text-[var(--brand-orange-500)] leading-tight">
              Legal & Compliance
            </h1>
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
              Our commitment to transparency and trust.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-orange)] mx-auto mt-6 rounded-full"></div>
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* === Legal Documents Section === */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-white via-green-50/30 to-blue-50/20">
        <div className="container mx-auto px-6">
          <MotionDiv
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">
              Our Legal Documents
            </h2>
            <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
              We believe in full transparency to clarify your rights and our responsibilities. Below are our key legal documents.
            </p>
          </MotionDiv>

          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {legalDocuments.map((doc, index) => (
              <MotionDiv
                key={index}
                variants={fadeInUp}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/40 overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-grow">
                  <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                    <div className={`flex-shrink-0 flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br ${doc.bgColor} text-white shadow-lg mb-6 md:mb-0 md:mr-8`}>
                      {doc.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-2xl text-brand-dark mb-2">
                        {doc.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gray-50/50 text-center">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => openModal(doc.fileUrl)}
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[var(--brand-blue)] hover:bg-blue-700 transition-colors"
                      aria-label={`Preview ${doc.title}`}
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownload(doc.fileUrl)}
                      className="inline-flex items-center justify-center px-6 py-3 border border-[var(--brand-blue)] text-base font-medium rounded-full shadow-sm text-[var(--brand-blue)] bg-white hover:bg-gray-50 transition-colors"
                      aria-label={`Download ${doc.title}`}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* === Certifications Section === */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <MotionDiv
            variants={scaleInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">
              Certifications & Licenses
            </h2>
            <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
              Our commitment to quality and authenticity is backed by these certifications.
            </p>
          </MotionDiv>

          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {certifications.map((cert, index) => (
              <MotionDiv
                key={index}
                variants={fadeInUp}
                className="group text-center p-8 bg-gray-50/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col"
              >
                <div className="flex-grow">
                    <div className={`relative mx-auto mb-6 flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br ${cert.bgColor} text-white shadow-lg`}>
                      {cert.icon}
                    </div>
                    <h3 className="font-bold text-2xl text-brand-dark mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      {cert.description}
                    </p>
                </div>
                <div className="p-6 bg-gray-50/50 text-center">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() => openModal(cert.fileUrl)}
                          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[var(--brand-green)] hover:bg-emerald-700 transition-colors"
                          aria-label={`Preview ${cert.title}`}
                        >
                          <Eye className="w-5 h-5 mr-2" />
                          Preview
                        </button>
                        <button
                          onClick={() => handleDownload(cert.fileUrl)}
                          className="inline-flex items-center justify-center px-6 py-3 border border-[var(--brand-green)] text-base font-medium rounded-full shadow-sm text-[var(--brand-green)] bg-white hover:bg-gray-50 transition-colors"
                          aria-label={`Download ${cert.title}`}
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download
                        </button>
                    </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* Render the PDF Modal */}
      <PdfModal fileUrl={modalFileUrl} onClose={closeModal} />

      <Footer />
    </main>
  );
}
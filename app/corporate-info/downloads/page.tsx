"use client";

import { useState } from 'react';
import Image from 'next/image';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp, scaleInUp } from '@/lib/motion/motionVariants';
import { Download, BookOpen, FileText, Info, Eye } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PdfModal from '@/components/PdfModal';

// Downloads Page Component
export default function DownloadsPage() {
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

  // Sample data for product catalogs
  const productCatalogs = [
    {
      title: 'Skincare Collection Catalog',
      description: 'Explore our complete range of natural and herbal skincare products. Updated for 2025.',
      icon: <BookOpen className="w-12 h-12 text-white" />,
      bgColor: 'from-[var(--brand-green)] to-emerald-400',
      fileUrl: '/downloads/skincare-catalog-2025.pdf',
    },
    {
      title: 'Personal Care Essentials',
      description: 'Discover our daily essentials for hair care, body care, and oral hygiene.',
      icon: <BookOpen className="w-12 h-12 text-white" />,
      bgColor: 'from-[var(--brand-orange)] to-orange-400',
      fileUrl: '/downloads/personal-care-essentials.pdf',
    },
    {
      title: 'Herbal Wellness Guide',
      description: 'A complete guide to our Ayurvedic and herbal wellness supplements and teas.',
      icon: <BookOpen className="w-12 h-12 text-white" />,
      bgColor: 'from-sky-500 to-sky-400',
      fileUrl: '/downloads/herbal-wellness-guide.pdf',
    },
  ];
  
  // Sample data for user guides
  const userGuides = [
    {
      title: 'Ayurvedic Skincare Routine Guide',
      description: 'Learn how to build a personalized skincare routine based on your Dosha.',
      icon: <Info className="w-12 h-12 text-white" />,
      bgColor: 'from-purple-500 to-purple-400',
      fileUrl: '/downloads/ayurvedic-skincare-routine.pdf',
    },
    {
      title: 'How to Use Our Face Oils',
      description: 'Get the most out of our facial oils with this step-by-step application guide.',
      icon: <FileText className="w-12 h-12 text-white" />,
      bgColor: 'from-rose-500 to-rose-400',
      fileUrl: '/downloads/how-to-use-face-oils.pdf',
    },
    {
      title: 'Natural Hair Care Manual',
      description: 'Tips and tricks for healthy, shining hair using our herbal hair care products.',
      icon: <FileText className="w-12 h-12 text-white" />,
      bgColor: 'from-amber-500 to-amber-400',
      fileUrl: '/downloads/natural-hair-care-manual.pdf',
    },
  ];

  return (
    <main className="overflow-hidden bg-[var(--brand-orange)]/10">
      <Navbar />
      
      {/* === Hero Section === */}
      <section className="relative h-[70vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/downloads-hero.jpg"
            alt="A person browsing through a product catalog"
            fill
            priority
            className="object-cover scale-105 hover:scale-110 transition-transform duration-[3000ms]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-orange)]/70 via-[var(--brand-green-100)]/20 to-[var(--brand-blue)]/40" />
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
              Resource Hub
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
            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto font-light text-gray-500 leading-relaxed">
              Explore our catalogs, user guides, and brand resources.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-orange)] mx-auto mt-6 rounded-full"></div>
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* === Product Catalogs Section === */}
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
              Product Catalogs
            </h2>
            <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
              Browse our latest collections and discover your next favorite product.
            </p>
          </MotionDiv>

          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {productCatalogs.map((doc, index) => (
              <MotionDiv 
                key={index}
                variants={fadeInUp}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/40 overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-grow">
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br ${doc.bgColor} text-white shadow-lg mb-6`}>
                    {doc.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-2xl text-brand-dark mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {doc.description}
                    </p>
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
      
      {/* === User Guides Section === */}
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
              User Guides & How-To's
            </h2>
            <p className="text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
              Get the most out of your Vande Bharat Mart products with our expert guides.
            </p>
          </MotionDiv>

          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {userGuides.map((guide, index) => (
               <MotionDiv 
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="p-8 flex-grow">
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br ${guide.bgColor} text-white shadow-lg mb-6`}>
                    {guide.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-2xl text-brand-dark mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {guide.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 text-center">
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => openModal(guide.fileUrl)}
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-[var(--brand-green)] hover:bg-emerald-700 transition-colors"
                      aria-label={`Preview ${guide.title}`}
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownload(guide.fileUrl)}
                      className="inline-flex items-center justify-center px-6 py-3 border border-[var(--brand-green)] text-base font-medium rounded-full shadow-sm text-[var(--brand-green)] bg-white hover:bg-gray-50 transition-colors"
                      aria-label={`Download ${guide.title}`}
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
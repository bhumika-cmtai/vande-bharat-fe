import React from 'react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import { Leaf, Heart, ShieldCheck, Award, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductFeaturesSection() {
  const features = [ 
    {
      icon: Leaf,
      title: "Natural Ingredients",
      subtitle: "100% Pure & Organic",
      description: "Sourced directly from nature with no artificial additives or chemicals",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Heart,
      title: "Fragrance Free",
      subtitle: "Gentle & Safe",
      description: "No artificial fragrances or harsh chemicals that irritate sensitive skin",
      color: "from-pink-500 to-rose-600", 
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      icon: ShieldCheck,
      title: "Allergy Tested",
      subtitle: "Dermatologically Approved",
      description: "Rigorously tested for allergies and approved by dermatological experts",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50", 
      borderColor: "border-blue-200"
    },
    {
      icon: Award,
      title: "Paraben Free",
      subtitle: "Chemical Free Formula",
      description: "Free from parabens and harmful preservatives for your safety",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const productCategories = [
    {
      name: "Skincare",
      description: "Natural beauty solutions",
      icon: "🌿",
      count: "150+ Products"
    },
    {
      name: "Personal Care", 
      description: "Daily wellness essentials",
      icon: "🧴",
      count: "200+ Products"
    },
    {
      name: "Food & Nutrition",
      description: "Organic & healthy foods",
      icon: "🥗",
      count: "300+ Products"
    },
    {
      name: "Wellness",
      description: "Ayurvedic health products",
      icon: "🌱",
      count: "100+ Products"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-white via-green-50/30 to-blue-50/20 py-6 md:py-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        
        {/* Floating Elements */}
        <MotionDiv
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 right-16 opacity-20"
        >
          <Sparkles className="w-12 h-12 text-green-500" />
        </MotionDiv>
        
        <MotionDiv
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-32 left-24 opacity-15"
        >
          <Star className="w-8 h-8 text-blue-500" />
        </MotionDiv>
      </div>

      <div className="container mx-auto px-6 relative z-10">


        {/* CTA Section */}
        <MotionDiv
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
  className="text-center mt-16"
>
  {/* The main container with the tricolor gradient background */}
  <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-orange-500/80 via-white to-green-600/80 shadow-lg">
    
    {/* Subtle Ashoka Chakra in the background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <Image
          src="/ashok-chakra.jpg" // Make sure this SVG is in your /public folder
          alt="Ashoka Chakra"
          width={350}
          height={350}
          className="opacity-10"
        />
      </div>
    
    {/* The content, with a semi-transparent backdrop for readability */}
    <div className="relative z-10 bg-white/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
      <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">
        {/* New Patriotic Tagline */}
        Authentically Indian. Naturally Pure.
      </h3>
      <p className="text-lg md:text-xl text-blue-800 font-semibold mb-8 max-w-3xl mx-auto">
        From our soil to your soul, experience the true essence of Bharat.
      </p>
      
      <MotionDiv
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Link href="/shop">
          {/* Button themed with the Ashoka Chakra's navy blue */}
          <button className="bg-blue-800 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
            Explore Our Collection
          </button>
        </Link>
      </MotionDiv>
    </div>
  </div>
</MotionDiv>
      </div>
    </section>
  );
}
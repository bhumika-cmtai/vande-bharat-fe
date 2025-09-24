import React from 'react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import { Leaf, Heart, ShieldCheck, Award, Sparkles, Star } from 'lucide-react';

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
    <section className="relative bg-gradient-to-br from-white via-green-50/30 to-blue-50/20 py-20 md:py-32 overflow-hidden">
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
        {/* Header Section */}
        {/* <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-sm font-semibold text-green-800 mb-4">
            <Award className="w-4 h-4 mr-2" />
            Made in India • 100% Authentic
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Why Choose Our 
            <span className="bg-gradient-to-r from-[var(--brand-green)] via-[var(--brand-blue)] to-[var(--brand-green)] bg-clip-text text-transparent"> Natural Products?</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the power of Ayurvedic wisdom combined with modern science. Our products are crafted with 
            <span className="font-semibold text-green-700"> pure natural ingredients</span> to give you the best of India's heritage.
          </p>
          
          <div className="w-32 h-1 bg-[var(--brand-orange)] mx-auto mt-6 rounded-full"></div>
        </MotionDiv> */}

        {/* Features Grid */}
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >

        </MotionDiv>


        {/* CTA Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-[var(--brand-orange)]/70 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300 rounded-full mix-blend-overlay filter blur-xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Experience the Power of Nature
              </h3>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of happy customers who have transformed their lives with our authentic Indian products
              </p>
              
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-50 transition-colors shadow-lg hover:shadow-xl">
                  Shop Now 
                </button>
              </MotionDiv>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
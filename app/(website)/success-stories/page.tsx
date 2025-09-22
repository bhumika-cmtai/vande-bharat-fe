"use client";

import Image from 'next/image';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp, scaleInUp } from '@/lib/motion/motionVariants';
import { Quote, Star, TrendingUp, Users, Award, Heart } from 'lucide-react';

// Success Stories Page Component
export default function SuccessStoriesPage() {
  const successStories = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Delhi",
      image: "/customer1.jpg",
      story: "Vande Bharat Mart transformed my family's health. Their organic turmeric and honey helped my mother recover from chronic joint pain. We've been loyal customers for 2 years now.",
      rating: 5,
      category: "Health Transformation"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Mumbai",
      image: "/customer2.jpg",
      story: "As a working mother, finding pure and authentic products was challenging. VBM's organic spices and ghee have made my cooking healthier and more flavorful.",
      rating: 5,
      category: "Family Wellness"
    },
    {
      id: 3,
      name: "Arun Singh",
      location: "Bangalore",
      image: "/customer3.jpg",
      story: "Their Himalayan shilajit boosted my energy levels significantly. As a fitness enthusiast, I can feel the difference in my stamina and recovery time.",
      rating: 5,
      category: "Fitness & Energy"
    },
    {
      id: 4,
      name: "Meera Patel",
      location: "Gujarat",
      image: "/customer4.jpg",
      story: "Started my organic skincare routine with VBM's natural products. My skin has never looked better! The aloe vera and neem products are amazing.",
      rating: 5,
      category: "Beauty & Skincare"
    }
  ];

  const impactStats = [
    { number: "50,000+", label: "Happy Customers", icon: Users },
    { number: "1000+", label: "Farmer Partners", icon: Heart },
    { number: "500+", label: "Products Delivered", icon: TrendingUp },
    { number: "98%", label: "Satisfaction Rate", icon: Award }
  ];

  return (
    <main className="overflow-hidden">
      {/* === Hero Section === */}
      <section className="relative h-[70vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/success-hero.jpg"
            alt="Happy customers with natural products"
            fill
            priority
            className="object-cover scale-105 hover:scale-110 transition-transform duration-[3000ms]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/80 via-brand-blue/60 to-brand-orange/70" />
          
          {/* Floating Success Icons */}
          <div className="absolute inset-0">
            <MotionDiv
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-16 opacity-40"
            >
              <Star className="w-8 h-8 text-yellow-300" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-32 right-20 opacity-50"
            >
              <Award className="w-10 h-10 text-yellow-200" />
            </MotionDiv>
            <MotionDiv
              animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-32 left-24 opacity-30"
            >
              <Heart className="w-12 h-12 text-red-300" />
            </MotionDiv>
          </div>
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
                transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
              }
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-yellow-100 to-green-100 bg-clip-text text-transparent leading-tight">
              Success Stories
            </h1>
            <div className="absolute inset-0 text-5xl md:text-7xl font-bold text-white/20 blur-sm -z-10">
              Success Stories
            </div>
          </MotionDiv>
          <MotionDiv 
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } }
            }}
          >
            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              Real transformations, Real people, Real results with Vande Bharat Mart
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-orange to-brand-green mx-auto mt-6 rounded-full"></div>
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* === Impact Statistics === */}
      <section className="relative bg-gradient-to-br from-white via-green-50/30 to-blue-50/20 py-20">
        <div className="container mx-auto px-6">
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {impactStats.map((stat, index) => (
              <MotionDiv
                key={index}
                variants={{
                  hidden: { y: 50, opacity: 0, scale: 0.8 },
                  visible: { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.6, delay: index * 0.1 }
                  }
                }}
                className="text-center group"
              >
                <MotionDiv
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-green to-brand-blue rounded-full text-white mb-4 shadow-lg"
                >
                  <stat.icon className="w-8 h-8" />
                </MotionDiv>
                <h3 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2 group-hover:text-brand-green transition-colors">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* === Customer Success Stories === */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 md:py-32">
        <div className="container mx-auto px-6">
          <MotionDiv
            variants={scaleInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              Customer Transformation Stories
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-brand-green via-brand-orange to-brand-blue mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              Real people sharing their journey with our natural products
            </p>
          </MotionDiv>

          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {successStories.map((story, index) => (
              <MotionDiv
                key={story.id}
                variants={{
                  hidden: { y: 100, opacity: 0, rotateX: -30 },
                  visible: { 
                    y: 0, 
                    opacity: 1, 
                    rotateX: 0,
                    transition: { duration: 0.8, delay: index * 0.2, ease: "easeOut" }
                  }
                }}
                className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/40 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quote className="w-full h-full text-brand-green" />
                </div>
                
                {/* Customer Info */}
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                      <Image
                        src={story.image}
                        alt={story.name}
                        width={64}
                        height={64}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg text-brand-dark">{story.name}</h4>
                    <p className="text-gray-600">{story.location}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-brand-green/20 to-brand-blue/20 rounded-full text-sm font-semibold text-brand-dark mb-4">
                  {story.category}
                </div>

                {/* Story Content */}
                <MotionDiv
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Quote className="w-8 h-8 text-brand-green/40 mb-4" />
                  <p className="text-gray-700 leading-relaxed text-lg italic">
                    "{story.story}"
                  </p>
                </MotionDiv>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>

      {/* === Call to Action === */}
      <section className="relative bg-gradient-to-br from-brand-dark via-brand-green to-brand-blue py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of satisfied customers who have transformed their lives with our natural products
            </p>
            <MotionDiv
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="bg-white text-brand-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-100 transition-colors shadow-xl">
                Shop Now & Transform Your Life
              </button>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>
    </main>
  );
}
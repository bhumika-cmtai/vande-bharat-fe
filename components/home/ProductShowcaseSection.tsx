import React from 'react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer } from '@/lib/motion/motionVariants';
import { ArrowRight, Leaf, Star, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const fastFadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function ProductShowcaseSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 relative overflow-hidden">
      {/* Background Decorative Elements - Hidden on mobile for cleaner look */}
      <div className="absolute inset-0 opacity-20 hidden md:block">
        <MotionDiv animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 right-16">
          <Leaf className="w-12 h-12 text-green-600" />
        </MotionDiv>
        <MotionDiv animate={{ y: [0, 15, 0], x: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-32 right-32">
          <Star className="w-8 h-8 text-orange-500" />
        </MotionDiv>
        <MotionDiv animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-40 right-24">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </MotionDiv>
      </div>

      {/* Main Container - Responsive padding and background */}
      <div className="container mx-auto px-4 sm:px-6 bg-[var(--brand-orange)]/30 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl lg:rounded-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Side - Product Image - Order changed for mobile */}
          <MotionDiv
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center order-2 lg:order-1"
          >
            {/* Background Circle - Responsive size */}
            <MotionDiv 
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
              className="absolute inset-0 flex items-center justify-center"
            >
              <div 
                className="w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full opacity-80" 
                style={{ background: 'linear-gradient(135deg, #a7c957 0%, #88a654 50%, #6c8c4a 100%)' }} 
              />
            </MotionDiv>

            {/* Floating Decorative Elements - Responsive positioning and size */}
            <MotionDiv 
              animate={{ y: [0, -15, 0], rotate: [0, 360] }} 
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
              className="absolute top-8 sm:top-12 md:top-20 left-4 sm:left-8 md:left-12 z-10"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-200/60 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-700" />
              </div>
            </MotionDiv>
            <MotionDiv 
              animate={{ y: [0, 12, 0], x: [0, -8, 0] }} 
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
              className="absolute bottom-16 sm:bottom-20 md:bottom-24 right-8 sm:right-12 md:right-16 z-10"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/80 rounded-full flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-red-400" />
              </div>
            </MotionDiv>
            <MotionDiv 
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} 
              className="absolute top-20 sm:top-24 md:top-32 right-4 sm:right-6 md:right-8 z-10"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-yellow-300/70 rounded-full shadow-sm"></div>
            </MotionDiv>

            {/* Product Image Container - Responsive sizing */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotateY: 5, transition: { duration: 0.3 } }}
              className="relative z-20 flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px]"
            >
              <div className="w-full h-full rounded-3xl flex items-center justify-center">
                <Image 
                  src="/bgremove.png" 
                  alt="Product image" 
                  width={300}
                  height={300}
                  className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[390px] lg:h-[390px] object-contain absolute  sm:left-[18%] md:left-[0%]" 
                />
              </div>
              {/* Badge - Responsive positioning and size */}
              <MotionDiv 
                animate={{ y: [0, -8, 0] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg"
              >
                100% Natural
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>

          {/* Right Side - Content - Responsive text and spacing */}
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-4 sm:space-y-6 md:space-y-8 order-1 lg:order-2 text-center lg:text-left"
          >
            {/* Badge - Responsive size */}
            <MotionDiv>
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full text-xs sm:text-sm font-semibold text-orange-800 border border-orange-200">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 fill-current" />
                PREMIUM QUALITY
              </div>
            </MotionDiv>

            {/* Main Heading - Responsive text sizes */}
            <MotionDiv>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Elevate Your Essence &
                <span className="block bg-gradient-to-r from-green-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Nourish Your Body
                </span>
              </h2>
            </MotionDiv>

            {/* Description - Responsive text and spacing */}
            <MotionDiv>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-none lg:max-w-lg mx-auto lg:mx-0">
                Discover the power of nature with our premium collection of organic skincare products. 
                Each bottle is carefully crafted with pure ingredients to give your skin the nourishment 
                it deserves, bringing out your natural glow and vitality.
              </p>
            </MotionDiv>

            {/* CTA Button - Responsive size and spacing */}
            <MotionDiv className='hover:cursor-pointer'>
              <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block ">
                <Link href="/shop" >
                  <button className="group bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    Shop Collection
                    <MotionDiv 
                      animate={{ x: [0, 4, 0] }} 
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
                      className="inline-block ml-2"
                    >
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </MotionDiv>
                  </button>
                </Link>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
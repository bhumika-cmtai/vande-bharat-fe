import React from 'react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import { ArrowRight, Leaf, Star, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductShowcaseSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/40 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <MotionDiv
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-16"
        >
          <Leaf className="w-12 h-12 text-green-600" />
        </MotionDiv>
        
        <MotionDiv
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-32 right-32"
        >
          <Star className="w-8 h-8 text-orange-500" />
        </MotionDiv>

        <MotionDiv
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-24"
        >
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </MotionDiv>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Side - Product Image */}
          <MotionDiv
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center lg:justify-start"
          >
            {/* Background Circle */}
            <MotionDiv
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div 
                className="w-96 h-96 rounded-full opacity-80"
                style={{
                  background: 'linear-gradient(135deg, #a7c957 0%, #88a654 50%, #6c8c4a 100%)'
                }}
              />
            </MotionDiv>

            {/* Floating Decorative Elements around circle */}
            <MotionDiv
              animate={{
                y: [0, -15, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-20 left-12 z-10"
            >
              <div className="w-16 h-16 bg-green-200/60 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-8 h-8 text-green-700" />
              </div>
            </MotionDiv>

            <MotionDiv
              animate={{
                y: [0, 12, 0],
                x: [0, -8, 0]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-24 right-16 z-10"
            >
              <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-md">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
            </MotionDiv>

            <MotionDiv
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-32 right-8 z-10"
            >
              <div className="w-8 h-8 bg-yellow-300/70 rounded-full shadow-sm"></div>
            </MotionDiv>

            {/* Product Image Placeholder */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="relative z-20 flex items-center justify-center"
              style={{ width: '400px', height: '400px' }}
            >
              {/* Product Image Container */}
              <div className="w-full h-full  rounded-3xl  flex items-center justify-center">
                <Image 
                src="/bgremove.png"
                alt="Product image"
                width={390}
                height={390}
                className='absolute left-[20%]'
                />
              </div>
              
              {/* Floating Badge */}
              <MotionDiv
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              >
                100% Natural
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>

          {/* Right Side - Content */}
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            {/* Badge */}
            <MotionDiv
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full text-sm font-semibold text-orange-800 border border-orange-200">
                <Star className="w-4 h-4 mr-2 fill-current" />
                PREMIUM QUALITY
              </div>
            </MotionDiv>

            {/* Main Heading */}
            <MotionDiv
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.8, delay: 0.1, ease: "easeOut" }
                }
              }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Elevate Your Essence &
                <span className="block bg-gradient-to-r from-green-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Nourish Your Body
                </span>
              </h2>
            </MotionDiv>

            {/* Description */}
            <MotionDiv
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
                }
              }}
            >
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover the power of nature with our premium collection of organic skincare products. 
                Each bottle is carefully crafted with pure ingredients to give your skin the nourishment 
                it deserves, bringing out your natural glow and vitality.
              </p>
            </MotionDiv>

            {/* CTA Button */}
            <MotionDiv
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
                }
              }}
            >
              <MotionDiv
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link href="/shop">
                <button className="group bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  Shop Collection
                  <MotionDiv
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="inline-block ml-2"
                  >
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </MotionDiv>
                </button>
                </Link>
              </MotionDiv>
            </MotionDiv>

            {/* Navigation Dots */}
            <MotionDiv
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, delay: 0.4, ease: "easeOut" }
                }
              }}
              className="flex items-center space-x-3 pt-8"
            >
              <MotionDiv
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 bg-green-500 rounded-full cursor-pointer"
              />
              <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500 to-gray-300 rounded-full"></div>
              <MotionDiv
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 bg-gray-300 rounded-full cursor-pointer hover:bg-green-400 transition-colors"
              />
              <div className="flex-1 h-0.5 bg-gray-300 rounded-full"></div>
              <MotionDiv
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 bg-gray-300 rounded-full cursor-pointer hover:bg-green-400 transition-colors"
              />
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
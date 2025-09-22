"use client";

import Image from 'next/image';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp, scaleInUp } from '@/lib/motion/motionVariants';
import { Leaf, Heart, Globe, Sparkles, Star } from 'lucide-react'; // Icons for our values section

// About Us Page Component
export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* === Hero Section === */}
      <section className="relative h-[70vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about.jpg"
            alt="Lush green leaves representing nature and purity"
            fill
            priority
            className="object-cover scale-105 hover:scale-110 transition-transform duration-[3000ms]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/70 via-brand-green/50 to-brand-blue/60" />
          
          {/* Floating Elements */}
          <div className="absolute inset-0">
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
              className="absolute top-20 left-10 opacity-30"
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </MotionDiv>
            <MotionDiv
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-32 right-16 opacity-40"
            >
              <Star className="w-6 h-6 text-yellow-200" />
            </MotionDiv>
            <MotionDiv
              animate={{
                y: [0, -25, 0],
                x: [0, 10, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-32 left-20 opacity-25"
            >
              <Leaf className="w-10 h-10 text-green-300" />
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
                transition: { 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }
            }}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-yellow-100 to-green-100 bg-clip-text text-transparent leading-tight">
              About Vande Bharat Mart
            </h1>
            {/* Glowing effect */}
            <div className="absolute inset-0 text-5xl md:text-7xl font-bold text-white/20 blur-sm -z-10">
              About Vande Bharat Mart
            </div>
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
              Bringing the authentic essence of India's nature to your doorstep.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-green to-brand-orange mx-auto mt-6 rounded-full"></div>
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* === Our Story Section === */}
      <section className="relative bg-gradient-to-br from-white via-green-50/30 to-blue-50/20 py-20 md:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-brand-green rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-orange rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative inline-block mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">
                Our Story: A Journey Back to Nature
              </h2>
              <MotionDiv
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-8 h-8 text-brand-orange opacity-60" />
              </MotionDiv>
            </div>
            
            <div className="space-y-6">
              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <p className="text-xl text-gray-700 leading-relaxed bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                  Vande Bharat Mart was born from a simple idea: to reconnect people with the pure, natural, and wholesome products that are the heart of Indian heritage. In a world of fast-paced living, we felt a calling to return to our roots—to the wisdom of Ayurveda, the purity of organic farming, and the goodness of nature.
                </p>
              </MotionDiv>
              
              <MotionDiv
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="text-xl text-gray-700 leading-relaxed bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
                  We partner directly with local farmers and artisans across the country, ensuring that every product we offer is not only authentic but also supports the communities that craft them. From the Himalayan foothills to the spice gardens of the south, our journey is a celebration of India's rich biodiversity.
                </p>
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </section>
      
      {/* === Mission & Vision with Animated Images === */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 md:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <MotionDiv
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-10 w-32 h-32 border-2 border-brand-green/20 rounded-full"
          />
          <MotionDiv
            animate={{
              rotate: [360, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-16 w-24 h-24 border-2 border-brand-orange/20 rounded-full"
          />
        </div>
        
        <div className="container mx-auto px-6 space-y-32 relative z-10">
          {/* Our Mission */}
          <MotionDiv 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <MotionDiv 
              variants={{ 
                hidden: { x: -100, opacity: 0, rotateY: -30 }, 
                visible: { 
                  x: 0, 
                  opacity: 1, 
                  rotateY: 0,
                  transition: { 
                    duration: 1, 
                    ease: 'easeOut' 
                  } 
                } 
              }}
              className="group"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-700">
                <Image
                  src="/about1.jpg"
                  alt="Hands holding fresh herbs"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-green/20 group-hover:to-brand-green/10 transition-all duration-700" />
                
                {/* Floating badge */}
                <MotionDiv
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                >
                  Pure & Natural
                </MotionDiv>
              </div>
            </MotionDiv>
            
            <MotionDiv 
              variants={{ 
                hidden: { x: 100, opacity: 0 }, 
                visible: { 
                  x: 0, 
                  opacity: 1,
                  transition: { 
                    duration: 1, 
                    ease: 'easeOut',
                    delay: 0.3 
                  } 
                } 
              }}
              className="space-y-6"
            >
              <div className="relative">
                <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
                  Our Mission
                </h3>
                <div className="absolute -left-4 top-0 w-2 h-16 bg-gradient-to-b from-brand-green to-brand-orange rounded-full"></div>
              </div>
              
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/40"
              >
                <p className="text-xl text-gray-700 leading-relaxed">
                  To provide every household with access to 100% pure, authentic, and natural Indian products that promote a healthy and conscious lifestyle, while empowering local communities.
                </p>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>

          {/* Our Vision */}
          <MotionDiv 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <MotionDiv 
              variants={{ 
                hidden: { x: -100, opacity: 0, rotateY: 30 }, 
                visible: { 
                  x: 0, 
                  opacity: 1, 
                  rotateY: 0,
                  transition: { 
                    duration: 1, 
                    ease: 'easeOut' 
                  } 
                } 
              }} 
              className="md:order-2 group"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-700">
                <Image
                  src="/about2.jpg"
                  alt="A smiling farmer in a field"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-blue/20 group-hover:to-brand-blue/10 transition-all duration-700" />
                
                {/* Floating badge */}
                <MotionDiv
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute top-4 left-4 bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                >
                  Sustainable Future
                </MotionDiv>
              </div>
            </MotionDiv>
            
            <MotionDiv 
              variants={{ 
                hidden: { x: 100, opacity: 0 }, 
                visible: { 
                  x: 0, 
                  opacity: 1,
                  transition: { 
                    duration: 1, 
                    ease: 'easeOut',
                    delay: 0.3 
                  } 
                } 
              }} 
              className="md:order-1 space-y-6"
            >
              <div className="relative">
                <h3 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
                  Our Vision
                </h3>
                <div className="absolute -left-4 top-0 w-2 h-16 bg-gradient-to-b from-brand-blue to-brand-green rounded-full"></div>
              </div>
              
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/40"
              >
                <p className="text-xl text-gray-700 leading-relaxed">
                  To be the most trusted global bridge to India's natural and Ayurvedic heritage, creating a sustainable future for both our customers and our local partners.
                </p>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>
      
      {/* === Our Core Values === */}
      <section className="relative bg-gradient-to-br from-white via-yellow-50/30 to-green-50/20 py-20 md:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23065f46' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <MotionDiv
            variants={scaleInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-20"
          >
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
                Our Core Values
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-brand-green via-brand-orange to-brand-blue mx-auto rounded-full"></div>
            </div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </MotionDiv>
          
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {/* Value 1 - Purity */}
            <MotionDiv 
              variants={{
                hidden: { y: 100, opacity: 0, scale: 0.8 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.8,
                    ease: "easeOut"
                  } 
                }
              }} 
              className="group text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-white/40"
            >
              <MotionDiv
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto mb-6"
              >
                <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-brand-green to-emerald-400 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Leaf className="w-10 h-10"/>
                </div>
                <div className="absolute inset-0 bg-brand-green/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </MotionDiv>
              <h3 className="font-bold text-2xl text-brand-dark mb-4 group-hover:text-brand-green transition-colors duration-300">
                Purity
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We believe in transparency and offer products that are 100% natural and free from additives.
              </p>
            </MotionDiv>
            
            {/* Value 2 - Community */}
            <MotionDiv 
              variants={{
                hidden: { y: 100, opacity: 0, scale: 0.8 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.2
                  } 
                }
              }} 
              className="group text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-white/40"
            >
              <MotionDiv
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto mb-6"
              >
                <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-brand-orange to-orange-400 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Heart className="w-10 h-10"/>
                </div>
                <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </MotionDiv>
              <h3 className="font-bold text-2xl text-brand-dark mb-4 group-hover:text-brand-orange transition-colors duration-300">
                Community
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We are committed to the fair-trade upliftment of our local farmers and artisans.
              </p>
            </MotionDiv>
            
            {/* Value 3 - Sustainability */}
            <MotionDiv 
              variants={{
                hidden: { y: 100, opacity: 0, scale: 0.8 },
                visible: { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.4
                  } 
                }
              }} 
              className="group text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-white/40"
            >
              <MotionDiv
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto mb-6"
              >
                <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-brand-blue to-blue-400 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Globe className="w-10 h-10"/>
                </div>
                <div className="absolute inset-0 bg-brand-blue/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </MotionDiv>
              <h3 className="font-bold text-2xl text-brand-dark mb-4 group-hover:text-brand-blue transition-colors duration-300">
                Sustainability
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We practice and promote farming methods that respect and preserve Mother Nature.
              </p>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>
    </main>
  );
}
"use client";

import Image from 'next/image';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp, scaleInUp } from '@/lib/motion/motionVariants';
import { Quote, Heart, Users, Sparkles, Star, Award, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Director Message Page Component
export default function DirectorMessagePage() {
  return (
    <main className="overflow-hidden bg-[var(--brand-orange)]/10">
        <Navbar />
      {/* === Hero Section === */}
      <section className="relative h-[70vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/director-hero.jpg"
            alt="Traditional Ayurvedic herbs and natural ingredients"
            fill
            priority
            className="object-cover scale-105 hover:scale-110 transition-transform duration-[3000ms]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/80 via-[var(--brand-green-100)]/30 to-[var(--brand-orange-100)]/30" />
          
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
              <Quote className="w-8 h-8 text-yellow-300" />
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
              <Heart className="w-10 h-10 text-red-300" />
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
              Director's Message
            </h1>
            {/* Glowing effect */}
            <div className="absolute inset-0 text-5xl md:text-7xl font-bold text-white/20 blur-sm -z-10">
              Director's Message
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
              A personal note from our founder on our journey of natural wellness.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-orange)] mx-auto mt-6 rounded-full"></div>
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* === Director Profile Section === */}
      <section className="relative bg-gradient-to-br from-white via-green-50/30 to-blue-50/20 py-20 md:py-32">
        <div className="container mx-auto px-6 relative z-10">
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto"
          >
            {/* Director Photo */}
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
              className="group relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-700">
                <Image
                  src="/director-profile.jpg"
                  alt="Dr. vande bharat - Director and Founder"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--brand-green-100)]/20 group-hover:to-[var(--brand-green-100)]/10 transition-all duration-700" />
                
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
                  className="absolute -bottom-4 -right-4 bg-[var(--brand-orange)] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  Ayurveda Expert
                </MotionDiv>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[var(--brand-green)] to-emerald-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[var(--brand-orange)] to-orange-400 rounded-full opacity-20 blur-xl"></div>
            </MotionDiv>
            
            {/* Director Info */}
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
              className="space-y-8"
            >
              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 leading-tight">
                  Dr. vande bharat
                </h2>
                <p className="text-xl text-[var(--brand-green)] font-semibold mb-2">Founder & Director</p>
                <p className="text-lg text-gray-600">Ph.D. in Ayurvedic Medicine, 25+ Years Experience</p>
                <div className="absolute -left-4 top-0 w-2 h-20 bg-gradient-to-b from-[var(--brand-green)] to-[var(--brand-orange)] rounded-full"></div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6">
                <MotionDiv
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/40"
                >
                  <div className="text-2xl font-bold text-[var(--brand-green)]">25+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </MotionDiv>
                <MotionDiv
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/40"
                >
                  <div className="text-2xl font-bold text-[var(--brand-orange)]">500K+</div>
                  <div className="text-sm text-gray-600">Lives Touched</div>
                </MotionDiv>
                <MotionDiv
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/40"
                >
                  <div className="text-2xl font-bold text-[var(--brand-blue)]">100+</div>
                  <div className="text-sm text-gray-600">Natural Products</div>
                </MotionDiv>
              </div>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>
      
      {/* === Director's Message === */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-orange-50 py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Quote Icon */}
            <div className="text-center mb-12">
              <MotionDiv
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--brand-green)] to-emerald-400 rounded-full text-white shadow-2xl mb-6"
              >
                <Quote className="w-10 h-10" />
              </MotionDiv>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">A Personal Message</h2>
            </div>
            
            <div className="space-y-8">
              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-white/40 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--brand-green)] via-[var(--brand-orange)] to-[var(--brand-blue)]"></div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-[var(--brand-green)] first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                    Namaste! When I started this journey 25 years ago, I had a simple dream - to bring the ancient wisdom of Ayurveda to every home, making natural wellness accessible to all. Growing up in a family of traditional healers, I witnessed firsthand the incredible power of nature's pharmacy.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Today, as we face an increasingly chemical-laden world, the need for pure, authentic Ayurvedic solutions has never been greater. Each product in our collection represents years of research, traditional knowledge, and a commitment to your family's wellbeing.
                  </p>
                </div>
              </MotionDiv>
              
              <MotionDiv
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-[var(--brand-green-100)]/30 to-[var(--brand-orange-100)]/30 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-white/40">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    At Vande Bharat Mart, we don't just sell products - we share a legacy. Every herb is sourced directly from traditional farmers, every formulation follows ancient texts, and every package carries our promise of purity. We believe that wellness is not just the absence of disease, but a state of complete physical, mental, and spiritual harmony.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    I invite you to join our family and experience the transformative power of authentic Ayurveda. Together, let's embrace a lifestyle that honors our roots while nurturing our future.
                  </p>
                </div>
              </MotionDiv>
              
              {/* Signature */}
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center mt-12"
              >
                <div className="inline-block bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/40">
                  <div className="text-3xl font-bold text-[var(--brand-green)] mb-2" style={{ fontFamily: 'cursive' }}>
                    Dr. Rajesh Sharma
                  </div>
                  <div className="text-lg text-gray-600">Founder & Director</div>
                  <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-orange)] mx-auto mt-4 rounded-full"></div>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </section>
      
      {/* === Vision & Philosophy === */}
      <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-green-50/20 py-20 md:py-32">
        <div className="container mx-auto px-6 relative z-10">
          <MotionDiv
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto"
          >
            {/* Philosophy */}
            <MotionDiv 
              variants={{
                hidden: { y: 100, opacity: 0, scale: 0.9 },
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
              className="group text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/40"
            >
              <MotionDiv
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto mb-6"
              >
                <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-[var(--brand-green)] to-emerald-400 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Target className="w-10 h-10"/>
                </div>
                <div className="absolute inset-0 bg-[var(--brand-green-100)]/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </MotionDiv>
              <h3 className="font-bold text-2xl md:text-3xl text-brand-dark mb-4 group-hover:text-[var(--brand-green)] transition-colors duration-300">
                Our Philosophy
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                "Sarve bhavantu sukhinah, sarve santu niramayah" - May all beings be happy, may all beings be free from illness. This ancient Sanskrit verse guides our every decision and product.
              </p>
            </MotionDiv>
            
            {/* Promise */}
            <MotionDiv 
              variants={{
                hidden: { y: 100, opacity: 0, scale: 0.9 },
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
              className="group text-center p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/40"
            >
              <MotionDiv
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto mb-6"
              >
                <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-[var(--brand-orange)] to-orange-400 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Heart className="w-10 h-10"/>
                </div>
                <div className="absolute inset-0 bg-[var(--brand-orange-100)]/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </MotionDiv>
              <h3 className="font-bold text-2xl md:text-3xl text-brand-dark mb-4 group-hover:text-[var(--brand-orange)] transition-colors duration-300">
                Our Promise
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Every product carries our family's seal of trust - sourced ethically, processed traditionally, and delivered with love. Your wellness is our sacred responsibility.
              </p>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>
      <Footer />
    </main>
  );
}
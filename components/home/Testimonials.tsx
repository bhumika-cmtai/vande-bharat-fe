"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { MotionDiv } from '../motion/MotionDiv';
import { fadeInUp } from '@/lib/motion/motionVariants';




export interface Testimonial {
    id: string;
    name: string;
    date: string;
    avatarUrl: string;
    rating: number;
    title: string;
    comment: string;
  }
  
  export const mockTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Priya S.',
      date: '14 August',
      avatarUrl: 'https://source.unsplash.com/mEZ3PoFGs_k/100x100',
      rating: 5,
      title: 'Authenticity at its Best!',
      comment: "I've been using their organic basmati rice for a month, and the quality is outstanding. It reminds me of the authentic taste from my village. It's pure, aromatic, and absolutely delicious."
    },
    {
      id: '2',
      name: 'Rohan M.',
      date: '22 July',
      avatarUrl: 'https://source.unsplash.com/iuyg1PBe_hI/100x100',
      rating: 5,
      title: 'Amazing Ayurvedic Shampoo',
      comment: "The herbal shampoo is a game-changer. It has controlled my hair fall and leaves my hair feeling so soft and healthy without any harsh chemicals. Highly recommended!"
    },
    {
      id: '3',
      name: 'Anjali K.',
      date: '05 July',
      avatarUrl: 'https://source.unsplash.com/6_eAlN-A_so/100x100',
      rating: 4,
      title: 'Great Quality Spices',
      comment: "The turmeric powder has such a vibrant color and strong aroma. You can tell it's pure and not adulterated. It has elevated the taste of my cooking. Will definitely buy more."
    },
    {
      id: '4',
      name: 'Vikram P.',
      date: '18 June',
      avatarUrl: 'https://source.unsplash.com/C8Ta0gwPbQg/100x100',
      rating: 5,
      title: 'Fast and Reliable Delivery',
      comment: "I was pleasantly surprised by how quickly my order arrived. The packaging was excellent, and all the products were fresh. A great online shopping experience."
    }
  ];

export const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const testimonials = mockTestimonials;

    // Isse index humesha 0 se testimonials.length-1 ke beech rahega
    const activeIndex = (index % testimonials.length + testimonials.length) % testimonials.length;

    const goToPrev = () => setIndex(index - 1);
    const goToNext = () => setIndex(index + 1);

    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <MotionDiv
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
                        Our Happy Clients
                    </h2>
                </MotionDiv>
                
                <div className="relative h-[420px] md:h-[350px] flex items-center justify-center">
                    {/* Navigation Buttons */}
                    <button onClick={goToPrev} className="absolute left-0 md:left-10 z-20 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-600"/>
                    </button>
                    <button onClick={goToNext} className="absolute right-0 md:right-10 z-20 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <ArrowRight className="w-6 h-6 text-gray-600"/>
                    </button>

                    {/* Carousel Viewport */}
                    <AnimatePresence>
                        {[-1, 0, 1].map((position) => {
                            const testimonialIndex = (activeIndex + position + testimonials.length) % testimonials.length;
                            const testimonial = testimonials[testimonialIndex];

                            return (
                                <motion.div
                                    key={activeIndex + position}
                                    initial={{ 
                                        x: `${position * 110}%`, 
                                        scale: position === 0 ? 1 : 0.8,
                                        opacity: position === 0 ? 1 : 0.5,
                                        zIndex: position === 0 ? 10 : 0
                                    }}
                                    animate={{ 
                                        x: `${position * 55}%`,
                                        scale: position === 0 ? 1 : 0.8,
                                        opacity: position === 0 ? 1 : 0.5,
                                        zIndex: position === 0 ? 10 : 0
                                    }}
                                    exit={{
                                        x: `${position * 55}%`,
                                        opacity: 0,
                                        scale: 0.5
                                    }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                    className="absolute w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
                                >
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                                <Image src={testimonial.avatarUrl} alt={testimonial.name} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-brand-dark">{testimonial.name}</p>
                                                <p className="text-sm text-gray-500">{testimonial.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    {/* Card Body */}
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-dark mb-2">{testimonial.title}</h3>
                                        <p className="text-gray-600 leading-relaxed line-clamp-4">{testimonial.comment}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
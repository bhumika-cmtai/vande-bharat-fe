"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { fadeInUp, staggerContainer } from '@/lib/motion/motionVariants'; // Path ko check kar lein

const slides = [
  {
    id: 1,
    imageUrl: '/hero1.jpg',
    title: 'Embrace Purity, Embrace Nature',
    subtitle: 'Discover our 100% Organic & Ayurvedic collection.',
    buttonText: 'Shop Now',
  },
  {
    id: 2,
    imageUrl: '/hero2.jpg',
    title: 'Fresh Harvest, Best Prices',
    subtitle: 'Get up to 30% off on all grains and flours.',
    buttonText: 'Explore Deals',
  },
  {
    id: 3,
    imageUrl: '/hero3.jpg',
    title: 'Straight from the Heart of India',
    subtitle: 'Authentic products supporting local communities.',
    buttonText: 'Our Story',
  },
];

// Animation variants ko behtar banaya gaya hai
const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: '0%',
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const HeroSlider = () => {
  // State ko saral banaya gaya: sirf active index aur animation direction
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Autoplay interval ko store karne ke liye useRef ka istemal
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Slide ko change karne ke liye functions
  const goToSlide = (newIndex: number) => {
    // Animation direction set karein
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
    resetAutoplay();
  };
  
  const goToNext = () => {
    const newIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    goToSlide(newIndex);
  };
  
  const goToPrev = () => {
    const newIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    goToSlide(newIndex);
  };
  
  // Autoplay timer ko reset karne ka function
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(goToNext, 5000); // 5 seconds
  };
  
  // useEffect sirf component mount hone par chalega
  useEffect(() => {
    resetAutoplay(); // Autoplay shuru karein
    
    // Component unmount hone par interval ko clear karein
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []); // Khali dependency array matlab yeh sirf ek baar chalega

  const slide = slides[activeIndex];

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden flex items-center justify-center">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeIndex} // Key ab activeIndex par hai
          className="absolute h-full w-full"
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          // SMOOTHER ANIMATION: `spring` ki jagah `tween` ka istemal
          transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            priority={slide.id === 1}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <motion.div
        key={`text-${activeIndex}`} // Text ke liye bhi alag key, taaki woh bhi re-animate ho
        className="relative z-10 text-center text-white p-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          {slide.title}
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
          {slide.subtitle}
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Button size="lg" className="bg-gradient-to-r from-brand-orange to-brand-blue text-lg hover:opacity-90 transition-opacity">
            {slide.buttonText}
          </Button>
        </motion.div>
      </motion.div>

      {/* Controls */}
      <div className="absolute z-20 top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
        <Button size="icon" className="rounded-full bg-white/20 hover:bg-white/40" onClick={goToPrev}>
          <ChevronLeft />
        </Button>
        <Button size="icon" className="rounded-full bg-white/20 hover:bg-white/40" onClick={goToNext}>
          <ChevronRight />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${i === activeIndex ? 'bg-white w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
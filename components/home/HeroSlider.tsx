"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    imageUrl: '/hero2.jpg',
    title: 'Embrace Purity, Embrace Nature',
    subtitle: 'Discover our 100% Organic & Ayurvedic collection.',
    buttonText: 'Shop Now',
    href: '/shop'
  },
  {
    id: 2,
    imageUrl: '/hero1.jpg',
    title: 'Fresh Harvest, Best Prices',
    subtitle: 'Get up to 30% off on all grains and flours.',
    buttonText: 'Explore Deals',
    href: '/shop/sale'
  },
  {
    id: 3,
    imageUrl: '/hero3.jpg',
    title: 'Straight from the Heart of India',
    subtitle: 'Authentic products supporting local communities.',
    buttonText: 'Our Story',
    href: '/about'
  },
];

// ===== ANIMATION FIX 1: FASTER & SMOOTHER SLIDE TRANSITION =====
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

// ===== ANIMATION FIX 2: FASTER TEXT ANIMATION =====
// Stagger (delay between items) ko kam kiya gaya hai taaki text ek saath appear ho.
const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1, // Pehle yeh zyada tha, ab 0.1s hai
    },
  },
};

// Text ke upar aane ka distance (y) aur duration kam kiya gaya hai.
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30, // Thoda kam distance
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5, // Duration 0.5s kar di hai, for quick appearance
      ease: 'easeOut'
    },
  },
};

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (newIndex: number) => {
    if (newIndex === activeIndex) return; // Agar same slide par click ho to kuch na karein
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };
  
  const goToNext = () => {
    const newIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setDirection(1);
    setActiveIndex(newIndex);
  };
  
  const goToPrev = () => {
    const newIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setDirection(-1);
    setActiveIndex(newIndex);
  };

  // Autoplay ko behtar banaya gaya
  useEffect(() => {
    const resetAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      // ===== ANIMATION FIX 3: AUTOPLAY DURATION ADJUSTED =====
      // Autoplay ko 4 seconds kiya gaya, taaki user ko padhne ka time mile aur animation frantic na lage.
      autoplayRef.current = setInterval(goToNext, 4000); 
    };
    
    resetAutoplay();

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [activeIndex]); // Jab bhi slide change ho, timer reset ho.

  const slide = slides[activeIndex];

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeIndex}
          className="absolute h-full w-full"
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          // Slide transition ko bhi thoda fast kiya gaya hai.
          transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut' }}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            priority={slide.id === 1}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-4">
        <motion.div
            key={`text-${activeIndex}`} // Text ke liye bhi alag key, taaki woh bhi re-animate ho
            // variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
        >
            <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            {slide.title}
            </motion.h1>
            <motion.p  className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
            {slide.subtitle}
            </motion.p>
            <motion.div>
            <Link href={slide.href}>
                <Button size="lg" className="bg-orange-500 text-lg text-white hover:bg-orange-600 transition-colors duration-300 rounded-full px-8 py-6">
                {slide.buttonText}
                </Button>
            </Link>
            </motion.div>
        </motion.div>
      </div>


      {/* Controls */}
      <div className="absolute z-20 top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
        <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/40 text-white" onClick={goToPrev}>
          <ChevronLeft />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/40 text-white" onClick={goToNext}>
          <ChevronRight />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
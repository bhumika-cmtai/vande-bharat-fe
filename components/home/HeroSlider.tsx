"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

// ===== UPDATED DATA: Now with English text =====
const slides = [
  {
    id: 1,
    videoUrl: '/videos/indianflag2.mp4', // Place your video in /public/videos/
    title: "Embrace Nature's Purity",
    subtitle: 'Discover our 100% Organic & Ayurvedic collection.',
    buttonText: 'Shop Now',
    href: '/shop'
  },
  {
    id: 2,
    videoUrl: '/videos/indianflag1.mp4', // Place your video in /public/videos/
    title: 'Reveal Your Natural Glow',
    subtitle: 'Enhance your beauty with our skincare and personal care range.',
    buttonText: 'View Collection',
    href: '/shop?category=skin-care'
  },
  {
    id: 3,
    videoUrl: '/videos/india.mp4', // Place your video in /public/videos/
    title: 'Rooted in Tradition, Crafted for Today',
    subtitle: 'Authentic Indian products that support your wellness journey.',
    buttonText: 'Our Story',
    href: '/about'
  },
];


// Animation variants remain the same (already optimized)
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = (newIndex: number) => {
    if (newIndex === activeIndex) return;
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

  useEffect(() => {
    const resetAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      // Autoplay duration is slightly longer for video
      autoplayRef.current = setInterval(goToNext, 10000); 
    };
    
    resetAutoplay();

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [activeIndex]);

  const slide = slides[activeIndex];

  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeIndex}
          className="absolute h-full w-full"
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Video player implementation */}
          <video
            key={slide.id} // The key is important for re-rendering the video on slide change
            src={slide.videoUrl}
            autoPlay
            muted
            loop
            playsInline // Important for iOS devices
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-4">
        <motion.div
            key={`text-${activeIndex}`}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
        >
            <motion.h1 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
                {slide.title}
            </motion.h1>
            <motion.p 
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto"
            >
                {slide.subtitle}
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <Link href={slide.href}>
                    <Button size="lg" className="bg-white text-gray-900 text-lg hover:bg-gray-200 transition-colors duration-300 rounded-full px-8 py-6 font-bold">
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
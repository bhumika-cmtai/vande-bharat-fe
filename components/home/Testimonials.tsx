"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, PlayCircle, Loader2 } from 'lucide-react';
import { MotionDiv } from '../motion/MotionDiv'; // Path check kar lein
import { fadeInUp } from '@/lib/motion/motionVariants'; // Path check kar lein

// --- Redux Imports ---
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
// Ab hum testimonialSlice se sab kuch import kar rahe hain
import { fetchPublicTestimonials, VideoTestimonial } from '@/lib/redux/slices/testimonialSlice';

export const Testimonials = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    // --- Redux se data fetch karein ---
    const { testimonials, loading, error } = useSelector((state: RootState) => ({
        testimonials: state.testimonials.publicTestimonials,
        loading: state.testimonials.publicLoading,
        error: state.testimonials.publicError,
    }));

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPlaying, setIsPlaying] = useState<string | null>(null);

    // Component ke mount hone par testimonials fetch karein
    useEffect(() => {
        // Sirf tabhi fetch karein agar data pehle se nahi hai
        if (testimonials.length === 0) {
            dispatch(fetchPublicTestimonials());
        }
    }, [dispatch, testimonials.length]);

    // --- Loading State ---
    if (loading) {
        return (
            <section className="bg-gray-50/70 py-20 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 animate-spin text-brand-dark" />
            </section>
        );
    }

    // --- Error State ---
    if (error) {
        return (
            <section className="bg-red-50 py-20 text-center">
                <h3 className="text-xl text-red-700">Oops! Could not load testimonials.</h3>
                <p className="text-red-600">{error}</p>
            </section>
        );
    }
    
    // --- Empty State (Agar fetch hone ke baad bhi data na ho) ---
    if (!testimonials || testimonials.length === 0) {
        // Agar koi testimonial nahi hai to section ko render hi na karein
        return null; 
    }

    const activeIndex = (index % testimonials.length + testimonials.length) % testimonials.length;
    const canNavigate = testimonials.length > 1;

    const changeSlide = (newDirection: number) => {
        if (!canNavigate) return;
        setIsPlaying(null); // Slide badalte samay video band kar dein
        setDirection(newDirection);
        setIndex(prevIndex => prevIndex + newDirection);
    };

    const handlePlay = (_id: string) => {
        setIsPlaying(_id);
    };

    return (
        <section className="bg-gray-50/70 py-20 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <MotionDiv
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Voices of Our Community
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">
                        See what our happy customers have to say about their experience.
                    </p>
                </MotionDiv>
                
                {/* Main Carousel Container */}
                <div className="relative h-[600px] flex items-center justify-center">
                    {/* Navigation Buttons */}
                    <button onClick={() => changeSlide(-1)} disabled={!canNavigate} className="absolute left-0 xl:left-20 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <ArrowLeft className="w-6 h-6 text-gray-700"/>
                    </button>
                    <button onClick={() => changeSlide(1)} disabled={!canNavigate} className="absolute right-0 xl:right-20 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <ArrowRight className="w-6 h-6 text-gray-700"/>
                    </button>

                    {/* Carousel Viewport */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction}>
                            {[-1, 0, 1].map((position) => {
                                // Agar sirf ek hi testimonial hai, to side wale cards na dikhayein
                                if (testimonials.length < 3 && position !== 0) {
                                    return null;
                                }

                                const testimonialIndex = (activeIndex + position + testimonials.length) % testimonials.length;
                                const testimonial = testimonials[testimonialIndex];

                                const isCenter = position === 0;
                                const isPlayingThisVideo = isPlaying === testimonial._id;

                                return (
                                    <motion.div
                                        key={activeIndex + position}
                                        custom={direction}
                                        variants={{
                                            enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
                                            center: { x: `${position * 40}%`, scale: isCenter ? 1 : 0.7, zIndex: isCenter ? 10 : 0, opacity: isCenter ? 1 : 0.5 },
                                            exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
                                        }}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                        className="absolute w-[280px] h-[500px] rounded-3xl bg-gray-900 shadow-2xl overflow-hidden"
                                    >
                                        {/* Video or Thumbnail */}
                                        <AnimatePresence>
                                            {isPlayingThisVideo ? (
                                                <motion.video
                                                    key={testimonial.videoUrl}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    src={testimonial.videoUrl}
                                                    autoPlay={true}
                                                    controls
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <motion.div
                                                    key={testimonial.thumbnailUrl}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="w-full h-full"
                                                >
                                                    <Image src={testimonial.thumbnailUrl} alt={testimonial.name} fill className="object-cover" />
                                                    {/* Play Button Overlay */}
                                                    {isCenter && (
                                                        <div
                                                            onClick={() => handlePlay(testimonial._id)}
                                                            className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
                                                        >
                                                            <PlayCircle className="w-16 h-16 text-white/80" />
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Customer Info Overlay */}
                                        {!isPlayingThisVideo && (
                                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                                                <p className="font-bold text-lg">{testimonial.name}</p>
                                                <p className="text-sm opacity-80">{testimonial.location}</p>
                                                <p className="text-xs mt-1 font-semibold bg-white/20 inline-block px-2 py-1 rounded-full">
                                                    Reviewing: {testimonial.productName}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
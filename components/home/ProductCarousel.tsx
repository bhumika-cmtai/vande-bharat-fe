"use client";

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store'; // Import your store types
import { fetchProducts } from '@/lib/redux/slices/productSlice'; // Import the thunk
import { MiniProductCard } from '../MiniProductCard';
import { MotionDiv, motion } from '../motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductCarousel = () => {
    // Connect to the Redux store to get state and dispatch actions
    const dispatch = useDispatch<AppDispatch>();
    const { items: products, loading } = useSelector((state: RootState) => state.product);

    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch latest products when the component mounts
    useEffect(() => {
        // Dispatch the fetchProducts action with a limit of 8
        // Assuming your backend returns the latest products by default when sorted
        dispatch(fetchProducts({ limit: 8, sortBy: 'createdAt', order: 'desc' }));
    }, [dispatch]); // Dependency array ensures this runs only once
    
    // Scroll functions for navigation arrows
    const scrollLeft = () => {
        if (scrollRef.current) {
            // Scroll by the width of one card + gap
            scrollRef.current.scrollBy({ left: -264, behavior: 'smooth' }); // 240px width + 24px gap
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 264, behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Left Side: Title */}
                    <MotionDiv 
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="flex flex-col justify-center lg:pr-8"
                    >
                        <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
                            POPULAR PRODUCTS OF THE WEEK
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-dark)] mt-2 leading-tight">
                            Latest Collections
                        </h2>
                    </MotionDiv>

                    {/* Right Side: Carousel */}
                    <div className="lg:col-span-3 relative">
                        <MotionDiv
                            ref={scrollRef}
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            // Added `scroll-smooth` for better scrolling behavior on touch devices
                            className="flex gap-6 overflow-x-auto scroll-smooth pb-4" 
                            style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }} // Hide scrollbar
                        >
                            {/* Render products or skeletons based on Redux state */}
                            {loading 
                                ? Array.from({length: 4}).map((_, i) => (
                                    <div key={i} className="w-60 h-80 bg-gray-200 rounded-2xl flex-shrink-0 animate-pulse" />
                                  ))
                                : products.map((product) => (
                                    <div key={product._id} className="w-60 flex-shrink-0">
                                        <MiniProductCard product={product} />
                                    </div>
                                ))
                            }
                        </MotionDiv>
                        
                        {/* Navigation Arrows */}
                        {!loading && products.length > 4 && ( // Hide arrows if not needed
                            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:flex gap-2">
                                <motion.button
                                    onClick={scrollLeft}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors group"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-[var(--brand-dark)] transition-colors" />
                                </motion.button>
                                <motion.button
                                    onClick={scrollRight}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-[var(--brand-dark)] rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-colors group"
                                >
                                    <ChevronRight className="w-5 h-5 text-white" />
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
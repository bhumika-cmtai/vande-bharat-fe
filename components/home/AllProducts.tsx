"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store'; // Make sure to import your store types
import { fetchProducts } from '@/lib/redux/slices/productSlice'; // Import the thunk
import { ProductCard } from '../ProductCard';
import { ProductCardSkeleton } from '../skeleton/ProductCardSkeleton';
import { MotionDiv } from '../motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import { Button } from '../ui/button';
import { AnimatePresence } from 'framer-motion';

// The categories remain the same, mapping button text to backend category values
const filterCategories = [
    { name: 'All Products', value: 'all' },
    { name: 'Food Product', value: 'Grains' },
    { name: 'Personal Care', value: 'Personal Care' },
    { name: 'Skin Care', value: 'Skin Care' },
    { name: 'Wellness', value: 'Wellness' },
];

export const AllProducts = () => {
    // We still need local state to manage which button is currently active
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Connect to the Redux store
    const dispatch = useDispatch<AppDispatch>();
    const { items: products, loading } = useSelector((state: RootState) => state.product);

    // This effect runs on component mount and whenever the selectedCategory changes
    useEffect(() => {
        // Prepare the query parameters for the API call
        const filterParams: { limit: number; category?: string } = {
            limit: 6,
        };
        
        // If the selected category is not 'all', add it to the params
        if (selectedCategory !== 'all') {
            filterParams.category = selectedCategory;
        }

        // Dispatch the action to fetch products from the backend
        dispatch(fetchProducts(filterParams));
    }, [dispatch, selectedCategory]); // Dependencies: re-run when dispatch or category changes

    return (
        <section className="bg-gray-50/70 py-20">
            <div className="container mx-auto px-6">
                <MotionDiv
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-dark)]">
                        Our All Products
                    </h2>
                    <p className="text-md text-gray-600 mt-2">
                        Explore our curated selection of natural and authentic products.
                    </p>
                </MotionDiv>

                {/* Filter buttons remain the same, they just update the local state */}
                <MotionDiv 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3 my-8"
                >
                    {filterCategories.map((cat) => (
                        <MotionDiv variants={fadeInUp} key={cat.value}>
                            <Button
                                onClick={() => setSelectedCategory(cat.value)}
                                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                                className={`rounded-full transition-colors duration-300 border-[1px] border-gray-400 ${
                                    selectedCategory === cat.value
                                    ? 'bg-[var(--brand-dark)] text-white'
                                    : 'bg-white hover:bg-gray-200'
                                }`}
                            >
                                {cat.name}
                            </Button>
                        </MotionDiv>
                    ))}
                </MotionDiv>
                
                {/* The AnimatePresence wrapper provides smooth transitions between categories */}
                <AnimatePresence mode="wait">
                    <MotionDiv
                        key={selectedCategory} // The key is crucial for AnimatePresence to detect changes
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {/* The rendering logic now uses the `loading` and `products` state from Redux */}
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))
                        ) : (
                            products.map((product) => (
                                <ProductCard product={product} key={product._id} />
                            ))
                        )}
                    </MotionDiv>
                </AnimatePresence>
            </div>
        </section>
    );
};
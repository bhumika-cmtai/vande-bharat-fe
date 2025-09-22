"use client";

import { useState, useEffect } from 'react';
import { Product } from '@/lib/types/product';
import { getProducts } from '@/lib/data';
import { ProductCard } from '../ProductCard';
import { ProductCardSkeleton } from '../skeleton/ProductCardSkeleton';
import { MotionDiv } from '../motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import { Button } from '../ui/button';
import { AnimatePresence } from 'framer-motion';

const filterCategories = [
    { name: 'All Products', value: 'all' },
    { name: 'Food Product', value: 'Grains' }, // "Food Product" button ab "Grains" category ke products dikhayega
    { name: 'Personal Care', value: 'Personal Care' },
    { name: 'Skin Care', value: 'Skin Care' }, // "Skin Care" abhi "Personal Care" ke products dikhayega
    { name: 'Wellness', value: 'Wellness' },
];

export const AllProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const filterParams = {
                limit: 6,
                category: selectedCategory === 'all' ? undefined : selectedCategory,
            };
            const fetchedProducts = await getProducts(filterParams);
            setProducts(fetchedProducts);
            setLoading(false);
        };

        loadProducts();
    }, [selectedCategory]);

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
                        These products can rotate weekly or based on seasonality and demand.
                    </p>
                </MotionDiv>

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
                
                <AnimatePresence mode="wait">
                    <MotionDiv
                        key={selectedCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
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
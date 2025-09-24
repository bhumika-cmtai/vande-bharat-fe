"use client";

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store'; // Assuming you have these types in your store file
import { fetchProducts } from '@/lib/redux/slices/productSlice'; // Import the async thunk
import { Product } from '@/lib/types/product';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/skeleton/ProductCardSkeleton';
import { MotionDiv } from '../motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
  filterParams: {
    limit?: number;
    category?: string;
    tags?: string;
  };
}

export function ProductSection({ title, subtitle, filterParams, className }: ProductSectionProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  const { items: products, loading, error } = useSelector((state: RootState) => state.product);

  const stableFilterParams = useMemo(() => JSON.stringify(filterParams), [filterParams]);

  useEffect(() => {
    dispatch(fetchProducts(JSON.parse(stableFilterParams)));
  }, [dispatch, stableFilterParams]); // Re-run the effect when the filters change

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {Array.from({ length: filterParams.limit || 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-500 p-10">{error}</div>;
    }

    if (products.length === 0) {
      return <div className="text-center text-gray-500 p-10">No products found.</div>;
    }

    return (
      <MotionDiv
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
      >
        {products.map((product) => (
          <MotionDiv variants={fadeInUp} key={product._id}>
            <ProductCard product={product} />
          </MotionDiv>
        ))}
      </MotionDiv>
    );
  };

  return (
    <section className={`container mx-auto px-6 ${className}`}>
      <MotionDiv 
        variants={fadeInUp} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
          {title}
        </h2>
        {subtitle && <p className="text-lg text-gray-600 mt-2">{subtitle}</p>}
      </MotionDiv>
      
      {renderContent()}
    </section>
  );
}
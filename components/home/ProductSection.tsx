"use client";

import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchSectionProducts } from '@/lib/redux/slices/productSlice';
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

  // Create a unique section key based on the filter params (No changes here)
  const sectionKey = useMemo(() => {
    const key = Object.entries(filterParams)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('_');
    return `section_${key}`;
  }, [filterParams]);

  // --- REVISED LOGIC ---
  // 1. Select the section state directly. It will be `undefined` if it doesn't exist yet.
  const sectionState = useSelector((state: RootState) => state.product.sections[sectionKey]);

  // 2. Derive state for rendering. If sectionState is undefined, it means we are loading for the first time.
  const products = sectionState?.products || [];
  const loading = !sectionState || sectionState.loading;
  const error = sectionState?.error || null;

  // 3. This effect handles the initial data fetch logic correctly.
  useEffect(() => {
    // We only dispatch the fetch action if the data for this section doesn't exist in the store.
    // This prevents re-fetching on every component re-render.
    if (!sectionState) {
      dispatch(fetchSectionProducts({
        sectionKey,
        queryParams: {
          ...filterParams,
          limit: filterParams.limit || 4
        }
      }));
    }
  }, [sectionState, sectionKey, dispatch, filterParams]);

  // 4. Create a dedicated handler for the "Try Again" button.
  const handleRetry = useCallback(() => {
    dispatch(fetchSectionProducts({
      sectionKey,
      queryParams: {
        ...filterParams,
        limit: filterParams.limit || 4
      }
    }));
  }, [dispatch, sectionKey, filterParams]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {Array.from({ length: filterParams.limit || 4 }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${sectionKey}-${index}`} />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
            <p className="text-red-600 font-medium">Unable to load products</p>
            <p className="text-red-500 text-sm mt-2">{error}</p>
            <button
              onClick={handleRetry} // Use the new, reliable retry handler
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
            <p className="text-gray-500 text-lg font-medium">No products found</p>
            <p className="text-gray-400 text-sm mt-2">
              We couldn't find any products matching your criteria.
            </p>
          </div>
        </div>
      );
    }

    return (
      <MotionDiv
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
      >
        {products.slice(0, filterParams.limit || 4).map((product) => (
          <MotionDiv variants={fadeInUp} key={`product-${sectionKey}-${product._id}`}>
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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </MotionDiv>

      {renderContent()}
    </section>
  );
}
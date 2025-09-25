"use client";

import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchSectionProducts } from '@/lib/redux/slices/productSlice';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/skeleton/ProductCardSkeleton';
import { MotionDiv } from '../motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
  filterParams: {
    limit?: number;
    category?: string;
    tags?: string;
  };
  // --- NEW: Optional prop for a "View All" link ---
  viewAllLink?: string;
}

export function ProductSection({ title, subtitle, filterParams, className, viewAllLink }: ProductSectionProps) {
  const dispatch = useDispatch<AppDispatch>();

  const sectionKey = useMemo(() => {
    const key = Object.entries(filterParams)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('_');
    return `section_${key}`;
  }, [filterParams]);

  const sectionState = useSelector((state: RootState) => state.product.sections[sectionKey]);

  const products = sectionState?.products || [];
  const loading = !sectionState || sectionState.loading;
  const error = sectionState?.error || null;

  useEffect(() => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
              onClick={handleRetry}
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
    // --- THEME UPDATE: Added relative positioning, bg color, and overflow hidden ---
    <section className={`relative container mx-auto px-6 py-12 md:py-16 bg-[var(--brand-orange)]/10 rounded-3xl overflow-hidden ${className} `}>
      {/* --- THEME UPDATE: Subtle Ashoka Chakra background watermark --- */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
          <Image
            src="/6292.jpg" // Make sure this is in your /public folder
            alt="Vande Bharat Background"
            width={500}
            height={500}
            className="opacity-5"
          />
      </div>

      {/* --- THEME UPDATE: Added relative positioning to sit above the background --- */}
      <div className="relative z-10">
        <MotionDiv
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          {/* --- THEME UPDATE: Tricolor gradient text for the main title --- */}
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-blue-800 to-green-600">
            {title}
          </h2>
          {/* --- THEME UPDATE: Themed subtitle text color --- */}
          {subtitle && (
            <p className="text-lg md:text-xl text-blue-800 font-medium max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </MotionDiv>

        {renderContent()}

        {/* --- THEME UPDATE: Optional "View All" button for sections like New Arrivals --- */}
        {viewAllLink && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href={viewAllLink}>
              <button className="group inline-flex items-center gap-2 bg-blue-800 text-white px-8 py-3 rounded-full font-bold text-base hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
                View All {title}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
          </MotionDiv>
        )}
      </div>
    </section>
  );
}
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types/product';
import { formatPrice } from '@/lib/utils';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { fadeInUp } from '@/lib/motion/motionVariants';
import { RatingStars } from './RatingStars';

interface MiniProductCardProps {
  product: Product;
}

export const MiniProductCard = ({ product }: MiniProductCardProps) => {
  const { name, slug, price, sale_price, images, averageRating } = product;
  const displayPrice = sale_price || price;

  return (
    <MotionDiv variants={fadeInUp} className="group">
      <Link href={`/product/${slug}`}>
        <div className="bg-gray-100/20 rounded-2xl p-4 transition-all duration-300 group-hover:shadow-lg">
          <div className="relative w-full aspect-square overflow-hidden rounded-xl">
            <Image
              src={images[0] || '/placeholder.svg'}
              alt={name}
              fill
              sizes="(max-width: 768px) 40vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="mt-3 text-center">
          <h3 className="font-semibold text-brand-dark text-md h-12 line-clamp-2">{name}</h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <RatingStars rating={averageRating || 0} />
          </div>
          <p className="font-bold text-lg text-brand-green mt-2">{formatPrice(displayPrice)}</p>
        </div>
      </Link>
    </MotionDiv>
  );
};
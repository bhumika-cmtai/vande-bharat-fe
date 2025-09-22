"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { formatPrice } from '@/lib/utils';
import { MotionDiv } from './motion/MotionDiv'; // Corrected import path
import { hoverLift } from '@/lib/motion/motionVariants'; // Corrected import path
import { Button } from './ui/button'; // Corrected import path
import { useToast } from '@/hooks/use-toast';
import { RatingStars } from './RatingStars'; // Corrected import path

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, slug, price, sale_price, images, category, averageRating, numReviews, tags } = product;
  const { toast } = useToast();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const displayPrice = sale_price || price;
  const discount = sale_price ? Math.round(((price - sale_price) / price) * 100) : 0;
  
  const hasHoverImage = images && images.length > 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddedToCart(true);
    toast({
      title: "✅ Added to Cart!",
      description: `${name} has been added to your cart.`,
    });
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsWishlisted(!isWishlisted);
    toast({
      title: !isWishlisted ? "❤️ Added to Wishlist" : "💔 Removed from Wishlist",
      description: `${name} is now in your wishlist.`,
    });
  };

  return (
    <MotionDiv
      className="group relative bg-white rounded-2xl overflow-hidden shadow-subtle flex flex-col"
      variants={hoverLift}
      whileHover="whileHover"
    >
      <Link href={`/product/${slug}`} className="flex flex-col flex-grow">
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${!hasHoverImage ? 'group-hover:scale-105' : ''}`}>
            <Image
              src={images[0] || '/placeholder.svg'} 
              alt={name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={`object-cover w-full h-full transition-opacity duration-500 ${hasHoverImage ? 'group-hover:opacity-0' : ''}`}
            />
            
            {hasHoverImage && (
              <Image
                src={images[1]}
                alt={`${name} hover view`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={handleToggleWishlist}
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 z-10 bg-white/70 hover:bg-white rounded-full backdrop-blur-sm"
          >
            <Heart className={`h-5 w-5 transition-all ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-brand-dark'}`} />
          </Button>

          {/* --- Tags --- */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {tags?.includes('Sale') && discount > 0 && (
              <span className="bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-full">{discount}% OFF</span>
            )}
            {tags?.includes('New') && (
              <span className="bg-brand-blue text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
            )}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{category}</span>
            <RatingStars rating={averageRating || 0} />
          </div>
          <h3 className="font-bold text-lg text-brand-dark mt-1 mb-2 h-14 line-clamp-2">{name}</h3>

          <div className="mt-auto flex justify-between items-center pt-2">
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-brand-green">{formatPrice(displayPrice)}</p>
              {sale_price && <p className="text-sm text-gray-400 line-through">{formatPrice(price)}</p>}
            </div>

            <Button
              size="sm"
              onClick={handleAddToCart}
              aria-label={`Add ${name} to cart`}
              className={`transition-all duration-300 w-28 ${
                isAddedToCart ? 'bg-brand-green' : 'bg-brand-orange'
              }`}
            >
              {isAddedToCart ? (
                <MotionDiv initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <Check className="h-4 w-4 mr-2" />
                </MotionDiv>
              ) : (
                <ShoppingBag className="h-4 w-4 mr-2" />
              )}
              {isAddedToCart ? 'Added' : 'Add'}
            </Button>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
};
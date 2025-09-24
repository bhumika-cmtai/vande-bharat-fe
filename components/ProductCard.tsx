"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, Check, Star, Minus, Plus } from 'lucide-react';

// --- UI Components & Hooks ---
import { Product, Variant } from '@/lib/types/product';
import { formatPrice } from '@/lib/utils';
import { MotionDiv } from './motion/MotionDiv';
import { hoverLift } from '@/lib/motion/motionVariants';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

// --- REDUX & CONTEXT IMPORTS ---
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { selectIsAuthenticated } from '@/lib/redux/slices/authSlice';
import { addToCart as addCartToDb } from '@/lib/redux/slices/cartSlice';
import { useCart as useLocalCart } from '@/context/CartContext';
import { 
  addToWishlist as addWishlistToDb, 
  removeFromWishlist as removeWishlistFromDb 
} from '@/lib/redux/slices/wishlistSlice';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { _id, name, slug, price, sale_price, images, category, averageRating, numReviews, tags, variants = [], minQuantity: minQtyProp } = product;

  // --- HOOKS & SELECTORS ---
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [imageLoaded, setImageLoaded] = useState(false);

  // --- CONTEXTS ---
  const { addToCart: addCartToLocal } = useLocalCart();
  const { 
    addToWishlist: addWishlistToLocal, 
    removeFromWishlist: removeWishlistFromLocal, 
    isAddedToWishlist 
  } = useWishlist();

  // --- LOCAL STATE FOR UI & DIALOG ---
  const [isVariantSelectorOpen, setIsVariantSelectorOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // --- MEMOIZED VALUES ---
  const isWishlisted = useMemo(() => isAddedToWishlist(product._id), [isAddedToWishlist, product._id]);
  const displayPrice = sale_price || price;
  const discount = sale_price ? Math.round(((price - sale_price) / price) * 100) : 0;
  const hasHoverImage = images && images.length > 1;
  const minQuantity = useMemo(() => minQtyProp || 1, [minQtyProp]);
  const isBulkOrder = minQuantity > 5;

  // --- EVENT HANDLERS (No changes needed in logic) ---

  const handlePrimaryAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBulkOrder) {
      router.push(`/bulk-order/${slug}`);
      return;
    }

    if (variants.length > 0) {
      setSelectedVariant(variants[0]);
      setQuantity(minQuantity);
      setIsVariantSelectorOpen(true);
    } else {
      if ((product.stock_quantity || 0) < minQuantity) {
        toast({ title: "Out of Stock", description: "Not enough items to meet minimum quantity.", variant: "destructive" });
        return;
      }
      if (isAuthenticated) {
        dispatch(addCartToDb({ productId: _id, quantity: minQuantity }));
      } else {
        addCartToLocal(product, null, minQuantity);
      }
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2500);
      toast({ title: "✅ Added to Cart!", description: `${minQuantity} x ${name} has been added.` });
    }
  };

  const handleConfirmAddToCart = () => {
    if (!selectedVariant) {
      toast({ title: "Please select an option", variant: "destructive" });
      return;
    }
    if (isAuthenticated) {
      dispatch(addCartToDb({ 
        productId: _id, 
        quantity, 
        sku_variant: selectedVariant.sku_variant
      }));
    } else {
      addCartToLocal(product, selectedVariant, quantity);
    }
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2500);
    toast({ title: "✅ Added to Cart!", description: `${quantity} x ${name} has been added.` });
    setIsVariantSelectorOpen(false);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAuthenticated) {
      isWishlisted ? dispatch(removeWishlistFromDb(_id)) : dispatch(addWishlistToDb(_id));
    } else {
      isWishlisted 
        ? removeWishlistFromLocal(_id) 
        : addWishlistToLocal(product, null);
    }
    toast({
      title: !isWishlisted ? "❤️ Added to Wishlist" : "❤️ Removed from Wishlist",
      description: `${name} has been ${!isWishlisted ? 'added to' : 'removed from'} your wishlist.`
    });
  };

  return (
    <>
      <MotionDiv
        className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 flex flex-col h-full"
        variants={hoverLift}
        whileHover="whileHover"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link href={`/product/${slug}`} className="flex flex-col flex-grow">
          {/* --- Image Container (No changes, aspect ratio is inherently responsive) --- */}
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
            {!imageLoaded && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <Image src={images[0] || '/placeholder.svg'} alt={name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className={`object-cover w-full h-full transition-all duration-700 ${hasHoverImage ? 'group-hover:opacity-0' : ''} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setImageLoaded(true)} priority={false} />
              {hasHoverImage && <Image src={images[1]} alt={`${name} alternate view`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover w-full h-full opacity-0 transition-opacity duration-700 group-hover:opacity-100" />}
            </div>
            <MotionDiv className="absolute top-3 right-3 z-10" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button size="icon" variant="ghost" onClick={handleToggleWishlist} aria-label="Add to wishlist" className="w-9 h-9 sm:w-10 sm:h-10 bg-white/80 hover:bg-white border-0 rounded-full backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300" style={isWishlisted ? { color: '#ef4444', fill: '#ef4444' } : {}}/>
              </Button>
            </MotionDiv>
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
              {tags?.includes('Sale') && discount > 0 && <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">-{discount}%</MotionDiv>}
              {tags?.includes('New') && <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">NEW</MotionDiv>}
            </div>
          </div>
          
          {/* --- RESPONSIVE: Content Padding Adjusted --- */}
          <div className="p-4 sm:p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">{category}</span>
              {averageRating && averageRating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-gray-600">{averageRating.toFixed(1)}</span>
                  {numReviews && numReviews > 0 && <span className="text-xs text-gray-400 hidden sm:inline">({numReviews})</span>}
                </div>
              )}
            </div>

            {/* --- RESPONSIVE: Product Name Font Size Adjusted --- */}
            <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4 line-clamp-2 leading-tight h-12 sm:h-14">{name}</h3>
            
            <div className="mt-auto flex justify-between items-end">
              <div className="flex flex-col">
                <div className="flex items-center sm:items-baseline gap-2 flex-wrap">
                  {/* --- RESPONSIVE: Price Font Size Adjusted --- */}
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">{formatPrice(displayPrice)}</span>
                  {sale_price && <span className="text-xs sm:text-sm text-gray-400 line-through">{formatPrice(price)}</span>}
                </div>
                {sale_price && <span className="text-xs sm:text-sm text-green-600 font-medium">Save {formatPrice(price - sale_price)}</span>}
              </div>
              <MotionDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {/* --- RESPONSIVE: Button Size and Padding Adjusted --- */}
                <Button size="sm" onClick={handlePrimaryAddToCartClick} disabled={isAddedToCart} aria-label={`Add ${name} to cart`} className={`transition-all duration-300 h-9 sm:h-10 rounded-lg sm:rounded-xl font-semibold px-3 sm:px-4 ${isAddedToCart ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}>
                  {isBulkOrder ? 'Inquire' : isAddedToCart ? (
                    <MotionDiv initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1.5"><Check className="h-4 w-4" /> <span className="hidden sm:inline">Added</span></MotionDiv>
                  ) : (
                    <div className="flex items-center gap-1.5"><ShoppingBag className="h-4 w-4" /> <span className="hidden sm:inline">Add</span></div>
                  )}
                </Button>
              </MotionDiv>
            </div>
          </div>
        </Link>
      </MotionDiv>

      {/* --- Variant Selection Dialog (Inherently Responsive from shadcn/ui) --- */}
      <Dialog open={isVariantSelectorOpen} onOpenChange={setIsVariantSelectorOpen}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-gray-800">Select Options</DialogTitle>
            <DialogDescription>{name}</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div>
              <label className="text-sm font-semibold text-gray-700">Size:</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {variants.map((variant) => (
                  <Button key={variant.sku_variant} variant={selectedVariant?.sku_variant === variant.sku_variant ? "default" : "outline"} onClick={() => setSelectedVariant(variant)} disabled={variant.stock_quantity === 0}>
                    {variant.size}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Quantity (Min: {minQuantity}):</label>
              <div className="flex items-center border rounded-lg w-fit mt-2">
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(q => Math.max(minQuantity, q - 1))}><Minus className="h-4 w-4" /></Button>
                <span className="px-4 font-bold text-lg w-16 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(q => Math.min(selectedVariant?.stock_quantity || q + 1, q + 1))} disabled={!selectedVariant || quantity >= selectedVariant.stock_quantity}><Plus className="h-4 w-4" /></Button>
              </div>
              {selectedVariant && <p className="text-xs text-gray-500 mt-1">{selectedVariant.stock_quantity} available</p>}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" className="w-full bg-black text-white hover:bg-gray-800 h-12 text-base font-bold" onClick={handleConfirmAddToCart} disabled={!selectedVariant}>
              Add to Cart - {formatPrice((selectedVariant ? (selectedVariant.sale_price || selectedVariant.price) * quantity : price * quantity))}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
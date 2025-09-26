"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, Check } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

// --- UI Components ---
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ProductDetailsSkeleton from "@/components/skeleton/productSkeleton";
import { useToast } from "@/hooks/use-toast";

// --- Redux & Context Integration ---
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchProductBySlug, clearSelectedProduct } from "@/lib/redux/slices/productSlice";
import { selectIsAuthenticated } from "@/lib/redux/slices/authSlice";
import { addToCart as addCartToDb } from "@/lib/redux/slices/cartSlice";
import { useCart as useLocalCart } from "@/context/CartContext";
import { Product, Variant } from "@/lib/types/product";

// Wishlist imports
import { useWishlist } from "@/context/WishlistContext";
import { 
  addToWishlist as addWishlistToDb, 
  removeFromWishlist as removeWishlistFromDb 
} from "@/lib/redux/slices/wishlistSlice";

// Dynamic imports
const ProductReviews = dynamic(() => 
  import('@/components/ProductReviews').then(mod => mod.ProductReviews),
  { 
    loading: () => <div className="h-96 w-full rounded-lg bg-gray-100 animate-pulse mt-8 sm:mt-12"></div> 
  }
);

const RecommendedProducts = dynamic(() => 
  import('@/components/RecommendProducts').then(mod => mod.RecommendedProducts),
  { 
    loading: () => <div className="h-96 w-full rounded-lg bg-gray-100 animate-pulse mt-8 sm:mt-12"></div> 
  }
);

// Enhanced Mobile-Friendly Image Zoom Component
const ImageZoom = ({ src, alt }: { src: string; alt: string }) => {
  const [isZooming, setIsZooming] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    setMousePosition({ x: e.clientX, y: e.clientY });
    setImagePosition({ x: xPercent, y: yPercent });
  };

  return (
    <>
      <div 
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 ${!isMobile ? 'cursor-crosshair' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
          className="object-cover transition-transform duration-200"
        />
      </div>
      
      {/* Desktop Zoom Window - Hidden on mobile */}
      {isZooming && !isMobile && (
        <div 
          className="fixed pointer-events-none z-50 w-48 h-48 border-2 border-gray-300 rounded-lg overflow-hidden shadow-2xl bg-white hidden md:block"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 96,
          }}
        >
          <div
            className="w-[400%] h-[400%] relative"
            style={{
              transform: `translate(-${imagePosition.x}%, -${imagePosition.y}%)`,
            }}
          >
            <Image
              src={src}
              alt={`${alt} - Zoomed`}
              fill
              quality={100}
              className="object-cover"
              sizes="200px"
            />
          </div>
        </div>
      )}
    </>
  );
};

const ProductDetailsPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Redux State
  const { 
    selectedProduct: product, 
    productDetailsLoading: loading, 
    productDetailsError: error 
  } = useSelector((state: RootState) => state.product);
  
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Context Hooks
  const { addToCart: addCartToLocal } = useLocalCart(); 
  const { 
    addToWishlist: addWishlistToLocal, 
    removeFromWishlist: removeWishlistFromLocal, 
    isAddedToWishlist 
  } = useWishlist();

  // Component State
  const minQuantity = useMemo(() => product?.minQuantity || 1, [product]);
  const isBulkOrder = minQuantity > 5;

  const [quantity, setQuantity] = useState(minQuantity);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlistSuccess, setIsWishlistSuccess] = useState(false);

  // Fetch product data on slug change
  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [slug, dispatch]);

  useEffect(() => {
    if (product) {
        const initialQty = product.minQuantity || 1;
        setQuantity(initialQty);

        const variants = product.variants ?? [];
        if (variants.length > 0) {
            const firstVariant = variants[0];
            setSelectedColor(firstVariant.color);
            setSelectedSize(firstVariant.size);
        } else {
            setSelectedColor(null);
            setSelectedSize(null);
        }
        setSelectedImage(0);
    }
  }, [product]);

  // Set default variant selections when product data loads
  useEffect(() => {
    const variants = product?.variants ?? [];
    if (variants.length > 0) {
      const firstVariant = variants[0];
      setSelectedColor(firstVariant.color);
      const firstSizeForColor = variants.find((v: Variant) => v.color === firstVariant.color);
      if (firstSizeForColor) {
        setSelectedSize(firstSizeForColor.size);
      }
    } else {
      setSelectedColor(null);
      setSelectedSize(null);
    }
    setSelectedImage(0);
    setQuantity(1);
  }, [product]);

  // Memoized calculation for available variants
  const { availableColors, availableSizes, selectedVariant } = useMemo<{
    availableColors: string[];
    availableSizes: { size: string; stock: number }[];
    selectedVariant: Variant | null;
  }>(() => {
    if (!product || !product.variants || product.variants.length === 0) {
      return { availableColors: [], availableSizes: [], selectedVariant: null };
    }
    const colors: string[] = [...new Set<string>(product.variants.map((v: Variant) => v.color))];

    const sizesForSelectedColor = product.variants
      .filter((v: Variant) => v.color === selectedColor)
      .map((v: Variant) => ({ size: v.size, stock: v.stock_quantity }));
    const variant = product.variants.find((v: Variant) => v.color === selectedColor && v.size === selectedSize) || null;
    return { availableColors: colors, availableSizes: sizesForSelectedColor, selectedVariant: variant };
  }, [product, selectedColor, selectedSize]);

  const isWishlisted = useMemo(() => product ? isAddedToWishlist(product._id) : false, [isAddedToWishlist, product]);
  
  const handleAddToCart = () => {
    if (!product) return;

    if (isBulkOrder) {
      router.push(`/bulk-order/${product.slug}`);
      return;
    }

    if (quantity < minQuantity) {
      toast({ title: "Minimum Quantity", description: `You must add at least ${minQuantity} items to the cart.`, variant: "destructive" });
      return;
    }
    
    if (product.variants && product.variants.length > 0) {
      if (!selectedVariant) {
        toast({ title: "Selection needed", description: "Please select an available color and size.", variant: "destructive" });
        return;
      }
      if (selectedVariant.stock_quantity < quantity) {
        toast({ title: "Out of Stock", description: `Only ${selectedVariant.stock_quantity} available for this variant.`, variant: "destructive" });
        return;
      }
    } else {
        if (!product.stock_quantity || product.stock_quantity < quantity) {
             toast({ title: "Out of Stock", description: `Only ${product.stock_quantity} available.`, variant: "destructive" });
             return;
        }
    }

    if (isAuthenticated) {
      dispatch(addCartToDb({ 
        productId: product._id, 
        sku_variant: selectedVariant?.sku_variant, 
        quantity 
      }));
    } else {
      addCartToLocal(product, selectedVariant, quantity);
    }

    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
    
    toast({ title: "✅ Added to Cart!", description: `${quantity} x ${product.name} has been added.` });
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    const productId = product._id;
    
    if (product.variants && product.variants.length > 0) {
      const variantToUse = selectedVariant || product.variants[0];
      const skuVariant = variantToUse.sku_variant;
      const isCurrentlyWishlisted = isAddedToWishlist(productId, skuVariant);

      if (isAuthenticated) {
        if (isCurrentlyWishlisted) {
          dispatch(removeWishlistFromDb(productId));
        } else {
          dispatch(addWishlistToDb(productId));
        }
      } else {
        if (isCurrentlyWishlisted) {
          removeWishlistFromLocal(productId, skuVariant);
        } else {
          addWishlistToLocal(product, variantToUse);
        }
      }
    } else {
      const isCurrentlyWishlisted = isAddedToWishlist(productId);

      if (isAuthenticated) {
        if (isCurrentlyWishlisted) {
          dispatch(removeWishlistFromDb(productId));
        } else {
          dispatch(addWishlistToDb(productId));
        }
      } else {
        if (isCurrentlyWishlisted) {
          removeWishlistFromLocal(productId);
        } else {
          addWishlistToLocal(product);
        }
      }
    }
    
    setIsWishlistSuccess(true);
    setTimeout(() => setIsWishlistSuccess(false), 2000);
    
    const isCurrentlyWishlisted = product.variants && product.variants.length > 0 
      ? isAddedToWishlist(productId, selectedVariant?.sku_variant || product.variants[0]?.sku_variant)
      : isAddedToWishlist(productId);
    
    toast({
        title: isCurrentlyWishlisted ? "❤️ Removed from Wishlist" : "❤️ Added to Wishlist",
        description: `${product.name} has been ${isCurrentlyWishlisted ? 'removed from' : 'added to'} your wishlist.`,
        duration: 3000,
        className: isCurrentlyWishlisted ? "bg-red-50 border-red-200 text-red-800" : "bg-pink-50 border-pink-200 text-pink-800"
    });
  };
  
  const incrementQuantity = () => {
    const maxStock = selectedVariant?.stock_quantity ?? product?.stock_quantity ?? 1;
    setQuantity(q => Math.min(q + 1, maxStock));
  };

  const decrementQuantity = () => {
    setQuantity(q => Math.max(minQuantity, q - 1));
  };

  if (loading) {
    return (
      <div className="bg-gray-50">
        <Navbar />
        <ProductDetailsSkeleton />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
        <div className="bg-gray-50">
            <Navbar/>
            <div className="container mx-auto text-center py-12 px-4">
                <h2 className="text-xl sm:text-2xl font-bold text-red-600">Failed to load product</h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{error}</p>
                <Button onClick={() => router.push('/shop')} className="mt-4">Go to Shop</Button>
            </div>
            <Footer/>
        </div>
    );
  }

  if (!product) {
    return (
        <div className="bg-gray-50">
            <Navbar/>
            <div className="container mx-auto text-center py-12 px-4">
                <h2 className="text-xl sm:text-2xl font-bold">Product Not Found</h2>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">The product you are looking for does not exist.</p>
                <Button onClick={() => router.push('/shop')} className="mt-4">Go to Shop</Button>
            </div>
            <Footer/>
        </div>
    );
  }

  const displayPrice = product.sale_price ?? product.price;
  const originalPrice = product.price;
  const hasSale = !!product.sale_price && product.sale_price < originalPrice;
  const discount = hasSale ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100) : 0;
  
  return (
    <div className="bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* LEFT: MEDIA GALLERY */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="flex flex-col-reverse sm:flex-col-reverse md:flex-row gap-3 sm:gap-4"
          >
            {/* Thumbnail Gallery - Responsive layout */}
            <div className="flex flex-row md:flex-col gap-2 sm:gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 md:pr-2 scrollbar-hide">
              {product.images.map((img: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(idx)} 
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`${product.name} thumbnail ${idx + 1}`} 
                    fill 
                    sizes="(max-width: 640px) 15vw, 10vw" 
                    quality={75} 
                    className="object-cover" 
                  />
                </button>
              ))}
            </div>
            
            {/* Main Image with Enhanced Mobile Support */}
            <div className="flex-1">
              <ImageZoom 
                src={product.images[selectedImage]} 
                alt={product.name}
              />
            </div>
          </motion.div>

          {/* RIGHT: PRODUCT DETAILS & ACTIONS */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Brand and Title */}
            <div>
              <p className="font-semibold text-primary text-sm sm:text-base">{product.brand}</p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-800 my-1 sm:my-2 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                ₹{displayPrice.toLocaleString()}
              </span>
              {hasSale && (
                <>
                  <span className="text-lg sm:text-xl text-gray-400 line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-red-100 text-red-600 text-xs sm:text-sm font-semibold px-2 sm:px-2.5 py-1 rounded-full">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Color Selection */}
            {product.variants && product.variants.length > 0 && (
              <>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Color: <span className="font-bold">{selectedColor}</span>
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {availableColors.map(color => (
                      <button 
                        key={color} 
                        onClick={() => setSelectedColor(color)} 
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all ${
                          selectedColor === color ? 'border-black scale-110' : 'border-gray-200'
                        }`} 
                        style={{ backgroundColor: color.toLowerCase() }} 
                        title={color}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Size</h3>
                  <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2">
                    {availableSizes.map(({ size, stock }) => (
                      <button 
                        key={size} 
                        onClick={() => setSelectedSize(size)} 
                        disabled={stock < 1} 
                        className={`px-3 py-2 sm:px-4 border rounded-lg text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                          selectedSize === size ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-3 sm:gap-4">
              {!isBulkOrder && (
                <div className="flex items-center border rounded-full font-semibold">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={decrementQuantity} 
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full"
                  >
                    <Minus size={14} className="sm:w-4 sm:h-4" />
                  </Button>
                  <span className="w-8 sm:w-10 text-center text-sm sm:text-base">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={incrementQuantity} 
                    className="h-10 w-10 sm:h-11 sm:w-11 rounded-full"
                  >
                    <Plus size={14} className="sm:w-4 sm:h-4" />
                  </Button>
                </div>
              )}
              
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 h-10 sm:h-12 rounded-full text-sm sm:text-base font-bold"
              >
                {isBulkOrder ? 'Submit Bulk Inquiry' : (isAddedToCart ? (
                  <>
                    <Check size={16} className="mr-1 sm:mr-2" />
                    Added!
                  </>
                ) : 'Add to Bag')}
              </Button>

              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleToggleWishlist} 
                className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full flex-shrink-0 transition-all duration-300 ${
                  isWishlistSuccess 
                    ? 'bg-pink-500 border-pink-500 hover:bg-pink-600' 
                    : 'hover:bg-gray-100'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    isWishlistSuccess 
                      ? 'fill-white text-white' 
                      : isWishlisted 
                        ? 'fill-red-500 text-red-500' 
                        : ''
                  }`} 
                />
              </Button>
            </div>
            
            {/* Stock and Minimum Quantity Info */}
            <div className="min-h-[1.5rem]">
              {minQuantity > 1 && !isBulkOrder && (
                <p className="text-xs sm:text-sm text-center text-gray-600">
                  Minimum order quantity: <strong>{minQuantity}</strong>
                </p>
              )}
              {isBulkOrder && (
                <p className="text-xs sm:text-sm text-center text-gray-600">
                  This item is available for bulk orders only.
                </p>
              )}

              {product.variants && product.variants.length > 0 && selectedVariant && (
                selectedVariant.stock_quantity > 0 && selectedVariant.stock_quantity <= 5 
                  ? <p className="text-xs sm:text-sm text-center text-red-600">
                      Hurry! Only {selectedVariant.stock_quantity} left in stock.
                    </p>
                  : selectedVariant.stock_quantity < 1 
                    ? <p className="text-xs sm:text-sm text-center text-gray-500">
                        This size is currently out of stock.
                      </p>
                    : null
              )}
              {!product.variants || product.variants.length === 0 && product.stock_quantity && product.stock_quantity > 0 && product.stock_quantity <= 5 && (
                <p className="text-xs sm:text-sm text-center text-red-600">
                  Hurry! Only {product.stock_quantity} left in stock.
                </p>
              )}
            </div>
            
            <Separator className="my-4 sm:my-6" />

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <div 
                  className="prose prose-sm sm:prose text-gray-600 max-w-none" 
                  dangerouslySetInnerHTML={{ __html: product.description }} 
                />
              </div>
              
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Product Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold">Category:</span> {product.category}</p>
                  {product.gender && <p><span className="font-semibold">For:</span> {product.gender}</p>}
                </div>
              </div>
            </div>

            <Separator className="my-4 sm:my-6" />

            {/* Shipping & Returns Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm sm:text-base">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-gray-600 prose-sm max-w-none text-sm">
                  <p>Free standard shipping on all orders over ₹1,999.</p>
                  <p>
                    We accept returns within 14 days of delivery. Please visit our{' '}
                    <Link href="/return-policy" className="text-primary underline">
                      Return Policy
                    </Link>{' '}
                    page for more details.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
        
        {/* Reviews and Recommendations */}
        <ProductReviews product={product} />
        <RecommendedProducts currentProduct={product} />
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetailsPage;
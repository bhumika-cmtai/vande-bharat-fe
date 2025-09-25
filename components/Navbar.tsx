"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { User, Heart, ShoppingCart, ChevronDown, Menu, Loader2, Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// --- UI IMPORTS ---
import { Sheet, SheetContent, SheetTrigger,SheetHeader, SheetTitle ,SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from './ui/dropdown-menu';
import { toast } from 'sonner';

// --- HOOKS ---
import { useDebounce } from '@/hooks/useDebounce';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

// --- CONTEXT & REDUX ---
import { useCart as useLocalCart } from '@/context/CartContext';
import { useWishlist as useLocalWishlist } from '@/context/WishlistContext';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/redux/store';
import { selectIsAuthenticated, selectCurrentUser, logout } from '@/lib/redux/slices/authSlice';
import { fetchSearchResults, clearSearchResults } from '@/lib/redux/slices/productSlice';
import { fetchCart } from '@/lib/redux/slices/cartSlice';
import { fetchWishlist, selectTotalWishlistItems } from '@/lib/redux/slices/wishlistSlice';
import { fetchCategories } from '@/lib/redux/slices/adminSlice';
import TopBanner from './TopBanner';

// --- FIX: Simplified data structure for main categories only ---
const mainCategories = [
    { name: "Skin Care", href: "/shop?category=SKIN_CARE" },
    { name: "Hair Care", href: "/shop?category=HAIR_CARE" },
    { name: "Wellness", href: "/shop?category=WELLNESS_PRODUCT" },
    { name: "Food & Beverages", href: "/shop?category=FOOD_PRODUCT" },
    { name: "Personal Care", href: "/shop?category=PERSONAL_CARE" },
];

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector(selectCurrentUser);
    const { searchResults, searchLoading } = useSelector((state: RootState) => state.product);
    const dbTotalCartItems = useSelector((state: RootState) => state.cart.totalItems);
    const dbTotalWishlistItems = useSelector(selectTotalWishlistItems);
    const { totalItems: localTotalCartItems } = useLocalCart();
    const { totalItems: localTotalWishlistItems } = useLocalWishlist();

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

    const totalCartItems = isAuthenticated ? dbTotalCartItems : localTotalCartItems;
    const totalWishlistItems = isAuthenticated ? dbTotalWishlistItems : localTotalWishlistItems;
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    
    useOnClickOutside(searchRef, () => setIsSearchOpen(false));

    useEffect(() => {
        dispatch(fetchCategories());
        if (isAuthenticated) {
            dispatch(fetchCart());
            dispatch(fetchWishlist());
        }
    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        // We use a small threshold (10px) to trigger the change
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (debouncedSearchQuery.length > 2) {
            dispatch(fetchSearchResults({ search: debouncedSearchQuery, limit: 5 }));
            setIsSearchOpen(true);
        } else {
            dispatch(clearSearchResults());
            setIsSearchOpen(false);
        }
    }, [debouncedSearchQuery, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        toast.success("You have been logged out.");
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setIsSearchOpen(false);
        router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    };

    const UserAccountNav = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary" aria-label="Account"><User size={22} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                {isAuthenticated && currentUser ? (
                    <>
                        <DropdownMenuLabel>Hi, {currentUser.fullName || currentUser.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/account/user">My Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/account/user/order-history">My Orders</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">Sign Out</DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuLabel>Welcome!</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/signup">Sign Up</Link></DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );

    // --- FIX: MainNavLinks updated to use the simple `mainCategories` array ---
    const MainNavLinks = () => (
         <div className="hidden lg:flex items-center gap-8 text-sm font-semibold">
            <DropdownMenu open={isCategoryDropdownOpen} onOpenChange={setIsCategoryDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 text-gray-800 hover:text-primary p-0 h-auto hover:bg-transparent">
                        Categories
                        <ChevronDown size={16} className={`transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                    {mainCategories.map(category => (
                        <DropdownMenuItem asChild key={category.name}>
                            <Link href={category.href}>{category.name}</Link>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/shop" className="font-semibold text-primary">View All Products</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">About</Link>
            <Link href="/shop" className="text-gray-600 hover:text-primary transition-colors">Shop</Link>
            <Link href="/shop/new-arrivals" className="text-gray-600 hover:text-primary transition-colors">New Arrivals</Link>
            <Link href="/shop/sale" className="text-gray-600 hover:text-primary transition-colors">Sale</Link>
            <Link href="/shop/best-sellers" className="text-gray-600 hover:text-primary transition-colors">Best Sellers</Link>
        </div>
    );

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-md' : ''}`}>
             <AnimatePresence>
                {!isScrolled && (
                    <motion.div
                        initial={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <TopBanner />
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className={`sticky top-0 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex-shrink-0">
                            <Image src="/logo1.png" width={80} height={45} alt='logo' />
                        </Link>
                        <MainNavLinks />
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <div ref={searchRef} className="hidden sm:block">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => { if (searchQuery.length > 2) setIsSearchOpen(true); }}
                                    placeholder="Search..." 
                                    className="w-full p-2 pl-10 border rounded-full h-10 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 sm:w-40 focus:w-64" 
                                />
                            </form>
                            <AnimatePresence>
                               {isSearchOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 overflow-hidden"
                                    >
                                      {searchLoading && <div className="p-4 text-center"><Loader2 className="h-5 w-5 animate-spin inline" /></div>}
                                      {!searchLoading && searchResults.length > 0 && (
                                         <ul>
                                           {searchResults.map((p: any) => (
                                              <li key={p._id}><Link href={`/product/${p.slug}`} onClick={() => setIsSearchOpen(false)} className="flex items-center gap-3 p-3 hover:bg-gray-50"><Image src={p.images[0]} alt={p.name} width={40} height={40} className="rounded" /><span className="text-sm font-medium">{p.name}</span></Link></li>
                                            ))}
                                            <li><Link href={`/shop?search=${encodeURIComponent(searchQuery.trim())}`} onClick={() => setIsSearchOpen(false)} className="block w-full text-center p-3 font-semibold text-sm text-primary hover:bg-gray-50">View all results</Link></li>
                                        </ul>
                                      )}
                                      {!searchLoading && searchResults.length === 0 && debouncedSearchQuery.length > 2 && <div className="p-4 text-center text-sm text-gray-500">No results found.</div>}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <UserAccountNav />
                        <Link href="/wishlist" className="relative text-gray-700 hover:text-primary" aria-label="Wishlist"><Heart size={22} /></Link>
                        <Link href="/cart" className="relative text-gray-700 hover:text-primary" aria-label="Cart"><ShoppingCart size={22} /></Link>

                        {/* --- MOBILE MENU --- */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild><Button variant="ghost" size="icon"><Menu size={24} /></Button></SheetTrigger>
                                <SheetContent side="left" className="w-full max-w-sm p-6 overflow-y-auto">
                                    {/* <SheetHeader>
                                        <div className="flex justify-between items-center mb-8">
                                            <SheetTitle className="text-xl font-semibold text-left">Menu</SheetTitle>
                                            <SheetClose><X size={20} /></SheetClose>
                                        </div>
                                    </SheetHeader> */}
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-xl font-semibold">Menu</h2>
                                        <SheetClose><X size={20} /></SheetClose>
                                    </div>

                                    {/* --- FIX: Simplified mobile category list --- */}
                                    <div className="flex flex-col gap-4">
                                        <h3 className="font-semibold text-lg text-gray-800">Shop by Category</h3>
                                        <div className="flex flex-col gap-3 pl-2 border-l-2 ml-2">
                                            {mainCategories.map(category => (
                                                <SheetClose asChild key={category.name}>
                                                    <Link href={category.href} className="text-gray-600 hover:text-primary">{category.name}</Link>
                                                </SheetClose>
                                            ))}
                                        </div>
                                    </div>
                                    
                                     <div className="border-t mt-6 pt-6 flex flex-col gap-4">
                                        <SheetClose asChild><Link href="/shop/new-arrivals" className="font-semibold">New Arrivals</Link></SheetClose>
                                        <SheetClose asChild><Link href="/shop/sale" className="font-semibold text-red-600">Special Offers</Link></SheetClose>
                                        <SheetClose asChild><Link href="/brands" className="font-semibold">All Brands</Link></SheetClose>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </header>
    );
};

export default Navbar;
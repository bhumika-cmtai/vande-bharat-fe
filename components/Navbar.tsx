"use client";
import React, { useState, useEffect, useRef } from 'react';
import { User, Heart, ShoppingCart, ChevronDown, Menu, Loader2, Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// --- UI IMPORTS ---
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
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

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentUser = useSelector(selectCurrentUser);
    const { searchResults, searchLoading } = useSelector((state: RootState) => state.product);
    const dbTotalCartItems = useSelector((state: RootState) => state.cart.totalItems);
    const dbTotalWishlistItems = useSelector(selectTotalWishlistItems);
    const { categories, categoryStatus } = useSelector((state: RootState) => state.admin);
    const { totalItems: localTotalCartItems } = useLocalCart();
    const { totalItems: localTotalWishlistItems } = useLocalWishlist();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    
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
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 5);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
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
        <div 
            onMouseEnter={() => setIsUserDropdownOpen(true)}
            onMouseLeave={() => setIsUserDropdownOpen(false)}
        >
            <DropdownMenu open={isUserDropdownOpen} onOpenChange={setIsUserDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary" aria-label="Account">
                        <User size={22} />
                    </Button>
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
        </div>
    );

    const MainNavLinks = () => (
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-white">
            <div 
                onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
                <DropdownMenu open={isCategoryDropdownOpen} onOpenChange={setIsCategoryDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                            Categories
                            <ChevronDown size={16} className={`transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        {categoryStatus === 'loading' && <DropdownMenuItem disabled>Loading...</DropdownMenuItem>}
                        {categoryStatus === 'succeeded' && categories.map(category => (
                            <DropdownMenuItem asChild key={category._id}>
                                <Link href={`/shop?category=${encodeURIComponent(category.name)}`}>{category.name}</Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/shop" className="font-semibold text-primary">View All Products</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Link href="/about" className="hover:opacity-80 transition-opacity">About</Link>
            <Link href="/shop" className="hover:opacity-80 transition-opacity">Shop</Link>
            <Link href="/shop/new-arrivals" className="hover:opacity-80 transition-opacity">New Arrivals</Link>
            <Link href="/shop/sale" className="hover:opacity-80 transition-opacity">Sale</Link>
            <Link href="/shop/best-sellers" className="hover:opacity-80 transition-opacity">Best Sellers</Link>
            <Link href="/blogs" className="hover:opacity-80 transition-opacity">Blogs</Link>
        </div>
    );

    return (
        <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
            
            {/* ===== Top Row (Branding & Actions) ===== */}
            <div className="border-b border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative flex justify-between items-center h-24">
                    
                    <div className="flex items-center gap-4">
                        <Image src="/flag.jpg" alt="Indian Flag" width={80} height={50} />
                        <div className="text-left hidden sm:block">
                            <h2 className="text-2xl font-extrabold tracking-wide">
                                <span className="text-orange-500">VANDE</span>
                                <span className="text-green-600"> BHARAT</span>
                                <span className="text-blue-500"> MART</span>
                            </h2>
                            <p className="text-md font-bold text-blue-800"><span className="text-orange-500">Vande</span><span className="text-green-600"> Bharat</span> <span className="text-blue-500">Group Co. Ltd.</span></p>
                        </div>
                    </div>
                    
                    {/* --- LOGO: Resized for mobile --- */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]">
                        <Link href="/">
                            <Image src="/logogif.gif" alt="Vande Bharat Animated Logo" layout="fill" objectFit="contain" unoptimized={true} />
                        </Link>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
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
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 overflow-hidden"
                                    >
                                        {searchLoading && (
                                            <div className="p-4 text-center">
                                                <Loader2 className="h-5 w-5 animate-spin inline-block" />
                                            </div>
                                        )}
                                        {!searchLoading && searchResults.length > 0 && (
                                            <ul>
                                                {searchResults.map((p: any) => (
                                                    <li key={p._id}>
                                                        <Link
                                                            href={`/product/${p.slug}`}
                                                            onClick={() => setIsSearchOpen(false)}
                                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Image src={p.images[0]} alt={p.name} width={40} height={40} className="rounded object-cover" />
                                                            <span className="text-sm font-medium">{p.name}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li>
                                                    <Link
                                                        href={`/shop?search=${encodeURIComponent(searchQuery.trim())}`}
                                                        onClick={() => setIsSearchOpen(false)}
                                                        className="block w-full text-center p-3 font-semibold text-sm text-primary hover:bg-primary/5 transition-colors"
                                                    >
                                                        View all results
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                        {!searchLoading && searchResults.length === 0 && debouncedSearchQuery.length > 2 && (
                                            <div className="p-4 text-center text-sm text-gray-500">No results found.</div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <UserAccountNav />
                        <Link href="/wishlist" className="relative text-gray-700 hover:text-primary p-2" aria-label="Wishlist">
                            <Heart size={22} />
                            {totalWishlistItems > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {totalWishlistItems}
                                </span>
                            )}
                        </Link>
                        <Link href="/cart" className="relative text-gray-700 hover:text-primary p-2" aria-label="Cart">
                            <ShoppingCart size={22} />
                            {totalCartItems > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {totalCartItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* ===== Bottom Row (Navigation) ===== */}
            <div className="bg-[var(--brand-orange)]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center h-12">
                    <MainNavLinks />
                    
                    <div className="lg:hidden w-full flex justify-end">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/20">
                                    <Menu size={24} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full max-w-sm p-0 overflow-y-auto">
                                <SheetHeader className="p-6 pb-0">
                                    <div className="flex justify-between items-center">
                                        <SheetTitle className="text-xl font-semibold">Menu</SheetTitle>
                                        <SheetClose><X size={20} /></SheetClose>
                                    </div>
                                </SheetHeader>
                                <div className="p-6">
                                    <div className="mb-6">
                                        <form onSubmit={handleSearchSubmit} className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                                        </form>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-4">
                                            <h3 className="font-semibold text-lg text-gray-800">Categories</h3>
                                            <div className="flex flex-col gap-3 pl-4 border-l-2">
                                                {categoryStatus === 'loading' && <p className="text-gray-500">Loading...</p>}
                                                {categories.map(category => (
                                                    <SheetClose asChild key={category._id}><Link href={`/shop?category=${encodeURIComponent(category.name)}`} className="text-gray-600 hover:text-primary font-medium">{category.name}</Link></SheetClose>
                                                ))}
                                                <SheetClose asChild><Link href="/shop" className="font-semibold text-primary">View All Products</Link></SheetClose>
                                            </div>
                                        </div>
                                        <div className="border-t pt-6 flex flex-col gap-4">
                                            <SheetClose asChild><Link href="/about" className="font-semibold text-gray-700 hover:text-primary">About</Link></SheetClose>
                                            <SheetClose asChild><Link href="/shop" className="font-semibold text-gray-700 hover:text-primary">Shop</Link></SheetClose>
                                            <SheetClose asChild><Link href="/shop/new-arrivals" className="font-semibold text-gray-700 hover:text-primary">New Arrivals</Link></SheetClose>
                                            <SheetClose asChild><Link href="/shop/sale" className="font-semibold text-red-600 hover:text-red-700">Sale</Link></SheetClose>
                                            <SheetClose asChild><Link href="/shop/best-sellers" className="font-semibold text-gray-700 hover:text-primary">Best Sellers</Link></SheetClose>
                                            <SheetClose asChild><Link href="/blogs" className="font-semibold text-gray-700 hover:text-primary">Blogs</Link></SheetClose>
                                        </div>
                                        <div className="border-t pt-6 flex flex-col gap-4">
                                            <h3 className="font-semibold text-lg text-gray-800">Account</h3>
                                            {isAuthenticated ? (
                                                <div className="flex flex-col gap-3 pl-4 border-l-2">
                                                    <p className="text-sm text-gray-600">Hi, {currentUser?.fullName}</p>
                                                    <SheetClose asChild><Link href="/account/user" className="font-medium text-gray-700 hover:text-primary">My Profile</Link></SheetClose>
                                                    <SheetClose asChild><Link href="/account/user/order-history" className="font-medium text-gray-700 hover:text-primary">My Orders</Link></SheetClose>
                                                    <SheetClose asChild><button onClick={handleLogout} className="text-left font-medium text-red-600 hover:text-red-700">Sign Out</button></SheetClose>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-3 pl-4 border-l-2">
                                                    <SheetClose asChild><Link href="/login" className="font-medium text-gray-700 hover:text-primary">Login</Link></SheetClose>
                                                    <SheetClose asChild><Link href="/signup" className="font-medium text-gray-700 hover:text-primary">Sign Up</Link></SheetClose>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
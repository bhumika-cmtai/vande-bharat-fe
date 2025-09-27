"use client" // Yeh line zaroori hai

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Frown, Filter, X } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/redux/store"
import { fetchProducts } from "@/lib/redux/slices/productSlice"
import {ProductCard} from "@/components/ProductCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductGridSkeleton from "@/components/skeleton/ProductGridSkeleton"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// CollectionHeader component yahan move kar dein
const CollectionHeader = () => (
    <div className="relative h-[200px] md:h-[300px] w-full bg-gray-200">
        <Image
            src="/new-arrivals.jpg"
            alt="New Arrivals Banner"
            fill
            className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">New Arrivals</h1>
            <p className="mt-2 text-xs md:text-sm">Explore the latest additions to our collection.</p>
        </div>
    </div>
);

// Component ka naam badal dein
export default function NewArrivalsPageClient() {
    // Aapka poora existing page ka code yahan aayega
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { 
        items: newArrivalProducts, 
        loading, 
        error, 
        currentPage, 
        totalPages 
    } = useSelector((state: RootState) => state.product);

    const [sortOption, setSortOption] = useState('newest');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        const page = searchParams.get('page') || '1';
        const queryParams: { page: string, category?: string, sort?: string } = {
            page: page,
            sort: 'newest'
        };
        
        if (categoryFilter !== 'all') {
            queryParams.category = categoryFilter; 
        }

        dispatch(fetchProducts(queryParams));
    }, [dispatch, categoryFilter, searchParams]);

    const sortedProducts = useMemo(() => {
        const sorted = [...newArrivalProducts];
        switch (sortOption) {
            case 'price-asc':
                sorted.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
                break;
            case 'price-desc':
                sorted.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
                break;
            case 'newest':
                 sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            default:
                break;
        }
        return sorted;
    }, [sortOption, newArrivalProducts]);

    const mappedProducts = useMemo(() => sortedProducts.map(p => ({
        _id: p._id,
        name: p.name,
        slug: p.slug,
        images: p.images,
        tags: p.tags,
        price: p.sale_price ?? p.price,
        base_price: p.sale_price ? p.price : undefined,
        originalProduct: p,
    })), [sortedProducts]);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleCategoryChange = (category: string) => {
        setCategoryFilter(category);
        setShowMobileFilters(false); // Close mobile filter after selection
    };

    const categories = [
        { value: 'all', label: 'All' },
        { value: 'skin-care', label: 'Skin Care' },
        { value: 'hair-care', label: 'Hair Care' },
        { value: 'Personal-care', label: 'Personal Care' },
        { value: 'Wellness', label: 'Wellness' }
    ];

    return (
        <>
            <CollectionHeader />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* --- Filter & Toolbar --- */}
                <div className="mb-8 pb-4 border-b">
                    {/* Desktop Filters */}
                    <div className="hidden md:flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold">Filter:</span>
                            <div className="flex gap-1 bg-gray-200 p-1 rounded-full">
                                {categories.map((cat) => (
                                    <button 
                                        key={cat.value}
                                        onClick={() => setCategoryFilter(cat.value)} 
                                        className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                                            categoryFilter === cat.value 
                                                ? 'bg-white shadow-sm text-black font-semibold' 
                                                : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">Sort By:</span>
                            <Select value={sortOption} onValueChange={setSortOption}>
                                <SelectTrigger className="w-[160px] h-9 text-sm">
                                    <SelectValue placeholder="Sorting" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Mobile Filters */}
                    <div className="md:hidden">
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <button 
                                onClick={() => setShowMobileFilters(!showMobileFilters)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
                            >
                                <Filter className="w-4 h-4" />
                                Filter ({categories.find(cat => cat.value === categoryFilter)?.label})
                            </button>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">Sort:</span>
                                <Select value={sortOption} onValueChange={setSortOption}>
                                    <SelectTrigger className="w-[140px] h-9 text-sm">
                                        <SelectValue placeholder="Sort" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="featured">Featured</SelectItem>
                                        <SelectItem value="price-asc">Low to High</SelectItem>
                                        <SelectItem value="price-desc">High to Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Mobile Filter Dropdown */}
                        {showMobileFilters && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg mb-4"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-sm">Filter by Category</h3>
                                    <button 
                                        onClick={() => setShowMobileFilters(false)}
                                        className="p-1 hover:bg-gray-100 rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {categories.map((cat) => (
                                        <button 
                                            key={cat.value}
                                            onClick={() => handleCategoryChange(cat.value)}
                                            className={`px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                                                categoryFilter === cat.value 
                                                    ? 'bg-orange-100 text-orange-800 font-medium border border-orange-200' 
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="text-sm text-gray-600 mt-2">
                        {!loading && (
                            <span>
                                Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
                                {categoryFilter !== 'all' && ` in ${categories.find(cat => cat.value === categoryFilter)?.label}`}
                            </span>
                        )}
                    </div>
                </div>

                {/* --- Product Grid & States --- */}
                <div className="product-grid-container">
                    {loading ? (
                        <ProductGridSkeleton count={8} />
                    ) : error ? (
                        <div className="text-center py-20 text-red-500">Failed to load new arrivals.</div>
                    ) : sortedProducts.length > 0 ? (
                        <motion.div 
                            layout 
                            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8"
                        >
                            {sortedProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
                            <Frown className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-semibold">No New Arrivals Found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or check back later!</p>
                        </div>
                    )}
                </div>
                
                {/* --- PAGINATION UI --- */}
                {totalPages > 1 && !loading && (
                    <div className="mt-12">
                        <Pagination>
                            <PaginationContent className="flex-wrap justify-center gap-1">
                                <PaginationItem>
                                    <PaginationPrevious 
                                        href="#" 
                                        onClick={(e) => { 
                                            e.preventDefault(); 
                                            if (currentPage > 1) handlePageChange(currentPage - 1); 
                                        }} 
                                        className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} text-sm px-3 py-1`}
                                    />
                                </PaginationItem>
                                
                                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    
                                    return (
                                        <PaginationItem key={pageNum}>
                                            <PaginationLink 
                                                href="#" 
                                                onClick={(e) => { 
                                                    e.preventDefault(); 
                                                    handlePageChange(pageNum); 
                                                }} 
                                                isActive={currentPage === pageNum}
                                                className="text-sm px-3 py-1 min-w-[40px]"
                                            >
                                                {pageNum}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}

                                <PaginationItem>
                                    <PaginationNext 
                                        href="#" 
                                        onClick={(e) => { 
                                            e.preventDefault(); 
                                            if (currentPage < totalPages) handlePageChange(currentPage + 1); 
                                        }} 
                                        className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} text-sm px-3 py-1`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </main>
        </>
    )
}
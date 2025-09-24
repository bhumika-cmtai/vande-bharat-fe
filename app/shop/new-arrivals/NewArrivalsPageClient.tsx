"use client" // Yeh line zaroori hai

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Frown } from "lucide-react"
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
            src="/hero2.jpg"
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

    return (
        <>
            <CollectionHeader />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* --- Filter & Toolbar --- */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold">Filter:</span>
                        <div className="flex gap-1 bg-gray-200 p-1 rounded-full">
                        <button onClick={() => setCategoryFilter('all')} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${categoryFilter === 'all' ? 'bg-white shadow-sm text-black font-semibold' : 'text-gray-600'}`}>All</button>
                            <button onClick={() => setCategoryFilter('food')} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${categoryFilter === 'food' ? 'bg-white shadow-sm text-black font-semibold' : 'text-gray-600'}`}>Food</button>
                            <button onClick={() => setCategoryFilter('skin-care')} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${categoryFilter === 'skin-care' ? 'bg-white shadow-sm text-black font-semibold' : 'text-gray-600'}`}>skin-care</button>
                            <button onClick={() => setCategoryFilter('hair-care')} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${categoryFilter === 'hair-care' ? 'bg-white shadow-sm text-black font-semibold' : 'text-gray-600'}`}>Hair-care</button>
                            <button onClick={() => setCategoryFilter('Personal-care')} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${categoryFilter === 'Personal-care' ? 'bg-white shadow-sm text-black font-semibold' : 'text-gray-600'}`}>Personal-care</button>
                            <button onClick={() => setCategoryFilter('Wellness')} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${categoryFilter === 'Wellness' ? 'bg-white shadow-sm text-black font-semibold' : 'text-gray-600'}`}>Wellness</button>
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

                {/* --- Product Grid & States --- */}
                <div className="product-grid-container">
                    {loading ? (
                        <ProductGridSkeleton count={8} />
                    ) : error ? (
                        <div className="text-center py-20 text-red-500">Failed to load new arrivals.</div>
                    ) :sortedProducts.length > 0 ? (
                        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
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
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePageChange(currentPage - 1); }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} />
                                </PaginationItem>
                                
                                {[...Array(totalPages)].map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }} isActive={currentPage === i + 1}>
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) handlePageChange(currentPage + 1); }} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </main>
        </>
    )
}
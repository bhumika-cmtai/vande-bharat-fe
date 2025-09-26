"use client";

// Keep all imports the same
import { useEffect, useState, useMemo, useCallback } from 'react'; // Make sure useCallback is imported
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchProducts } from '@/lib/redux/slices/productSlice';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiltersSidebar } from '@/components/FiltersSidebar';
import { PriceRangeFilter } from '@/components/PriceRangeFilter';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ProductGridSkeleton from '@/components/skeleton/ProductGridSkeleton';

// --- E-COMMERCE FILTERS (Unchanged) ---
const allFilterGroups = [
    // ... your filter groups here, no changes needed
    { id: 'category', label: 'Category', options: [ { id: 'SKIN_CARE', label: 'Skin Care' }, { id: 'HAIR_CARE', label: 'Hair Care' }, { id: 'PERSONAL_CARE', label: 'Personal Care' }, { id: 'WELLNESS_PRODUCT', label: 'Wellness' }, { id: 'FOOD_PRODUCT', label: 'Food & Beverages' }, ] }, { id: 'sub_category', label: 'Sub-Category', options: [ { id: "face-wash", label: "Face Wash" }, { id: "moisturizer", label: "Moisturizer" }, { id: "serum", label: "Serum" }, { id: "sunscreen", label: "Sunscreen" }, { id: "shampoo", label: "Shampoo" }, { id: "conditioner", label: "Conditioner" }, { id: "hair-oil", label: "Hair Oil" }, { id: "soap", label: "Soap" }, { id: "body-wash", label: "Body Wash" }, { id: "vitamins", label: "Vitamins" }, { id: "supplements", label: "Supplements" }, { id: "snacks", label: "Snacks" }, { id: "beverages", label: "Beverages" }, ] }, { id: 'tags', label: 'Tags', options: [ { id: 'New', label: 'New Arrival' }, { id: 'Sale', label: 'On Sale' }, { id: 'Organic', label: 'Organic' }, { id: 'Vegan', label: 'Vegan' }, { id: 'Hot', label: 'Best Seller' } ] },
];


export default function ShopPageClient() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { items: products, loading, error, currentPage, totalPages, totalProducts } = useSelector((state: RootState) => state.product);
  
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [currentPriceRange, setCurrentPriceRange] = useState({ min: 0, max: 10000 });

  useEffect(() => {
    const filtersFromURL: Record<string, string[]> = {};
    allFilterGroups.forEach(group => {
        if (searchParams.has(group.id)) {
            filtersFromURL[group.id] = searchParams.get(group.id)!.split(',');
        }
    });
    setSelectedFilters(filtersFromURL);
    
    setCurrentPriceRange({
        min: Number(searchParams.get('minPrice')) || 0,
        max: Number(searchParams.get('maxPrice')) || 10000
    });

    const paramsForFetch = Object.fromEntries(searchParams.entries());
    dispatch(fetchProducts(paramsForFetch));

  }, [searchParams, dispatch]);


  // --- Filter Handlers wrapped in useCallback ---

  const updateURL = useCallback((newParams: URLSearchParams) => {
    newParams.set('page', '1');
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [pathname, router]); // Dependencies: things from outside that the function uses

  const handleFilterChange = useCallback((groupId: string, optionId: string, checked: boolean) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentGroup = newParams.get(groupId)?.split(',') || [];
    
    const newGroup = checked
      ? [...currentGroup, optionId]
      : currentGroup.filter(item => item !== optionId);

    if (newGroup.length > 0) {
      newParams.set(groupId, newGroup.join(','));
    } else {
      newParams.delete(groupId);
    }
    
    updateURL(newParams);
  }, [searchParams, updateURL]); // Dependency: depends on current searchParams and the stable updateURL function

  const handlePriceChange = useCallback((min: number, max: number) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (min > 0) {
      newParams.set('minPrice', String(min));
    } else {
      newParams.delete('minPrice');
    }

    if (max < 10000) { 
      newParams.set('maxPrice', String(max));
    } else {
      newParams.delete('maxPrice');
    }

    updateURL(newParams);
  }, [searchParams, updateURL]);

  const handleClearFilters = useCallback(() => {
    const newParams = new URLSearchParams();
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [pathname, router]);

  const handlePageChange = useCallback((page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page.toString());
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  // --- JSX (No changes needed here) ---
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ... header div */}
        <div className="bg-gray-100 rounded-2xl p-8 text-center mb-12">
          <h1 className="text-4xl font-serif font-bold">Shop Collection</h1>
          <p className="text-gray-600 mt-2">Discover our curated selection of high-quality products.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <FiltersSidebar 
            filters={allFilterGroups}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange} // Now passing a memoized function
            onClearFilters={handleClearFilters} // Now passing a memoized function
          >
            <div className="p-4 border-t">
               <h3 className="font-semibold mb-4">Price Range</h3>
               <PriceRangeFilter
                  initialMin={currentPriceRange.min}
                  initialMax={currentPriceRange.max}
                  maxPrice={10000}
                  onPriceChange={handlePriceChange} // Now passing a memoized function
                />
            </div>
          </FiltersSidebar>

          <div className="flex-1">
            {/* ... rest of your JSX */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Showing <span className='font-bold'>{products.length}</span> of <span className='font-bold'>{totalProducts}</span> products</p>
            </div>
            {loading && products.length === 0 ? (
              <ProductGridSkeleton count={9} />
            ) : error ? (
              <div className="text-center py-20 text-red-500">Failed to load products. Please try again.</div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-700 text-lg font-semibold">No products found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
                <Button onClick={handleClearFilters} variant="link" className='mt-2'>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
                {products.map(product => <ProductCard key={product._id} product={product} />)}
              </div>
            )}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePageChange(currentPage - 1); }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }} isActive={currentPage === i + 1}>{i + 1}</PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) handlePageChange(currentPage + 1); }} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
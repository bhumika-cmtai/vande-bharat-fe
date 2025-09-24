"use client"
import { Suspense } from 'react';
import ShopPageClient from './ShopPageClient';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<ShopPageFallback />}>
        <ShopPageClient />
      </Suspense>
      <Footer />
    </div>
  );
}

const ShopPageFallback = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl p-8 text-center mb-12 animate-pulse shadow-sm border border-gray-100">
        <div className="h-12 bg-gray-100 rounded-2xl w-1/3 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-100 rounded-xl w-2/3 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block">
          <div className="sticky top-28 p-6 rounded-xl border bg-white shadow-sm">
            <div className="h-8 bg-gray-100 rounded w-20 mb-6"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-6">
                <div className="h-6 bg-gray-100 rounded w-24 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <div className="h-4 w-4 bg-gray-100 rounded"></div>
                      <div className="h-4 bg-gray-100 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Products skeleton */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="aspect-[4/5] bg-gray-100"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-100 rounded w-16 mb-3"></div>
                  <div className="h-6 bg-gray-100 rounded w-full mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-100 rounded w-20"></div>
                    <div className="h-10 bg-gray-100 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

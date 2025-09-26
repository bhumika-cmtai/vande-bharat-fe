// app/blog/page.tsx

"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { fetchPublishedBlogs, Blog } from '@/lib/redux/slices/blogSlice';

// UI & Animation Components
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '@/components/ui/button';
import { Calendar, User, BookOpen } from 'lucide-react';

// NEW: Import BlogSection component
// import { BlogSection } from '@/components/BlogSection';
import { BlogSection } from '@/components/BlogsSection';

// Blog Card Component (same as before)
const BlogCard = ({ blog }: { blog: Blog }) => {
  const postDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <MotionDiv variants={fadeInUp}>
      <Link href={`/blog/${blog.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-white/50 shadow-lg border border-white/20 backdrop-blur-sm transition-all duration-500 h-full flex flex-col hover:shadow-2xl hover:-translate-y-2">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
            <span className="absolute top-4 left-4 bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-orange)] text-white px-3 py-1 rounded-full text-xs font-semibold">
              {blog.category}
            </span>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-brand-dark group-hover:text-[var(--brand-green)] transition-colors duration-300 mb-3 leading-tight">
              {blog.title}
            </h3>
            <p className="text-gray-600 text-sm flex-grow mb-4 line-clamp-3">
              {blog.excerpt}
            </p>
            <div className="border-t border-gray-200 pt-4 mt-auto text-xs text-gray-500 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[var(--brand-orange)]" />
                <span>{blog.author?.fullName || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--brand-blue)]" />
                <span>{postDate}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
};

// Skeleton Card for Loading State
const SkeletonCard = () => (
  <div className="space-y-4 p-4 bg-white/30 rounded-2xl shadow-md">
    <Skeleton className="h-48 w-full rounded-xl bg-gray-200/50" />
    <div className="space-y-3">
      <Skeleton className="h-4 w-1/4 rounded bg-gray-200/50" />
      <Skeleton className="h-6 w-full rounded bg-gray-200/50" />
      <Skeleton className="h-4 w-full rounded bg-gray-200/50" />
      <Skeleton className="h-4 w-3/4 rounded bg-gray-200/50" />
    </div>
  </div>
);

export default function BlogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts: blogs, loading, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchPublishedBlogs({}));
    }
  }, [dispatch, blogs.length]);

  return (
    <main className="overflow-hidden bg-gradient-to-br from-green-50/20 via-white to-blue-50/20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/blog-hero.jpg"
            alt="A serene desk with a journal and plants"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" />
        </div>
        
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4"
        >
          <MotionDiv variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r via-60% from-[var(--brand-orange)] via-[var(--brand-blue)] to-[var(--brand-green)] bg-clip-text text-transparent leading-tight drop-shadow-lg">
              Our Journal
            </h1>
          </MotionDiv>
          <MotionDiv variants={fadeInUp}>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-[var(--brand-green)] leading-relaxed">
              Insights, tips, and stories from the world of Vande Bharat Mart.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-orange)] mx-auto mt-6 rounded-full"></div>
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* NEW: Featured Articles Scrolling Section */}
      <BlogSection
        title="Featured Articles"
        subtitle="Discover our most popular and trending blog posts"
        filterParams={{
          limit: 8,
          // You can add category or tags filter here if needed
          // category: "wellness",
          // tags: "featured"
        }}
        viewAllLink="#latest-articles"
        className="my-16"
      />

      {/* NEW: Category-based Scrolling Sections */}
      <BlogSection
        title="Wellness & Health"
        subtitle="Tips and insights for a healthier lifestyle"
        filterParams={{
          limit: 6,
          category: "wellness"
        }}
        className="my-16"
      />

      <BlogSection
        title="Beauty & Skincare"
        subtitle="Natural beauty secrets and skincare tips"
        filterParams={{
          limit: 6,
          category: "beauty"
        }}
        className="my-16"
      />

      {/* Blog Posts Grid Section */}
      <section id="latest-articles" className="py-20 md:py-24">
        <div className="container mx-auto px-6">
          <MotionDiv 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--brand-orange-500)]">All Articles</h2>
            <p className="text-lg text-[var(--brand-green)]/70 mt-4">Browse through all our articles organized in a clean grid layout.</p>
          </MotionDiv>
          
          {/* Conditional Rendering */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-red-50 text-red-600 rounded-xl">
              <p className="text-2xl font-semibold">Oops! Something went wrong.</p>
              <p className="mt-2">{error}</p>
              <Button onClick={() => dispatch(fetchPublishedBlogs({}))} className="mt-6">
                Try Again
              </Button>
            </div>
          ) : blogs.length > 0 ? (
            <MotionDiv 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
            >
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </MotionDiv>
          ) : (
            <div className="text-center py-20 bg-gray-50/80 rounded-2xl">
              <BookOpen className="mx-auto h-16 w-16 text-gray-400" />
              <p className="mt-6 text-2xl font-semibold text-gray-700">No Articles Found</p>
              <p className="mt-2 text-gray-500">We're busy writing new stories. Please check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
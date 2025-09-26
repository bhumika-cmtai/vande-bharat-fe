import HeroSlider from '@/components/home/HeroSlider';
import { CategorySlider } from '@/components/home/CategorySlider';
import { ProductSection } from '@/components/home/ProductSection';
import { Certifications } from '@/components/home/Certifications';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { BenefitsStrip } from '@/components/BenefitsStrip';
import { FeatureGrid } from '@/components/FeatureGrid';
import { AllProducts } from '@/components/home/AllProducts';
import { Testimonials } from '@/components/home/Testimonials';
import { PromoBanner } from '@/components/home/PromoBanner';
import { ProductCarousel } from '@/components/home/ProductCarousel';
import ProductFeaturesSection from '@/components/home/ProductFeatureSection';
import ProductCollectionGrid from '@/components/home/ProductCollectionGrid';
import ProductShowcaseSection from '@/components/home/ProductShowcaseSection';
import { ContactForm } from '@/components/home/ContactForm';
import { BlogSection } from '@/components/BlogsSection';


export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--brand-orange)]/10">
      {/* Hero Section */}
      <HeroSlider />
      
      <div className="py-16 md:py-24 space-y-20 md:space-y-28">
        {/* Category Navigation */}
        <CategorySlider /> 
        
        {/* Product Showcase */}
        <ProductShowcaseSection />
        <ProductFeaturesSection />
        <ProductCollectionGrid />
        
        {/* Featured Products Section */}
        <ProductSection 
          title="Featured Products"
          subtitle="Fresh from our farms to your home."
          filterParams={{ tags: 'featured', limit: 8 }}
        />

        {/* Features Grid */}
        <FeatureGrid /> 

        {/* Skin Care Products */}
        <ProductSection 
          title="Pure & Personal Care"
          subtitle="Nourish your body with the goodness of nature."
          filterParams={{ category: 'skin-care', limit: 8 }}
        />
        <BlogSection
          title="Latest Articles"
          subtitle="Discover our most latest blog posts"
          filterParams={{
            limit: 8,
            // You can add category or tags filter here if needed
            // category: "wellness",
            // tags: "featured"
          }}
          viewAllLink="#latest-articles"
          className="my-16"
        />
        
        {/* Promotional Banner */}
        <PromoBanner />
        
        {/* Product Carousel */}
        {/* <ProductCarousel /> */}
        
        {/* New Arrivals */}
        <ProductSection 
          title="New Arrivals"
          subtitle="Our most popular customer picks this season."
          filterParams={{ limit: 8 }}
        />

        {/* All Products */}
        <AllProducts />

        {/* Certifications */}
        <Certifications />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Contact Form */}
        <ContactForm />
      </div>
    </main>
  );
}

import HeroSlider from '@/components/home/HeroSlider';
import { CategorySlider } from '@/components/home/CategorySlider'; // <-- 1. Import Karein
import { ProductSection } from '@/components/home/ProductSection';
import { Certifications } from '@/components/home/Certifications';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { BenefitsStrip } from '@/components/BenefitsStrip';
import { FeatureGrid } from '@/components/FeatureGrid';
import { AllProducts } from '@/components/home/AllProducts';
import { Testimonials } from '@/components/home/Testimonials';
import { PromoBanner } from '@/components/home/PromoBanner';
import { ProductCarousel } from '@/components/home/ProductCarousel';

export default function HomePage() {
  return (
    <main>
      {/* 1 */}
      <HeroSlider />
      
      <div className="py-16 md:py-24 space-y-20 md:space-y-28">
      {/* 2 */}
        
        <CategorySlider /> 
      {/* 3 */}

        <ProductSection 
          title="Featured Products"
          subtitle="Fresh from our farms to your home."
          filterParams={{ tags: 'Sale', limit: 4 }}
        />
      {/* 4 */}

        <FeatureGrid /> 


      {/* 5 */}
        <ProductSection 
          title="Pure & Personal Care"
          subtitle="Nourish your body with the goodness of nature."
          filterParams={{ category: 'Personal Care', limit: 4 }}
        />
        {/* 6 */}
        <PromoBanner />
        {/* 7 */}
        <ProductCarousel />
        {/* 8 */}
        <ProductSection 
          title="New Arrivals"
          subtitle="Our most popular customer picks this season."
          filterParams={{ tags: 'New', limit: 8 }}
        />
      {/* 9 */}
      <AllProducts />

      {/* 10 */}
        <Certifications />
        {/* 11 */}
        <ProductSection 
          title="Healthy Grains & Flours"
          subtitle="The foundation of a wholesome Indian meal."
          filterParams={{ category: 'Grains', limit: 4 }}
        />
        {/* 12 */}
        <Testimonials />
      </div>
    </main>
  );
}
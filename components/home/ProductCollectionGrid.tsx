import React from 'react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import { ArrowRight, Star, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';

export default function ProductCollectionGrid() {
  const collections = [
    {
      id: 1,
      title: "WELLNESS",
      image: "/bodygel11.jpg",
      buttonText: "Shop Now",
      className: "row-span-2",
      bgColor: "bg-[var(--brand-green-100)]",
      overlay: "from-green-100/80 to-green-200/80"
    },
    {
      id: 3,
      title: "SKIN CARE",
      image: "/tulsi2.jpg", 
      buttonText: "Shop Now",
      className: "",
      bgColor: "bg-[var(--brand-green-100)]",
      overlay: "from-green-100/40 to-green-200/40"
    },
    {
      id: 4,
      title: "PERSONAL CARE",
      image: "/facewash2.jpg",
      buttonText: "Shop Now", 
      className: "",
      bgColor: "bg-[var(--brand-green-100)]",
      overlay: "from-green-100/40 to-green-200/40"
    }
  ];

  return (
    <section className="py-10 md:py-32 bg-gradient-to-br from-white via-green-50/30 to-blue-50/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full text-sm font-semibold text-green-800 mb-4">
            <Star className="w-4 h-4 mr-2" />
            SHOP CATEGORIES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Natural Beauty Collection
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--brand-green)] to-green-400 mx-auto rounded-full"></div>
        </MotionDiv>

        {/* Grid Layout */}
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {/* Wellness Card */}
          <MotionDiv
            variants={fadeInUp} 
            className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer row-span-2 bg-[var(--brand-green-100)]`}
            style={{ minHeight: '600px' }}
          >
            <div className="absolute inset-0">
              <MotionDiv
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full"
              >
                <img 
                  src={collections[0].image}
                  alt={collections[0].title}
                  className="w-full h-full object-cover"
                />
              </MotionDiv>
              
              <div className={`absolute inset-0 bg-gradient-to-br from-green-100/80 to-green-200/80 group-hover:opacity-90 transition-opacity duration-300`} />
            </div>

            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <h3 className="font-bold text-gray-800 mb-2 leading-tight text-2xl md:text-3xl">
                  {collections[0].title}
                </h3>
              </div>

              <div className="self-center">
                <MotionDiv
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/btn"
                >
                  <Link href="/shop">
                    <button className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-100 border border-white/50 group-hover:border-green-200">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {collections[0].buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </Link>
                </MotionDiv>
              </div>
            </div>

            <MotionDiv
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-green-600/10 via-transparent to-transparent pointer-events-none"
            />
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </MotionDiv>

          {/* Patriotic Text Section */}
          <MotionDiv
            variants={fadeInUp}
            className="col-span-2 group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-orange-50 via-white to-green-50 border-2 border-gradient-to-r border-orange-200"
            style={{ minHeight: '300px' }}
          >
            {/* Indian Flag Colors Background Pattern */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-r from-orange-100/40 to-orange-200/40"></div>
              <div className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-r from-white/60 to-gray-50/60"></div>
              <div className="absolute top-2/3 left-0 w-full h-1/3 bg-gradient-to-r from-green-100/40 to-green-200/40"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 opacity-20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 via-white to-green-400"></div>
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 via-white to-orange-400"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center text-center h-full p-8">
              <div className="mb-4">
                <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 via-white to-green-100 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 shadow-lg border border-orange-200/50">
                  <Heart className="w-4 h-4 mr-2 text-red-500 fill-current" />
                  Made in India
                </span>
              </div>
              
              <h3 className="font-bold text-gray-800 mb-6 leading-tight text-3xl md:text-4xl">
                <span className="text-orange-600">Swadeshi</span>{' '}
                <span className="text-gray-800">Products</span>{' '}
                <span className="text-green-600">Collection</span>
              </h3>

              <p className="text-gray-700 leading-relaxed max-w-lg mx-auto mb-6 text-lg">
                Discover the essence of <strong className="text-orange-600">Bharat</strong> through our carefully curated range of 
                authentic Indian products. From traditional wellness solutions to modern personal care, 
                each product celebrates our rich heritage and commitment to 
                <strong className="text-green-600"> Atmanirbhar Bharat</strong>.
              </p>

              <div className="grid grid-cols-3 gap-4 text-center max-w-md">
                <div className="p-3">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">Natural</div>
                </div>
                <div className="p-3 border-x border-gray-200">
                  <div className="text-2xl font-bold text-green-600">Pure</div>
                  <div className="text-sm text-gray-600">Indian</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl font-bold text-blue-600">Quality</div>
                  <div className="text-sm text-gray-600">Assured</div>
                </div>
              </div>

              <div className="mt-8">
                <MotionDiv
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/shop">
                    <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 via-white to-green-500 text-gray-800 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-orange-200 hover:border-green-200">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Explore Collection
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </Link>
                </MotionDiv>
              </div>
            </div>

            {/* Subtle Indian Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-repeat" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' opacity='0.1'%3E%3Cpath d='M20 20c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10zm10 0c0 5.5-4.5 10-10 10s-10-4.5-10-10 4.5-10 10-10 10 4.5 10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
          </MotionDiv>

          {/* Skin Care and Personal Care Cards */}
          {collections.slice(1).map((collection) => (
            <MotionDiv
              key={collection.id}
              variants={fadeInUp} 
              className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-[var(--brand-green-100)]`}
              style={{ minHeight: '280px' }}
            >
              <div className="absolute inset-0">
                <MotionDiv
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img 
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                </MotionDiv>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.overlay} group-hover:opacity-90 transition-opacity duration-300`} />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-8">
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <h3 className="font-bold text-gray-800 mb-2 leading-tight text-xl md:text-2xl">
                    {collection.title}
                  </h3>
                </div>

                <div className="self-center">
                  <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn"
                  >
                    <Link href="/shop">
                      <button className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-100 border border-white/50 group-hover:border-green-200">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {collection.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </Link>
                  </MotionDiv>
                </div>
              </div>

              <MotionDiv
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-green-600/10 via-transparent to-transparent pointer-events-none"
              />
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Bottom CTA */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16"
        >
          <MotionDiv
            whileHover={{ scale: 1.02 }}
            className="inline-block"
          >
            <Link href="/shop">
              <button className="bg-gradient-to-r from-[var(--brand-green)] to-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-100 transform hover:-translate-y-1">
                View All Collections
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
            </Link>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
}
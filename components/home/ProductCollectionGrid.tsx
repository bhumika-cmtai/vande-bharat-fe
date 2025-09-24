import React from 'react';
import { MotionDiv } from '@/components/motion/MotionDiv';
import { staggerContainer, fadeInUp } from '@/lib/motion/motionVariants';
import { ArrowRight, Star, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function ProductCollectionGrid() {
  const collections = [
    {
      id: 1,
      title: "WELLNESS",
      image: "/bodygel11.png",
      buttonText: "Shop Now",
      className: "row-span-2",
      bgColor: "bg-[var(--brand-green-100)]",
      overlay: "from-green-100/80 to-green-200/80"
    },
    {
      id: 2,
      title: "FOOD", 
      image: "/hero3.jpg",
      buttonText: "Explore",
      className: "col-span-2",
      bgColor: "bg-white",
      overlay: "from-orange-100/80 to-orange-200/80",
      featured: true
    },
    {
      id: 3,
      title: "SKIN CARE",
      image: "/tulsi2.png", 
      buttonText: "Shop Now",
      className: "",
      bgColor: "bg-[var(--brand-green-100)]",
      overlay: "from-green-100/40 to-green-200/40"
    },
    {
      id: 4,
      title: "PERSONAL CARE",
      image: "/facewash2.png",
      buttonText: "Shop Now", 
      className: "",
      bgColor: "bg-[var(--brand-green-100)]",
      overlay: "from-green-100/40 to-green-200/40"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-white via-green-50/30 to-blue-50/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
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
          {collections.map((collection, index) => (
            <MotionDiv
              key={collection.id}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 60,
                  scale: 0.9
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  transition: { 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }
              }}
              className={`group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer ${collection.className} ${collection.bgColor}`}
              style={{ minHeight: collection.className.includes('row-span-2') ? '600px' : collection.className.includes('col-span-2') ? '300px' : '280px' }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <MotionDiv
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img 
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                </MotionDiv>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.overlay} group-hover:opacity-90 transition-opacity duration-500`} />
              </div>

              {/* Floating Elements */}
              <MotionDiv
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
                className="absolute top-4 right-4 opacity-30 group-hover:opacity-50 transition-opacity"
              >
                <Heart className="w-6 h-6 text-green-600" />
              </MotionDiv>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                {/* Title Section */}
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  {collection.featured && (
                    <MotionDiv
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="mb-4"
                    >
                      <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-green-700 shadow-lg">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Featured Collection
                      </span>
                    </MotionDiv>
                  )}
                  
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                  >
                    <h3 className={`font-bold text-gray-800 mb-2 leading-tight ${
                      collection.featured 
                        ? 'text-3xl md:text-4xl' 
                        : collection.className.includes('row-span-2') 
                          ? 'text-2xl md:text-3xl' 
                          : 'text-xl md:text-2xl'
                    }`}>
                      {collection.title}
                    </h3>
                  </MotionDiv>

                  {collection.featured && (
                    <MotionDiv
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="max-w-md mx-auto"
                    >
                      <p className="text-gray-600 leading-relaxed">
                        Discover our premium range of natural skincare products crafted with pure ingredients
                      </p>
                    </MotionDiv>
                  )}
                </div>

                {/* Button */}
                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  className="self-center"
                >
                  <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group/btn"
                  >
                    <Link href="/shop">
                    <button className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group-hover:border-green-200">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {collection.buttonText}
                      <MotionDiv
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="ml-2"
                        >
                        <ArrowRight className="w-4 h-4" />
                      </MotionDiv>
                    </button>
                        </Link>
                  </MotionDiv>
                </MotionDiv>
              </div>

              {/* Hover Effects */}
              <MotionDiv
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-green-600/10 via-transparent to-transparent pointer-events-none"
              />

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Bottom CTA */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <MotionDiv
            whileHover={{ scale: 1.02 }}
            className="inline-block"
          >
            <Link href="/shop">
            <button className="bg-gradient-to-r from-[var(--brand-green)] to-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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

import { Product } from './types/product';

const getUnsplashUrl = (id: string, w = 400, h = 500) => `https://source.unsplash.com/${id}/${w}x${h}`;

const recentDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

export const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Organic Basmati Rice (5kg)',
    slug: 'organic-basmati-rice',
    description: "Aged to perfection, our long-grain Organic Basmati Rice offers a delightful aroma and fluffy texture. Ideal for biryanis, pulao, and everyday meals.",
    price: 350,
    sale_price: 299,
    images: ["/prod11.png", "/prod12.png", "/prod13.png"],
    category: 'Food Product',
    sub_category: 'Rice',
    brand: 'VedaPure',
    tags: ['Sale', 'Organic'],
    averageRating: 4.8,
    numReviews: 120,
    stock_quantity: 50,
    createdAt: recentDate(30),
    updatedAt: recentDate(5),
  },
  {
    _id: '3',
    name: 'Natural Turmeric Powder',
    slug: 'natural-turmeric-powder',
    description: "Sourced from the best organic farms, our turmeric powder is rich in curcumin and has a vibrant color and earthy flavor.",
    price: 120,
    images: ["/prod51.jpg", "/prod52.jpg"],
    category: 'Food Product',
    sub_category: 'Spices',
    brand: 'VedaPure',
    tags: ['Organic', 'Best Seller'],
    averageRating: 4.7,
    numReviews: 88,
    stock_quantity: 200,
    createdAt: recentDate(15),
    updatedAt: recentDate(2),
  },
  {
    _id: '5',
    name: 'Punjab Longest Basmati Rice (5kg)',
    slug: 'punjab-basmati-rice',
    description: "Experience the authentic taste of Punjab with these extra-long grains. Perfect for special occasions and creating memorable dishes.",
    price: 380,
    sale_price: 349,
    images: ["/prod22.png", "/prod23.png", "/prod24.png"],
    category: 'Food Product',
    sub_category: 'Rice',
    brand: 'VedaPure',
    tags: ['Sale'],
    averageRating: 4.6,
    numReviews: 95,
    stock_quantity: 50,
    createdAt: recentDate(30),
    updatedAt: recentDate(5),
  },

  // === Personal Care Category ===
  {
    _id: '2',
    name: 'Ayurvedic Herbal Shampoo',
    slug: 'ayurvedic-herbal-shampoo',
    description: "A gentle, sulfate-free formula infused with Amla, Reetha, and Shikakai to cleanse, strengthen, and promote natural shine.",
    price: 450,
    images: ["/prod41.png"],
    category: 'Personal Care',
    sub_category: 'Hair Care',
    brand: 'AyurEssence',
    tags: ['New', 'Best Seller'],
    averageRating: 4.9,
    numReviews: 250,
    stock_quantity: 100,
    createdAt: recentDate(45),
    updatedAt: recentDate(10),
  },
  {
    _id: '4',
    name: 'Herbal Neem Handwash',
    slug: 'herbal-neem-handwash',
    description: "Its natural antibacterial properties cleanse effectively without drying your skin, leaving a fresh, mild fragrance.",
    price: 180,
    sale_price: 149,
    images: ["/prod31.png"],
    category: 'Personal Care',
    sub_category: 'Hand Care',
    brand: 'AyurEssence',
    tags: ['Sale'],
    averageRating: 4.8,
    numReviews: 150,
    stock_quantity: 75,
    createdAt: recentDate(60),
    updatedAt: recentDate(12),
  },
  {
    _id: '7',
    name: 'Aloe Vera & Mint Body Gel',
    slug: 'aloe-vera-mint-body-gel',
    description: "A cooling and hydrating body gel that soothes the skin, leaving it refreshed and non-sticky. Perfect for after-sun care.",
    price: 320,
    images: ["/bodygel11.png", "/bodygel12.png"],
    category: 'Personal Care',
    sub_category: 'Body Care',
    brand: 'AyurEssence',
    tags: ['New', 'Organic'],
    averageRating: 4.7,
    numReviews: 78,
    stock_quantity: 90,
    createdAt: recentDate(25),
    updatedAt: recentDate(3),
  },
  {
    _id: '8',
    name: 'Hibiscus Hair Conditioner',
    slug: 'hibiscus-hair-conditioner',
    description: "A nourishing conditioner with hibiscus and bhringraj extracts to reduce frizz, detangle, and add a natural bounce to your hair.",
    price: 480,
    images: ["/conditioner.png"],
    category: 'Personal Care',
    sub_category: 'Hair Care',
    brand: 'AyurEssence',
    tags: [],
    averageRating: 4.8,
    numReviews: 112,
    stock_quantity: 60,
    createdAt: recentDate(55),
    updatedAt: recentDate(15),
  },
  
  // === Skin Care Category ===
  {
    _id: '9',
    name: 'Vitamin C Brightening Facewash',
    slug: 'vitamin-c-facewash',
    description: "Gently cleanses and brightens the skin. Our Vitamin C facewash helps reduce dark spots and adds a natural glow.",
    price: 399,
    sale_price: 349,
    images: ["/facewash1.png", "/facewash2.png"],
    category: 'Skin Care',
    sub_category: 'Face Care',
    brand: 'VedaPure',
    tags: ['Sale', 'Best Seller'],
    averageRating: 4.9,
    numReviews: 310,
    stock_quantity: 85,
    createdAt: recentDate(40),
    updatedAt: recentDate(8),
  },
  {
    _id: '10',
    name: 'Saffron Glow Fairness Cream',
    slug: 'saffron-glow-fairness-cream',
    description: "A light, non-greasy day cream with saffron and turmeric extracts to even out skin tone and provide a radiant glow.",
    price: 550,
    images: ["/fairness1.png","/fairness2.png","/fairness3.png"],
    category: 'Skin Care',
    sub_category: 'Face Care',
    brand: 'AyurEssence',
    tags: ['New'],
    averageRating: 4.6,
    numReviews: 180,
    stock_quantity: 70,
    createdAt: recentDate(35),
    updatedAt: recentDate(7),
  },
  {
    _id: '11',
    name: 'Rose Water & Aloe Vera Toner',
    slug: 'rose-water-aloe-toner',
    description: "A refreshing facial toner that hydrates and minimizes pores, preparing your skin for moisturization. 100% natural.",
    price: 250,
    images: ["/tulsi1.png","/tulsi2.png","/tulsi3.png"],
    category: 'Skin Care',
    sub_category: 'Face Care',
    brand: 'VedaPure',
    tags: ['Organic'],
    averageRating: 4.8,
    numReviews: 220,
    stock_quantity: 150,
    createdAt: recentDate(50),
    updatedAt: recentDate(11),
  },

  // === Wellness Category ===
  {
    _id: '6',
    name: 'Immunity Booster Herbal Tea',
    slug: 'immunity-booster-herbal-tea',
    description: "Strengthen your body's defenses with our special blend of Ayurvedic herbs. A soothing and aromatic tea for daily wellness.",
    price: 280,
    images: ["/tea.jpg", "/tea.jpg"],
    category: 'Wellness',
    sub_category: 'Herbal Teas',
    brand: 'AyurEssence',
    tags: ['New', 'Organic'],
    averageRating: 4.9,
    numReviews: 95,
    stock_quantity: 110,
    createdAt: recentDate(10),
    updatedAt: recentDate(1),
  },
  {
    _id: '12',
    name: 'Panch Tulsi Amrit Drops',
    slug: 'panch-tulsi-amrit-drops',
    description: "A potent blend of five rare tulsi species. Just a few drops in water helps boost immunity and fight common colds.",
    price: 199,
    images: ["/tulsi1.png","/tulsi2.png","/tulsi3.png"],
    category: 'Wellness',
    sub_category: 'Supplements',
    brand: 'VedaPure',
    tags: ['Best Seller'],
    averageRating: 4.9,
    numReviews: 450,
    stock_quantity: 300,
    createdAt: recentDate(28),
    updatedAt: recentDate(4),
  },
  {
    _id: '13',
    name: 'Ashwagandha Stress Relief Capsules',
    slug: 'ashwagandha-stress-relief',
    description: "Made with pure Ashwagandha root extract, these capsules help manage stress and anxiety, promoting calmness and well-being.",
    price: 600,
    sale_price: 549,
    images: ["/ashwagandha.jpg"],
    category: 'Wellness',
    sub_category: 'Supplements',
    brand: 'AyurEssence',
    tags: ['Sale'],
    averageRating: 4.7,
    numReviews: 130,
    stock_quantity: 65,
    createdAt: recentDate(70),
    updatedAt: recentDate(18),
  }
];


interface ProductFilter {
  limit?: number;
  category?: string;
  tags?: string; // We'll use this for 'Trending' or 'Sale' etc.
}

/**
 * Simulates fetching products from an API based on filters.
 * @param filter - The filter criteria (e.g., limit, category, tags).
 * @returns A promise that resolves to a filtered list of products.
 */
export const getProducts = (filter: ProductFilter = {}): Promise<Product[]> => {
  return new Promise((resolve) => {
    let products = [...mockProducts];

    // Filter by category if provided
    if (filter.category) {
      products = products.filter(p => p.category === filter.category);
    }

    // NEW: Filter by tags if provided
    if (filter.tags) {
      products = products.filter(p => p.tags?.includes(filter.tags as any));
    }
    
    // Limit the number of results if provided
    if (filter.limit) {
      products = products.slice(0, filter.limit);
    }

    // Simulate network delay to show loading states
    setTimeout(() => {
      resolve(products);
    }, 800);
  });
};
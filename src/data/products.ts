export interface Variant {
  id: string;
  type: 'size' | 'color' | 'pack';
  label: string;
  value: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  colorHex?: string;
  isPopular?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  type: 'prepaid' | 'cart' | 'bank';
  discountText: string;
  minOrder?: number;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface BundleItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  selected: boolean;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  location: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  helpfulCount: number;
  variantPurchased?: string;
  verified: boolean;
  avatarColor: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPct: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  category: string;
  image: string;
  description: string;
  isFlashDeal?: boolean;
  isBestseller?: boolean;
  
  // New PDP Extended Data
  gallery?: string[];
  variants?: {
    sizes?: Variant[];
    colors?: Variant[];
    packs?: Variant[];
  };
  offers?: Offer[];
  features?: Feature[];
  specifications?: Record<string, string>;
  bundleItems?: BundleItem[];
  faqs?: { question: string; answer: string }[];
  reviews?: Review[];
}
export interface Category {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  bgClass: string;
  textClass: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'tools',
    name: 'Kitchen Tools',
    subtitle: 'Choppers & Whisks',
    icon: 'soup_kitchen',
    bgClass: 'bg-primary-fixed',
    textClass: 'text-primary',
  },
  {
    id: 'cookware',
    name: 'Cookware',
    subtitle: 'Tri-ply & Tawas',
    icon: 'skillet',
    bgClass: 'bg-surface-container',
    textClass: 'text-primary',
  },
  {
    id: 'storage',
    name: 'Storage & Jars',
    subtitle: 'Borosilicate & Dabbas',
    icon: 'inventory_2',
    bgClass: 'bg-secondary-fixed',
    textClass: 'text-secondary',
  },
  {
    id: 'baking',
    name: 'Baking & Moulds',
    subtitle: 'Silicone & Whisks',
    icon: 'cake',
    bgClass: 'bg-tertiary-fixed',
    textClass: 'text-tertiary',
  },
  {
    id: 'cleaning',
    name: 'Cleaning & Racks',
    subtitle: 'Sink Trays & Brushes',
    icon: 'cleaning_services',
    bgClass: 'bg-surface-container-high',
    textClass: 'text-on-secondary-fixed-variant',
  },
  {
    id: 'organizers',
    name: 'Organizers',
    subtitle: 'Trays & Racks',
    icon: 'grid_view',
    bgClass: 'bg-surface-container',
    textClass: 'text-on-surface',
  },
  {
    id: 'serveware',
    name: 'Serveware',
    subtitle: 'Brass & Steel',
    icon: 'flatware',
    bgClass: 'bg-primary-fixed',
    textClass: 'text-primary-container',
  },
  {
    id: 'appliances',
    name: 'Appliances',
    subtitle: 'Blenders & Frothers',
    icon: 'blender',
    bgClass: 'bg-secondary-fixed-dim',
    textClass: 'text-secondary',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Vegetable Chopper XL with SS 304 Blade',
    price: 499,
    originalPrice: 999,
    discountPct: 50,
    rating: 4.8,
    reviewsCount: 3892,
    badge: 'Cuts Prep In Half',
    category: 'tools',
    image: '/images/products/prod-1.webp',
    description: 'Heavy duty food grade stainless steel vegetable chopper with push lever and clear container. Effortless tear-free onion & veggie chopping.',
    isFlashDeal: true,
    isBestseller: true,
    gallery: [
      '/images/products/prod-1.webp', // main image
      '/images/products/prod-1-1.webp', // mock additional images
      '/images/products/prod-1-2.webp',
      '/images/products/prod-1-3.webp',
      '/images/products/prod-1-4.webp',
    ],
    variants: {
      sizes: [
        { id: 'v-s1', type: 'size', label: '500 ml', value: '500ml', price: 349, inStock: true },
        { id: 'v-s2', type: 'size', label: '900 ml XL', value: '900ml', price: 499, inStock: true, isPopular: true },
        { id: 'v-s3', type: 'size', label: '1200 ml', value: '1200ml', price: 649, inStock: true },
      ],
      colors: [
        { id: 'v-c1', type: 'color', label: 'Brushed Steel', value: 'Brushed Steel & Onyx', price: 499, inStock: true, colorHex: 'bg-slate-700' },
        { id: 'v-c2', type: 'color', label: 'Terracotta', value: 'Terracotta Orange', price: 499, inStock: true, colorHex: 'bg-[#9b2f00]' },
        { id: 'v-c3', type: 'color', label: 'Sage', value: 'Sage Forest', price: 499, inStock: true, colorHex: 'bg-[#2c694e]' },
      ],
      packs: [
        { id: 'v-p1', type: 'pack', label: 'Single Unit', value: '1x', price: 499, inStock: true },
        { id: 'v-p2', type: 'pack', label: 'Twin Pack of 2', value: '2x', price: 899, originalPrice: 998, inStock: true },
      ]
    },
    offers: [
      { id: 'o1', title: 'Extra 5% OFF', subtitle: 'Prepaid UPI & Cards', code: 'KITCHORA5', type: 'prepaid', discountText: 'Instant cart discount' },
      { id: 'o2', title: '₹100 Instant OFF', subtitle: 'On orders above ₹999', code: 'PREP100', type: 'cart', discountText: 'Add items worth ₹500', minOrder: 999 },
      { id: 'o3', title: 'Bank Cashback', subtitle: '10% off up to ₹150 HDFC', code: 'HDFC10', type: 'bank', discountText: 'Instant Check' },
    ],
    features: [
      { icon: 'carpenter', title: '4X Razor-Sharp SS 304 Blades', description: 'Rust-proof surgical-grade multi-level Japanese bevel ensures even cuts from bottom to top without clogging.' },
      { icon: 'motion_sensor_active', title: 'Anti-Skid Silicone Ring Base', description: 'High-traction circular foot ring locks rigidly to polished Indian marble, granite, and wet tile countertops.' },
      { icon: 'shield', title: '900ml Unbreakable Polycarbonate', description: '100% Virgin BPA-Free polymer drop-tested from 1.2 meters without cracking, crazing, or odor retention.' },
      { icon: 'fitness_center', title: 'Japanese High-Tension Cord', description: 'Braided aerospace nylon cord with frictionless recoil mechanism certified for over 10,000 continuous pulls.' },
      { icon: 'visibility_off', title: 'Tear-Free Onion & Chilli Prep', description: 'Airtight twist-lock rim prevents capsaicin and sulfur vapors from escaping, protecting sensitive eyes and fingers.' },
      { icon: 'clean_hands', title: '3-Part Quick Rinse Cleaning', description: 'Bowl, blade spindle, and splash lid disassemble in one click. Clean residue under running tap water in under 30 seconds.' },
    ],
    specifications: {
      'Brand': 'Kitchora',
      'Model': 'XL Chop-Master 900',
      'Blade Material': 'SS 304 Food Grade Stainless Steel',
      'Container Material': '100% Virgin BPA-Free Polycarbonate',
      'Blade Configuration': '4-Wing Quad Multi-Level Curved',
      'Capacity': '900 ml (XL Family Volume)',
      'Dimensions': '13.5 cm × 13.5 cm × 14.8 cm',
      'Net Weight': '340 grams (Heavy Duty)',
      'Dishwasher Safe': 'Bowl & Blades (Lid: Damp Cloth Wipe)',
      'Country of Origin': 'Proudly Made in India'
    },
    bundleItems: [
      { id: 'prod-2', name: 'Silicone Spatula 6-Pc Set', price: 249, originalPrice: 399, image: '/images/products/prod-2.webp', selected: true },
      { id: 'prod-11', name: 'Airtight Masala Dabba SS 304', price: 549, originalPrice: 899, image: '/images/products/prod-11.webp', selected: true },
    ],
    faqs: [
      { question: 'Can it crush ice cubes and hard dry fruits?', answer: 'Yes! The 4-tier SS 304 blades are specifically heat-treated to crush standard household ice cubes for slushies, mocktails, and hard nuts like almonds, cashews, and walnuts without chipping.' },
      { question: 'Are replacement blades and bowls available if damaged?', answer: 'Yes, Kitchora maintains a dedicated Spare Parts Program. You can order replacement SS 304 blade spindles, pull cord lids, and silicone seal rings directly from our website under the \'Care & Spares\' tab.' },
      { question: 'Can I put the pull-cord lid into the dishwasher?', answer: 'The polycarbonate transparent bowl and stainless steel blades are 100% dishwasher safe. However, for the top pull-cord lid, we recommend wiping it with a damp sponge or quick water rinse without submerging, to maintain tension in the internal recoil spring.' }
    ],
    reviews: [
      { id: 'r1', author: 'Ananya Raghunathan', initials: 'AR', location: 'Bengaluru', date: '12 Sep 2026', rating: 5, title: 'Morning sabzi prep time cut in half!', content: 'I pack tiffin for 3 kids every morning at 6:30 AM. Chopping 4 big onions, capsicum, and cabbage used to be exhausting. With this 900ml chopper, it takes literally 6 gentle pulls and the dice is restaurant-uniform. The silicon base doesn\'t move an inch on my granite counter. Highly recommended!', helpfulCount: 142, variantPurchased: '900ml XL', verified: true, avatarColor: 'bg-primary-fixed text-on-primary-fixed' },
      { id: 'r2', author: 'Vikramjit Khanna', initials: 'VK', location: 'Chandigarh', date: '04 Sep 2026', rating: 5, title: 'Survives almonds and dry fruit crushing like a champ', content: 'Most plastic choppers snap when you drop hard badam or kaju into them. The 4X SS 304 blades here have a heavy gauge thickness. I crushed almonds for kheer in 10 pulls and there wasn\'t a single scratch on the blade edge. Polycarbonate body feels very sturdy.', helpfulCount: 89, variantPurchased: '900ml XL', verified: true, avatarColor: 'bg-secondary-container text-on-secondary-container' },
      { id: 'r3', author: 'Pooja Mukherjee', initials: 'PM', location: 'Kolkata', date: '28 Aug 2026', rating: 4, title: 'Gifted one to my mother, she loves it', content: 'Bought the pack of 2 during the sale. My mom has mild arthritis and electric food processors are too heavy for her to lift and wash daily. She can pull this lightweight cord with zero strain. Super easy to wash under the sink.', helpfulCount: 56, variantPurchased: 'Twin Pack', verified: true, avatarColor: 'bg-primary-fixed text-on-primary-fixed' },
    ]
  },
  {
    id: 'prod-2',
    name: 'Non-Stick Food Grade Silicone Spatula Set (6 Pcs)',
    price: 299,
    originalPrice: 599,
    discountPct: 50,
    rating: 4.7,
    reviewsCount: 1240,
    badge: 'Heat Proof 250°C',
    category: 'tools',
    image: '/images/products/prod-2.webp',
    description: 'Seamless, scratch-free silicone spatula set designed for non-stick cookware. Heat resistant up to 250°C.',
    isFlashDeal: true,
    isBestseller: true,
  },
  {
    id: 'prod-3',
    name: 'Airtight Spice & Dal Container Set of 6 (1100ml)',
    price: 649,
    originalPrice: 1199,
    discountPct: 46,
    rating: 4.9,
    reviewsCount: 4110,
    badge: '100% Leak Proof',
    category: 'storage',
    image: '/images/products/prod-3.webp',
    description: 'Stackable clear modular airtight food storage containers with hermetic locks. Keeps pulses, rice & snacks pest-free.',
    isFlashDeal: true,
    isBestseller: true,
  },
  {
    id: 'prod-4',
    name: 'Stainless Steel Y-Peeler & Julienne Double Blade',
    price: 149,
    originalPrice: 299,
    discountPct: 50,
    rating: 4.6,
    reviewsCount: 890,
    badge: 'Ultra Sharp SS',
    category: 'tools',
    image: '/images/products/prod-4.webp',
    description: 'Ergonomic heavy duty stainless steel Y-peeler for smooth potato and carrot skin peeling and fine julienne cuts.',
    isFlashDeal: false,
    isBestseller: true,
  },
  {
    id: 'prod-5',
    name: 'Kitchen Measuring Cups & Spoons Nesting Set (8 Pcs)',
    price: 199,
    originalPrice: 399,
    discountPct: 50,
    rating: 4.8,
    reviewsCount: 1520,
    badge: 'BPA-Free Steel',
    category: 'baking',
    image: '/images/products/prod-5.webp',
    description: 'Nesting stainless steel measuring cup & spoon set with laser etched ml measurements for perfect baking ratios.',
    isFlashDeal: false,
    isBestseller: true,
  },
  {
    id: 'prod-6',
    name: 'Multipurpose Stainless Grater with Spill Catcher Box',
    price: 329,
    originalPrice: 649,
    discountPct: 49,
    rating: 4.7,
    reviewsCount: 980,
    badge: '4 Blade Options',
    category: 'tools',
    image: '/images/products/prod-6.webp',
    description: '4-side stainless steel box grater featuring fitted transparent collection box for mess-free ginger, cheese & veggie grating.',
    isFlashDeal: false,
    isBestseller: true,
  },
  {
    id: 'prod-7',
    name: 'Continuous Micro-Mist Cooking Oil Spray Bottle 200ml',
    price: 229,
    originalPrice: 499,
    discountPct: 54,
    rating: 4.5,
    reviewsCount: 2430,
    badge: '70% Less Oil',
    category: 'tools',
    image: '/images/products/prod-7.webp',
    description: 'Fine mist spray bottle for air fryers, tawas and salads. Dispenses uniform micro-droplets reducing oil consumption by up to 70%.',
    isFlashDeal: false,
    isBestseller: true,
  },
  {
    id: 'prod-8',
    name: 'Expandable Bamboo Cutlery & Masala Drawer Organizer',
    price: 799,
    originalPrice: 1499,
    discountPct: 47,
    rating: 4.9,
    reviewsCount: 1810,
    badge: 'Universal Fit',
    category: 'organizers',
    image: '/images/products/prod-8.webp',
    description: 'Natural expandable bamboo organizer designed to fit all standard kitchen drawers cleanly for spoons, spatulas and spice packets.',
    isFlashDeal: false,
    isBestseller: true,
  },
  {
    id: 'prod-9',
    name: 'Heavy Tri-Ply Stainless Steel Tadka Pan 12cm',
    price: 399,
    originalPrice: 699,
    discountPct: 40,
    rating: 4.8,
    reviewsCount: 840,
    badge: 'Even Heat Induction',
    category: 'cookware',
    image: '/images/products/prod-9.webp',
    description: '3-layer aluminum core stainless steel tadka pan with cool-touch wooden handle for tempering mustard, spices and curry leaves.',
    isFlashDeal: true,
    isBestseller: false,
  },
  {
    id: 'prod-10',
    name: 'Airtight Glass Spice Jar Carousel (16 Jars)',
    price: 699,
    originalPrice: 1299,
    discountPct: 45,
    rating: 4.9,
    reviewsCount: 2150,
    badge: 'Moisture-Free Seal',
    category: 'storage',
    image: '/images/products/prod-10.webp',
    description: '360° smooth revolving spice rack tower with 16 borosilicate glass seasoning bottles for turmeric, cumin, chili and spices.',
    isFlashDeal: true,
    isBestseller: false,
  },
  {
    id: 'prod-11',
    name: 'SS 304 See-Through Masala Dabba (7 Containers)',
    price: 549,
    originalPrice: 999,
    discountPct: 45,
    rating: 4.8,
    reviewsCount: 1920,
    badge: '7 Compartments',
    category: 'storage',
    image: '/images/products/prod-11.webp',
    description: 'Classic Indian spice box with clear acrylic lid, 7 removable stainless steel bowls & small spice spoon for everyday cooking.',
    isFlashDeal: false,
    isBestseller: true,
  },
  {
    id: 'prod-12',
    name: '5kg Airtight Atta Dispenser Container',
    price: 620,
    originalPrice: 999,
    discountPct: 38,
    rating: 4.9,
    reviewsCount: 2840,
    badge: 'Pest Proof',
    category: 'storage',
    image: '/images/products/prod-12.webp',
    description: 'Heavy duty food-grade flour & rice canister with measuring cup and transparent window for easy stock monitoring.',
    isFlashDeal: false,
    isBestseller: false,
  },
];

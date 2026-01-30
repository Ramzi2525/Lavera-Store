export const PRODUCTS = [
  {
    id: "kettle-9093",
    name: "Arc Kettle 9093",
    brand: "Studio Living",
    price: 129,
    compareAt: 159,
    tags: ["Iconic", "Induction"],
    category: "Tea & Coffee",
    subcategory: "Kettles",
    color: "Steel",
    material: "Stainless Steel",
    images: [
      // صورة إبريق شاي/غلاية بزوايا مختلفة
      "images/1.jpg",
      "images/3.jpg"
    ],
    description:
      "A sculptural kettle with precision pour and a balanced handle. Designed for daily use and display-worthy presence.",
    features: ["Induction-ready base", "Heat-safe handle", "Balanced pour spout", "Gift-ready packaging"],
  },
  {
    id: "coffee-pulcina",
    name: "Pulcina Coffee Maker",
    brand: "Studio Living",
    price: 89,
    compareAt: 100,
    tags: ["Bestseller"],
    category: "Tea & Coffee",
    subcategory: "Coffee Makers",
    color: "Black",
    material: "Aluminum",
    images: [
      // ماكينة قهوة حقيقية
      "images/2.jpg",
      "images/6.jpg"
    ],
    description:
      "Brew rich, aromatic coffee with a modern silhouette. Built to last, styled to belong on any counter.",
    features: ["Clean extraction profile", "Easy to rinse", "Compact footprint"],
  },
  {
    id: "tray-linear",
    name: "Linear Serving Tray",
    brand: "Studio Living",
    price: 59,
    compareAt: 70,
    tags: ["New"],
    category: "Tableware",
    subcategory: "Serving Trays",
    color: "Sand",
    material: "Anodized Aluminum",
    images: [
      // صينية تقديم أنيقة
      "images/4.jpg"
    ],
    description: "Minimal tray with soft corners and a matte finish. Great for serving or styling.",
    features: ["Scratch-resistant finish", "Lightweight", "Easy to wipe clean"],
  },
  {
    id: "corkscrew-orbit",
    name: "Orbit Corkscrew",
    brand: "Studio Living",
    price: 34,
    compareAt: 50,
    tags: ["Giftable"],
    category: "Barware & Wine Accessories",
    subcategory: "Bottle openers & Corkscrews",
    color: "Graphite",
    material: "Zinc Alloy",
    images: [
      // فتاحة زجاجات
      "images/5.jpg"
    ],
    description: "A compact corkscrew with a satisfying grip and smooth action.",
    features: ["Double-hinge leverage", "Pocket friendly", "Premium feel"],
  },
  {
    id: "diffuser-ember",
    name: "Ember Home Diffuser",
    brand: "Studio Living",
    price: 45,
    compareAt: 60,
    tags: ["Calm"],
    category: "Homeware",
    subcategory: "Home Fragrance & Diffusers",
    color: "Amber",
    material: "Glass",
    images: [
      // موزع عطر منزلي
      "images/8.jpg"
    ],
    description: "Warm notes and a clean design—soft ambience for your space.",
    features: ["Long-lasting scent", "Elegant glass bottle", "Refillable"],
  },
  {
    id: "office-clipset",
    name: "Desk Clip Set",
    brand: "Studio Living",
    price: 18,
    compareAt: 35,
    tags: ["Under 25"],
    category: "People & Lifestyle",
    subcategory: "Office Accessories",
    color: "Brass",
    material: "Metal",
    images: [
      // مجموعة مشابك مكتب
      "images/9.jpg"
    ],
    description: "Tiny details that elevate your desk. Crisp, minimal, and durable.",
    features: ["Pack of 6", "Strong grip", "Brushed finish"],
  },
];



// Navigation taxonomy (Mega menu)
export const NAV = {
  "Tea & Coffee": ["Kettles", "Coffee Makers", "Cups and Mugs", "Tea & coffee accessories"],
  Tableware: ["Table accessories", "Cutlery", "Plates & Bowls", "Drinking Glasses", "Baskets & Fruit Bowls", "Serving Trays", "Spice & Condiment Tools"],
  "Kitchen Accessories": ["Cookware & Pan Sets", "Kitchen Storage & Food Boxes", "Kitchen Tools", "Kitchen Appliances"],
  "Barware & Wine Accessories": ["Bar Accessories", "Bottle openers & Corkscrews", "Pitchers & Decanters", "Ice Buckets & Coolers"],
  Homeware: ["Home Decor & Furniture", "Christmas Decorations & Baubles", "Bathroom Accessories", "Home Fragrance & Diffusers"],
  "People & Lifestyle": ["Office Accessories", "Pet Accessories & Bowls", "On The Go Travel Accessories", "Jewelry", "Limited Editions"],
};


export const COLLECTIONS = [
  {
    category: "Tea & Coffee",
    subtitle: "Kettles, brewers, mugs",
    image: "https://picsum.photos/seed/hero1/1200/600"
  },
  {
    category: "Tableware",
    subtitle: "Trays, cutlery, serving pieces",
    image: "https://picsum.photos/seed/hero2/1200/600"
  },
  {
    category: "Kitchen Accessories",
    subtitle: "Tools and appliances",
    image: "https://picsum.photos/seed/hero3/1200/600"
  },
  {
    category: "Barware & Wine Accessories",
    subtitle: "Openers, decanters",
    image: "https://picsum.photos/seed/hero4/1200/600"
  },
  {
    category: "Homeware",
    subtitle: "Decor & fragrance",
    image: "https://picsum.photos/seed/hero5/1200/600"
  },
  {
    category: "People & Lifestyle",
    subtitle: "Office, travel, limited",
    image: "https://picsum.photos/seed/hero6/1200/600"
  },
];
























// === بيانات التقييمات والمراجعات ===
export const REVIEWS = [
  { 
    id: "rev-1", 
    productId: "Kettle-9093", 
    userName: "John D.", 
    userAvatar: "👤",
    rating: 5, 
    comment: "Amazing design! The precision pour spout is perfect for my morning tea ritual.", 
    date: "2024-01-15",
    verified: true
  },
  { 
    id: "rev-2", 
    productId: "Kettle-9093", 
    userName: "Sarah M.", 
    userAvatar: "👩‍💼",
    rating: 4, 
    comment: "Beautiful kettle, heats water quickly. The handle stays cool which is a plus.", 
    date: "2024-02-20",
    verified: true
  },
  // ... أضف بقية المراجعات كما في الكود السابق
];

// === دالّات مساعدة للتقييمات ===
export function getProductReviews(productId) {
  return REVIEWS.filter(review => review.productId === productId);
}

export function getAverageRating(productId) {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return sum / reviews.length;
}

// === بيانات الفلاتر المتقدمة ===
export const FILTER_OPTIONS = {
  colors: ["Steel", "Black", "Sand", "Graphite", "Amber", "Brass", "White", "Copper"],
  materials: ["Stainless Steel", "Aluminum", "Anodized Aluminum", "Zinc Alloy", "Glass", "Metal", "Ceramic", "Wood"],
  priceRanges: [
    { label: "Under $25", min: 0, max: 25 },
    { label: "$25 - $50", min: 25, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "Over $200", min: 200, max: 1000 }
  ],
  tags: ["Iconic", "Induction", "Bestseller", "New", "Giftable", "Calm", "Under 25", "Limited", "Sustainable", "Premium"]
};

// === بيانات FAQ ===
export const FAQ = [
  {
    question: "What is your shipping policy?",
    answer: "We offer free shipping on orders over $180. Most orders ship within 1-2 business days and arrive within 3-7 days domestically."
  },
  // ... أضف بقية الأسئلة
];

// === بيانات المنتجات المقترحة ===
export const RECOMMENDATIONS = {
  "Kettle-9093": ["Coffee-pulcina", "tray-linear", "diffuser-ember"],
  "Coffee-pulcina": ["Kettle-9093", "office-clipset", "corkscrew-orbit"],
  // ... أضف بقية التوصيات
};

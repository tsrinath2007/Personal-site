export interface ProductVariant {
  id: string;
  name: string; // e.g., "Oatmeal Speckle", "Terracotta Wash"
  priceModifier: number;
  stock: number;
}

export interface ProductOption {
  name: string; // e.g., "Color", "Size"
  values: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
  collection: string;
  image: string;
  hoverImage: string;
  images: string[];
  description: string;
  details: string;
  materials: string;
  dimensions: string;
  care: string;
  storyTitle: string;
  storyDesc: string;
  storyImage: string;
  options: ProductOption[];
  variants: ProductVariant[];
  reviews: Review[];
  pairWith: string[]; // Slugs of products to cross-sell
}

export interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
  moodEmoji: string;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "slow-mornings",
    name: "Slow Mornings",
    description: "Designed for peaceful breakfast rituals and your first quiet cup.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop",
    moodEmoji: "☕",
  },
  {
    slug: "dinner-at-home",
    name: "Dinner Table",
    description: "Elevate your evening dining with earthy plates and tactile bowls.",
    image: "https://images.unsplash.com/photo-1535401991746-da3d9055713e?q=80&w=800&auto=format&fit=crop",
    moodEmoji: "🍽",
  },
  {
    slug: "table-stories",
    name: "Table Stories",
    description: "Ceramics made to be passed around, sharing food and laughter.",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
    moodEmoji: "🌿",
  },
  {
    slug: "objects-for-home",
    name: "Home Objects",
    description: "Sculptural clay vases and accents that capture light and shade.",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop",
    moodEmoji: "🎁",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod_1",
    slug: "morning-mug",
    name: "Morning Mug",
    price: 699,
    rating: 4.9,
    reviewCount: 128,
    category: "mugs",
    collection: "slow-mornings",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Hand-shaped stoneware · 320ml",
    details: "Individually thrown on the potter's wheel, this mug features a raw clay base and subtle thumb rest, shaped perfectly to wrap your hands around.",
    materials: "High-fire stoneware clay with mineral oatmeal glaze.",
    dimensions: "9cm height x 8cm diameter, holds 320ml.",
    care: "Dishwasher and microwave safe. Handwash recommended for glaze durability.",
    storyTitle: "MEET THE MORNING MUG",
    storyDesc: "A quiet companion for your first coffee of the day, finished in earthy oat tones.",
    storyImage: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop",
    options: [
      { name: "Color", values: ["Speckled Oat", "Slate Clay", "Satin White"] },
      { name: "Size", values: ["Standard (320ml)", "Tall (450ml)"] }
    ],
    variants: [
      { id: "var_1a", name: "Speckled Oat / Standard", priceModifier: 0, stock: 15 },
      { id: "var_1b", name: "Speckled Oat / Tall", priceModifier: 150, stock: 8 },
      { id: "var_1c", name: "Slate Clay / Standard", priceModifier: 0, stock: 12 },
      { id: "var_1d", name: "Slate Clay / Tall", priceModifier: 150, stock: 5 },
      { id: "var_1e", name: "Satin White / Standard", priceModifier: 0, stock: 20 },
      { id: "var_1f", name: "Satin White / Tall", priceModifier: 150, stock: 0 }
    ],
    reviews: [
      { id: "rev_1a", author: "Ananya M.", rating: 5, date: "May 12, 2026", comment: "Beautifully made and even better in person. The glaze is spectacular.", verified: true },
      { id: "rev_1b", author: "Kabir S.", rating: 5, date: "April 28, 2026", comment: "A gorgeous addition to my morning ritual. Feels solid and heavy in the best way.", verified: true }
    ],
    pairWith: ["pour-over", "salad-plate"]
  },
  {
    id: "prod_2",
    slug: "salad-plate",
    name: "Aaru Salad Plate",
    price: 899,
    rating: 4.8,
    reviewCount: 94,
    category: "plates",
    collection: "dinner-at-home",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1535401991746-da3d9055713e?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535401991746-da3d9055713e?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Flat salad plate with raised lip",
    details: "Flat salad plate with a shallow lip to capture dressings, showcasing a tactile contrast between the satin glaze and raw clay outer rim.",
    materials: "High-fire stoneware, food-safe raw clay and mineral glazes.",
    dimensions: "21cm diameter.",
    care: "Dishwasher and microwave safe.",
    storyTitle: "THE SALAD PLATE",
    storyDesc: "Thrown flat and trimmed to highlight natural earthen tones on your table.",
    storyImage: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop",
    options: [
      { name: "Color", values: ["Speckled Oat", "Slate Clay"] }
    ],
    variants: [
      { id: "var_2a", name: "Speckled Oat", priceModifier: 0, stock: 24 },
      { id: "var_2b", name: "Slate Clay", priceModifier: 0, stock: 18 }
    ],
    reviews: [
      { id: "rev_2a", author: "Vikram R.", rating: 5, date: "June 01, 2026", comment: "The matte finish is beautiful. Food looks incredible on these.", verified: true }
    ],
    pairWith: ["morning-mug", "earth-bowl"]
  },
  {
    id: "prod_3",
    slug: "clay-teapot",
    name: "Dusk Teapot",
    price: 2490,
    rating: 5.0,
    reviewCount: 42,
    category: "teapots",
    collection: "slow-mornings",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Slow-steeping clay kettle · 650ml",
    details: "Slow-steeping teapot featuring a hand-carved teak wood handle. Coated with clean tin-white interior glaze, and raw terracotta exterior.",
    materials: "High-fire terracotta body with a tin-white glaze and teak wood handle.",
    dimensions: "14cm height, holds 650ml.",
    care: "Hand wash only. Do not place directly on open flames or stovetops.",
    storyTitle: "THE TEAPOT RITUAL",
    storyDesc: "Designed to slow down tea brewing, keeping water warm while wood handle remains cool.",
    storyImage: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop",
    options: [
      { name: "Finish", values: ["Raw Terracotta", "Smoked Black"] }
    ],
    variants: [
      { id: "var_3a", name: "Raw Terracotta", priceModifier: 0, stock: 6 },
      { id: "var_3b", name: "Smoked Black", priceModifier: 200, stock: 4 }
    ],
    reviews: [
      { id: "rev_3a", author: "Preeti G.", rating: 5, date: "June 10, 2026", comment: "A work of art. Pours beautifully without dripping. Highly recommend.", verified: true }
    ],
    pairWith: ["morning-mug", "pour-over"]
  },
  {
    id: "prod_4",
    slug: "earth-bowl",
    name: "Sand Noodle Bowl",
    price: 799,
    rating: 4.7,
    reviewCount: 68,
    category: "bowls",
    collection: "table-stories",
    image: "https://images.unsplash.com/photo-1612195973809-f1a5bb0f4886?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1612195973809-f1a5bb0f4886?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Deep textured clay bowl",
    details: "Deep, comfortable-to-hold ceramic bowl for comforting meals like hot ramen, curries, or morning oatmeal.",
    materials: "High-fire stoneware with a sand-textured exterior and glossy milk glaze inside.",
    dimensions: "16cm diameter x 8cm depth.",
    care: "Dishwasher and microwave safe.",
    storyTitle: "THE NOODLE BOWL",
    storyDesc: "A tactile connection to earth, contrasting smooth interior glazes with textured exterior clay.",
    storyImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
    options: [
      { name: "Color", values: ["Sand Ochre", "Charcoal Gray"] }
    ],
    variants: [
      { id: "var_4a", name: "Sand Ochre", priceModifier: 0, stock: 22 },
      { id: "var_4b", name: "Charcoal Gray", priceModifier: 0, stock: 15 }
    ],
    reviews: [
      { id: "rev_4a", author: "Devansh P.", rating: 4, date: "June 14, 2026", comment: "Perfect size for ramen. Beautiful contrast between the textured outside and smooth inside.", verified: true }
    ],
    pairWith: ["salad-plate", "morning-mug"]
  },
  {
    id: "prod_5",
    slug: "blossom-vase",
    name: "Clay Bud Vase",
    price: 1290,
    rating: 4.9,
    reviewCount: 37,
    category: "vases",
    collection: "objects-for-home",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1601208443989-6fa87cf0def7?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601208443989-6fa87cf0def7?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Sculptural narrow-neck vase",
    details: "A sculptural vase with a narrow neck, perfect for a single dry stem or as a standalone art piece capturing sunlight on a window sill.",
    materials: "Terracotta wash and raw clay finish with clear waterproof interior glaze.",
    dimensions: "18cm height x 10cm width.",
    care: "Handwash only.",
    storyTitle: "THE BUD VASE",
    storyDesc: "A sculptural object designed to highlight the curves of raw terracotta and capture natural light.",
    storyImage: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop",
    options: [
      { name: "Size", values: ["Short (18cm)", "Tall (24cm)"] }
    ],
    variants: [
      { id: "var_5a", name: "Short (18cm)", priceModifier: 0, stock: 10 },
      { id: "var_5b", name: "Tall (24cm)", priceModifier: 400, stock: 7 }
    ],
    reviews: [
      { id: "rev_5a", author: "Meera K.", rating: 5, date: "June 20, 2026", comment: "Stunning craftsmanship. The terracotta texture is exactly what I wanted.", verified: true }
    ],
    pairWith: ["clay-teapot", "morning-mug"]
  },
  {
    id: "prod_6",
    slug: "pour-over",
    name: "Slow Pour-Over Dripper",
    price: 1190,
    rating: 4.9,
    reviewCount: 55,
    category: "tea-coffee",
    collection: "slow-mornings",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Single-cup coffee dripper",
    details: "Single-cup coffee dripper that sits on top of any standard mug, designed with internal spiral ribs for steady extraction.",
    materials: "High-fire stoneware with iron speckling and satin off-white finish.",
    dimensions: "11cm diameter x 8.5cm height.",
    care: "Dishwasher safe.",
    storyTitle: "THE POUR-OVER",
    storyDesc: "Bringing the rhythm of manual filter coffee to your kitchen counter.",
    storyImage: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=800&auto=format&fit=crop",
    options: [
      { name: "Color", values: ["Speckled Oat", "Slate Clay"] }
    ],
    variants: [
      { id: "var_6a", name: "Speckled Oat", priceModifier: 0, stock: 12 },
      { id: "var_6b", name: "Slate Clay", priceModifier: 0, stock: 9 }
    ],
    reviews: [
      { id: "rev_6a", author: "Aaditya S.", rating: 5, date: "June 25, 2026", comment: "Fits perfectly on my morning mug. Coffee taste is exceptional.", verified: true }
    ],
    pairWith: ["morning-mug", "clay-teapot"]
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return PRODUCTS.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return PRODUCTS.filter(p => p.category === category);
};

export const getProductsByCollection = (collectionSlug: string): Product[] => {
  return PRODUCTS.filter(p => p.collection === collectionSlug);
};

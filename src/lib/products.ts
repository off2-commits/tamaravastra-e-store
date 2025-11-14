export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: 'cotton' | 'silk' | 'party-wear' | 'designer';
  colors: { name: string; hex: string }[];
  description: string;
  stock: number;
  isBestseller: boolean;
}

import saree1 from '@/assets/saree-1.jpg';
import saree2 from '@/assets/saree-2.jpg';
import saree3 from '@/assets/saree-3.jpg';
import saree4 from '@/assets/saree-4.jpg';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Royal Banarasi Silk Saree',
    price: 12500,
    image: saree1,
    images: [saree1, saree1, saree1],
    category: 'silk',
    colors: [
      { name: 'Maroon', hex: '#8B0000' },
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Navy', hex: '#0A1D37' }
    ],
    description: 'Exquisite Banarasi silk saree with intricate zari work and traditional motifs. Perfect for weddings and special occasions. Features pure silk fabric with authentic gold zari weaving.',
    stock: 15,
    isBestseller: true
  },
  {
    id: '2',
    name: 'Elegant Cotton Chanderi',
    price: 4500,
    image: saree2,
    images: [saree2, saree2, saree2],
    category: 'cotton',
    colors: [
      { name: 'Peach', hex: '#FFB07C' },
      { name: 'Mint', hex: '#98D8C8' },
      { name: 'Lavender', hex: '#C5A3E0' }
    ],
    description: 'Lightweight Chanderi cotton saree with delicate embroidery. Ideal for daily wear and office. Breathable fabric with a graceful drape.',
    stock: 25,
    isBestseller: true
  },
  {
    id: '3',
    name: 'Designer Party Wear Saree',
    price: 18999,
    image: saree3,
    images: [saree3, saree3, saree3],
    category: 'party-wear',
    colors: [
      { name: 'Emerald', hex: '#046307' },
      { name: 'Ruby', hex: '#9B111E' },
      { name: 'Sapphire', hex: '#0F52BA' }
    ],
    description: 'Stunning designer saree with sequin work and modern embellishments. Makes a statement at any party or celebration. Contemporary design with traditional elegance.',
    stock: 8,
    isBestseller: true
  },
  {
    id: '4',
    name: 'Pure Kanjivaram Silk',
    price: 22000,
    image: saree4,
    images: [saree4, saree4, saree4],
    category: 'silk',
    colors: [
      { name: 'Mustard', hex: '#FFDB58' },
      { name: 'Magenta', hex: '#C71585' },
      { name: 'Teal', hex: '#008080' }
    ],
    description: 'Authentic Kanjivaram silk saree with temple border and contrasting pallu. A timeless piece for your collection. Handwoven by skilled artisans.',
    stock: 10,
    isBestseller: true
  },
  {
    id: '5',
    name: 'Soft Linen Blend Saree',
    price: 3200,
    image: saree2,
    images: [saree2, saree2, saree2],
    category: 'cotton',
    colors: [
      { name: 'Beige', hex: '#C8AD7F' },
      { name: 'Coral', hex: '#FF6B6B' },
      { name: 'Sky Blue', hex: '#87CEEB' }
    ],
    description: 'Comfortable linen blend saree perfect for summer. Easy to maintain and style. Natural fabric with a soft texture.',
    stock: 30,
    isBestseller: false
  },
  {
    id: '6',
    name: 'Festive Georgette Saree',
    price: 6800,
    image: saree3,
    images: [saree3, saree3, saree3],
    category: 'party-wear',
    colors: [
      { name: 'Rose Gold', hex: '#B76E79' },
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Plum', hex: '#8E4585' }
    ],
    description: 'Flowing georgette saree with printed patterns and sequin border. Perfect for festive occasions. Lightweight and easy to drape.',
    stock: 20,
    isBestseller: false
  },
  {
    id: '7',
    name: 'Luxury Designer Collection',
    price: 35000,
    image: saree1,
    images: [saree1, saree1, saree1],
    category: 'designer',
    colors: [
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Wine', hex: '#722F37' }
    ],
    description: 'Exclusive designer saree with hand-embroidered details and premium fabric. A masterpiece for special occasions. Limited edition piece.',
    stock: 5,
    isBestseller: false
  },
  {
    id: '8',
    name: 'Traditional Cotton Silk',
    price: 5500,
    image: saree4,
    images: [saree4, saree4, saree4],
    category: 'cotton',
    colors: [
      { name: 'Olive', hex: '#808000' },
      { name: 'Terracotta', hex: '#E2725B' },
      { name: 'Indigo', hex: '#4B0082' }
    ],
    description: 'Classic cotton silk saree with traditional print and contrast border. Versatile for both casual and formal wear. Comfortable all-day wear.',
    stock: 18,
    isBestseller: false
  }
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getBestsellers(): Product[] {
  return mockProducts.filter(p => p.isBestseller).slice(0, 4);
}

export function filterProducts(category?: string, maxPrice?: number): Product[] {
  let filtered = mockProducts;
  
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= maxPrice);
  }
  
  return filtered;
}

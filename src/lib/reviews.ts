export interface Review {
  id: string;
  productId: string;
  reviewerName: string;
  reviewerEmail: string;
  reviewerPhone: string;
  rating: number;
  title: string;
  text: string;
  images: string[];
  date: string;
  verified: boolean;
  orderId: string;
}

export const mockReviews: Review[] = [
  {
    id: 'REV-001',
    productId: '1',
    reviewerName: 'Priya Sharma',
    reviewerEmail: 'priya.sharma@email.com',
    reviewerPhone: '+91 98765 43210',
    rating: 5,
    title: 'Absolutely Beautiful!',
    text: 'The quality of the silk is exceptional. The colors are vibrant and the craftsmanship is outstanding. It fits perfectly and the zari work is intricate. Highly recommend!',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop'],
    date: '2024-01-10',
    verified: true,
    orderId: 'ORD-001'
  },
  {
    id: 'REV-002',
    productId: '1',
    reviewerName: 'Anjali Patel',
    reviewerEmail: 'anjali.patel@email.com',
    reviewerPhone: '+91 98765 43211',
    rating: 4,
    title: 'Great Quality, Fast Delivery',
    text: 'Very satisfied with my purchase. The saree is beautiful and comfortable to wear. Packaging was also excellent. Would definitely buy again!',
    images: ['https://images.unsplash.com/photo-1589985645831-b56e48bfb0ac?w=400&h=400&fit=crop'],
    date: '2024-01-08',
    verified: true,
    orderId: 'ORD-002'
  },
  {
    id: 'REV-003',
    productId: '2',
    reviewerName: 'Neha Gupta',
    reviewerEmail: 'neha.gupta@email.com',
    reviewerPhone: '+91 98765 43212',
    rating: 5,
    title: 'Perfect for Office Wear',
    text: 'Lightweight and breathable. Very comfortable for daily wear. The design is elegant and professional. Great value for money!',
    images: ['https://images.unsplash.com/photo-1598195385916-6b2bde432c6d?w=400&h=400&fit=crop'],
    date: '2024-01-05',
    verified: true,
    orderId: 'ORD-003'
  },
  {
    id: 'REV-004',
    productId: '3',
    reviewerName: 'Deepika Singh',
    reviewerEmail: 'deepika.singh@email.com',
    reviewerPhone: '+91 98765 43213',
    rating: 5,
    title: 'Stunning Party Wear!',
    text: 'This saree is absolutely stunning! The embroidery is gorgeous and the colors are so rich. Perfect for parties and celebrations. Everyone complimented my saree!',
    images: ['https://images.unsplash.com/photo-1617373657012-3b2b3b0b3b0b?w=400&h=400&fit=crop'],
    date: '2024-01-02',
    verified: true,
    orderId: 'ORD-004'
  },
  {
    id: 'REV-005',
    productId: '4',
    reviewerName: 'Meera Reddy',
    reviewerEmail: 'meera.reddy@email.com',
    reviewerPhone: '+91 98765 43214',
    rating: 5,
    title: 'Authentic Kanjivaram Silk',
    text: 'Original quality Kanjivaram silk. The temple border is beautiful and the pallu is stunning. Worth every penny. Highly satisfied!',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'],
    date: '2023-12-28',
    verified: true,
    orderId: 'ORD-005'
  }
];

export function getProductReviews(productId: string): Review[] {
  return mockReviews.filter(review => review.productId === productId);
}

export function getAverageRating(productId: string): number {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function getRatingDistribution(productId: string): Record<number, number> {
  const reviews = getProductReviews(productId);
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach(review => {
    distribution[review.rating as keyof typeof distribution]++;
  });
  
  return distribution;
}

export function verifyPurchaser(email: string, phone: string, productId: string): boolean {
  // In a real app, this would check against actual orders
  // For now, we'll verify against our mock orders
  return mockReviews.some(
    review => (review.reviewerEmail === email || review.reviewerPhone === phone) && review.productId === productId
  );
}

export function addReview(review: Omit<Review, 'id' | 'date'>): Review {
  const newReview: Review = {
    ...review,
    id: `REV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0]
  };
  mockReviews.push(newReview);
  return newReview;
}


import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/molecules/ProductCard';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  inStock: boolean;
}

const bestSellers: Product[] = [
  {
    id: '1',
    name: 'Mahindra 575 DI XP Plus',
    brand: 'Mahindra',
    price: 895000,
    originalPrice: 925000,
    rating: 4.5,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: '2',
    name: 'John Deere 5310',
    brand: 'John Deere',
    price: 1250000,
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
    badge: 'Premium',
    inStock: true,
  },
  {
    id: '3',
    name: 'Swaraj 744 FE',
    brand: 'Swaraj',
    price: 675000,
    originalPrice: 695000,
    rating: 4.3,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
    inStock: true,
  },
  {
    id: '4',
    name: 'New Holland 3630 TX',
    brand: 'New Holland',
    price: 1125000,
    rating: 4.6,
    reviewCount: 72,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
    badge: 'New Launch',
    inStock: true,
  },
];

export default function BestSellers() {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Best Sellers
          </h2>
          <p className="text-lg text-gray-600">
            Most popular equipment among farmers
          </p>
        </div>
        <div className="hidden md:flex space-x-2">
          <Button variant="outline" size="icon" className="focus-ring">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="focus-ring">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline" size="lg" className="focus-ring">
          View All Best Sellers
        </Button>
      </div>
    </section>
  );
}

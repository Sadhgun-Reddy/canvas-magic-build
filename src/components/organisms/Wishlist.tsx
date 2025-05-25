
import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/molecules/ProductCard';

const mockWishlistItems = [
  {
    id: '1',
    name: 'John Deere 5310',
    brand: 'John Deere',
    price: 1250000,
    originalPrice: 1300000,
    rating: 4.7,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
    badge: 'Premium',
    inStock: true,
  },
  {
    id: '2',
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

export default function Wishlist() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
        <p className="text-gray-600">{mockWishlistItems.length} items</p>
      </div>

      {mockWishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-600 mb-6">
            Save items you love to your wishlist and shop them later.
          </p>
          <Button className="bg-green-500 hover:bg-green-600 focus-ring">
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}

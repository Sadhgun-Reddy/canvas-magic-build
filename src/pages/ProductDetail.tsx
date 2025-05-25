
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, Star, Truck, Shield, Phone, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import ProductGallery from '@/components/molecules/ProductGallery';
import QuantityStepper from '@/components/molecules/QuantityStepper';
import ProductSpecs from '@/components/organisms/ProductSpecs';
import ProductReviews from '@/components/organisms/ProductReviews';

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Mahindra 575 DI XP Plus',
  brand: 'Mahindra',
  category: 'Tractors',
  price: 895000,
  originalPrice: 925000,
  rating: 4.5,
  reviewCount: 128,
  inStock: true,
  stock: 15,
  images: [
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop',
  ],
  badges: ['Best Seller', 'Free Installation'],
  description: 'The Mahindra 575 DI XP Plus is a powerful and versatile tractor designed for modern farming needs. With its robust engine and advanced features, it delivers exceptional performance across various agricultural operations.',
  keyFeatures: [
    '47 HP Engine',
    '8F + 2R Transmission',
    'Power Steering',
    'Oil Immersed Brakes',
    'Dual Clutch',
    '540/750 RPM PTO',
  ],
  specifications: {
    engine: {
      'Engine Type': '4 Cylinder, Water Cooled',
      'Engine Power': '47 HP',
      'Engine RPM': '2000 RPM',
      'Number of Cylinders': '4',
      'Fuel Tank Capacity': '65 Litres',
    },
    transmission: {
      'Transmission Type': 'Synchromesh',
      'Forward Gears': '8',
      'Reverse Gears': '2',
      'PTO Power': '40 HP',
      'PTO RPM': '540/750',
    },
    hydraulics: {
      'Lifting Capacity': '1800 kg',
      'Hydraulic Type': 'Open Center',
      'Remote Valves': '1 Standard',
      'Position Control': 'Yes',
    },
  },
  emiOptions: {
    monthlyEmi: 15780,
    downPayment: 179000,
    tenure: 60,
  },
};

export default function ProductDetail() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('standard');
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: mockProduct.id,
        name: mockProduct.name,
        price: mockProduct.price,
        quantity,
        image: mockProduct.images[0],
        stock: mockProduct.stock,
      },
    });

    toast({
      title: 'Added to cart',
      description: `${quantity} x ${mockProduct.name} added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout
    window.location.href = '/checkout';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const discountPercentage = mockProduct.originalPrice
    ? Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/category/${mockProduct.category.toLowerCase()}`}>
              {mockProduct.category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{mockProduct.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Gallery */}
        <div>
          <ProductGallery images={mockProduct.images} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand */}
          <Badge variant="outline" className="text-green-600 border-green-600">
            {mockProduct.brand}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {mockProduct.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.floor(mockProduct.rating)
                      ? 'text-yellow-400 fill-current'
                      : star <= mockProduct.rating
                      ? 'text-yellow-400 fill-current opacity-50'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {mockProduct.rating} ({mockProduct.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(mockProduct.price)}
              </span>
              {mockProduct.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(mockProduct.originalPrice)}
                  </span>
                  <Badge variant="destructive" className="bg-red-500">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600">
              EMI starts at ₹{mockProduct.emiOptions.monthlyEmi.toLocaleString()}/month
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {mockProduct.badges.map((badge, index) => (
              <Badge key={index} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {mockProduct.inStock ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">
                  In Stock ({mockProduct.stock} available)
                </span>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-red-600 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Key Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              {mockProduct.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={mockProduct.stock}
              />
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                disabled={!mockProduct.inStock}
                className="flex-1 bg-green-500 hover:bg-green-600 focus-ring"
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={!mockProduct.inStock}
                size="lg"
                className="flex-1 bg-orange-500 hover:bg-orange-600 focus-ring"
              >
                Buy Now
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1 focus-ring">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline" className="flex-1 focus-ring">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Service Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="h-4 w-4 text-green-500" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-green-500" />
              <span>2 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-green-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {mockProduct.description}
            </p>
            
            <h3 className="text-xl font-semibold mb-4">Product Highlights</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Advanced engine technology for optimal fuel efficiency</li>
              <li>Ergonomic design for operator comfort during long working hours</li>
              <li>Robust construction built to withstand tough farming conditions</li>
              <li>Easy maintenance with accessible service points</li>
              <li>Compatible with a wide range of implements</li>
            </ul>

            <div className="flex items-center space-x-4 mt-8 p-4 bg-gray-50 rounded-lg">
              <Download className="h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-medium">Download Product Brochure</h4>
                <p className="text-sm text-gray-600">Get detailed technical specifications and features</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto focus-ring">
                Download PDF
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="specifications" className="mt-8">
          <ProductSpecs specifications={mockProduct.specifications} />
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-8">
          <ProductReviews productId={mockProduct.id} />
        </TabsContent>
      </Tabs>

      {/* Sticky CTA Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="text-lg font-bold text-gray-900">
              {formatPrice(mockProduct.price)}
            </div>
            <div className="text-sm text-gray-600">
              EMI ₹{mockProduct.emiOptions.monthlyEmi.toLocaleString()}/month
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!mockProduct.inStock}
            className="bg-green-500 hover:bg-green-600 focus-ring"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

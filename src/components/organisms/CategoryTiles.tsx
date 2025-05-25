
import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  nameHindi: string;
  icon: string;
  image: string;
  itemCount: number;
}

const categories: Category[] = [
  {
    id: 'tractors',
    name: 'Tractors',
    nameHindi: 'ट्रैक्टर',
    icon: '🚜',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
    itemCount: 1247,
  },
  {
    id: 'harvesters',
    name: 'Harvesters',
    nameHindi: 'हार्वेस्टर',
    icon: '🌾',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
    itemCount: 356,
  },
  {
    id: 'implements',
    name: 'Implements',
    nameHindi: 'कृषि यंत्र',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=200&fit=crop',
    itemCount: 892,
  },
  {
    id: 'irrigation',
    name: 'Irrigation',
    nameHindi: 'सिंचाई',
    icon: '💧',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    itemCount: 634,
  },
  {
    id: 'seeds',
    name: 'Seeds',
    nameHindi: 'बीज',
    icon: '🌱',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    itemCount: 423,
  },
  {
    id: 'fertilizers',
    name: 'Fertilizers',
    nameHindi: 'उर्वरक',
    icon: '🧪',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
    itemCount: 287,
  },
];

export default function CategoryTiles() {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Shop by Category
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect agricultural equipment for your farming needs
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 focus-ring"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all" />
              <div className="absolute top-2 left-2 text-2xl bg-white rounded-full p-2 shadow-sm">
                {category.icon}
              </div>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-semibold text-gray-900 mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 font-hindi mb-2">
                {category.nameHindi}
              </p>
              <p className="text-xs text-gray-400">
                {category.itemCount.toLocaleString()} items
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

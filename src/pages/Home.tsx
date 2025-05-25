
import React from 'react';
import HeroCarousel from '@/components/organisms/HeroCarousel';
import CategoryTiles from '@/components/organisms/CategoryTiles';
import BestSellers from '@/components/organisms/BestSellers';
import VideoBanner from '@/components/organisms/VideoBanner';
import TrustStrip from '@/components/organisms/TrustStrip';
import TestimonialsCarousel from '@/components/organisms/TestimonialsCarousel';
import SEOTextBlock from '@/components/organisms/SEOTextBlock';

export default function Home() {
  return (
    <div className="space-y-12 pb-12">
      <HeroCarousel />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <CategoryTiles />
        <BestSellers />
        <VideoBanner />
        <TrustStrip />
        <TestimonialsCarousel />
        <SEOTextBlock />
      </div>
    </div>
  );
}

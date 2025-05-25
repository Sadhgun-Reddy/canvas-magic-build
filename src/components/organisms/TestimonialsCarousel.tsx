
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
  equipment: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'राजेश पटेल',
    location: 'गुजरात',
    rating: 5,
    comment: 'Excellent service and genuine products. My Mahindra tractor has been working perfectly for 2 years now. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    equipment: 'Mahindra 575 DI',
  },
  {
    id: '2',
    name: 'सुनीता देवी',
    location: 'पंजाब',
    rating: 5,
    comment: 'Fast delivery and professional installation. The harvester has increased our farm productivity significantly.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=64&h=64&fit=crop&crop=face',
    equipment: 'John Deere Harvester',
  },
  {
    id: '3',
    name: 'अमित शर्मा',
    location: 'उत्तर प्रदेश',
    rating: 4,
    comment: 'Good quality equipment at competitive prices. Customer support is very helpful and responsive.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    equipment: 'Swaraj 744 FE',
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real testimonials from farmers across India
        </p>
      </div>

      <div className="relative">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="w-20 h-20">
                <AvatarImage src={testimonials[currentIndex].avatar} />
                <AvatarFallback className="text-lg">
                  {testimonials[currentIndex].name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <Quote className="h-8 w-8 text-green-500 mb-4 mx-auto md:mx-0" />
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                "{testimonials[currentIndex].comment}"
              </p>
              
              {/* Rating */}
              <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= testimonials[currentIndex].rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="font-semibold text-gray-900 font-hindi">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600 font-hindi">
                  {testimonials[currentIndex].location}
                </p>
                <p className="text-sm text-green-600">
                  Purchased: {testimonials[currentIndex].equipment}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center space-x-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="focus-ring"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Indicators */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  index === currentIndex ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="focus-ring"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

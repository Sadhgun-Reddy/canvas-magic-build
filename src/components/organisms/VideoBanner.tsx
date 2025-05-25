
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VideoBanner() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-12">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
        {!isPlaying ? (
          <>
            <img
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=675&fit=crop"
              alt="Modern farming with advanced equipment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  See Our Equipment in Action
                </h3>
                <p className="text-lg md:text-xl mb-8 max-w-2xl">
                  Watch how our premium agricultural machinery helps farmers increase productivity and efficiency.
                </p>
                <Button
                  onClick={handlePlay}
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 focus-ring"
                >
                  <Play className="h-6 w-6 mr-2 fill-current" />
                  Watch Video
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading video...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

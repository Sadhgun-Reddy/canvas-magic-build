
import React, { useEffect, useState } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function OrderSuccessAnimation() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 text-center max-w-sm mx-4 shadow-xl">
        <div className="relative mb-6">
          <div className="animate-bounce">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <div className="absolute -top-2 -right-2 animate-pulse">
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-pulse delay-150">
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order is being processed.
        </p>
        
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-bounce`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

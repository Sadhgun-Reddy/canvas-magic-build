
import React from 'react';

export default function SEOTextBlock() {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            India's Leading Agricultural Equipment Marketplace
          </h2>
          
          <div className="prose prose-lg text-gray-700 space-y-4">
            <p>
              AgriCommerce is India's largest online marketplace for agricultural equipment, 
              connecting farmers with premium quality tractors, harvesters, implements, and 
              irrigation systems. Since our establishment, we have been committed to 
              revolutionizing farming through advanced technology and reliable machinery.
            </p>
            
            <p>
              Our extensive catalog features top brands like Mahindra, John Deere, Swaraj, 
              New Holland, and many more. Whether you're looking for compact tractors for 
              small farms or powerful harvesters for large-scale operations, we have the 
              right equipment to boost your agricultural productivity.
            </p>
            
            <p>
              With GST-compliant billing, free delivery on orders above ₹50,000, and 
              comprehensive warranty coverage, we ensure a seamless buying experience. 
              Our expert support team provides 24/7 technical assistance, helping farmers 
              make informed decisions about their equipment purchases.
            </p>
            
            <p>
              Join thousands of satisfied farmers across India who have transformed their 
              farming operations with quality equipment from AgriCommerce. Experience the 
              future of agriculture today.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">10,000+</div>
              <div className="text-sm text-gray-600">Products Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">50,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">500+</div>
              <div className="text-sm text-gray-600">Cities Served</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">99%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

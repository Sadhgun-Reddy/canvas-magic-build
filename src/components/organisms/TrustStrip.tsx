
import React from 'react';
import { Shield, Truck, FileText, Headphones, Award, Clock } from 'lucide-react';

const trustFeatures = [
  {
    icon: FileText,
    title: 'GST Invoice',
    description: 'Compliant billing for all purchases',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'On orders above ₹50,000',
  },
  {
    icon: Shield,
    title: '2 Year Warranty',
    description: 'Comprehensive coverage',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert technical assistance',
  },
  {
    icon: Award,
    title: 'Genuine Products',
    description: 'Authorized dealer guarantee',
  },
  {
    icon: Clock,
    title: 'Quick Service',
    description: 'Fast installation & setup',
  },
];

export default function TrustStrip() {
  return (
    <section className="py-12">
      <div className="bg-green-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose AgriCommerce?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            India's most trusted platform for agricultural equipment with unmatched service quality
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

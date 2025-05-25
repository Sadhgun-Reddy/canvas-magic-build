
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, CreditCard, Shield, Truck } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Warranty', href: '/warranty' },
      { name: 'Returns', href: '/returns' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'GST Policy', href: '/gst' },
      { name: 'Shipping Policy', href: '/shipping' },
    ],
  };

  const paymentMethods = [
    'UPI', 'Visa', 'Mastercard', 'RuPay', 'Net Banking'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Trust Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-8 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold">GST Invoice</h3>
              <p className="text-sm text-gray-400">Compliant billing</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Truck className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold">Free Delivery</h3>
              <p className="text-sm text-gray-400">On orders above ₹50,000</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold">2 Year Warranty</h3>
              <p className="text-sm text-gray-400">On all equipment</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">AgriCommerce</span>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              India's largest marketplace for agricultural equipment. 
              Connecting farmers with quality machinery since 2024.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>support@agricommerce.in</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors focus-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors focus-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors focus-ring rounded"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="bg-gray-800 px-2 py-1 rounded text-xs text-gray-300"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-400">
              © 2024 AgriCommerce. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Category {
  id: string;
  name: string;
  nameHindi?: string;
  subcategories?: Category[];
}

const categories: Category[] = [
  {
    id: 'tractors',
    name: 'Tractors',
    nameHindi: 'ट्रैक्टर',
    subcategories: [
      { id: 'mini-tractors', name: 'Mini Tractors', nameHindi: 'मिनी ट्रैक्टर' },
      { id: 'compact-tractors', name: 'Compact Tractors', nameHindi: 'कॉम्पैक्ट ट्रैक्टर' },
      { id: 'utility-tractors', name: 'Utility Tractors', nameHindi: 'यूटिलिटी ट्रैक्टर' },
    ],
  },
  {
    id: 'harvesters',
    name: 'Harvesters',
    nameHindi: 'हार्वेस्टर',
    subcategories: [
      { id: 'combine-harvesters', name: 'Combine Harvesters', nameHindi: 'कंबाइन हार्वेस्टर' },
      { id: 'rice-harvesters', name: 'Rice Harvesters', nameHindi: 'धान हार्वेस्टर' },
    ],
  },
  {
    id: 'implements',
    name: 'Implements',
    nameHindi: 'कृषि यंत्र',
    subcategories: [
      { id: 'ploughs', name: 'Ploughs', nameHindi: 'हल' },
      { id: 'cultivators', name: 'Cultivators', nameHindi: 'कल्टीवेटर' },
      { id: 'seeders', name: 'Seeders', nameHindi: 'सीडर' },
    ],
  },
  {
    id: 'irrigation',
    name: 'Irrigation',
    nameHindi: 'सिंचाई',
    subcategories: [
      { id: 'pumps', name: 'Water Pumps', nameHindi: 'पानी पंप' },
      { id: 'sprinklers', name: 'Sprinklers', nameHindi: 'स्प्रिंकलर' },
      { id: 'drip-systems', name: 'Drip Systems', nameHindi: 'ड्रिप सिस्टम' },
    ],
  },
];

export default function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Categories</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="focus-ring"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <Accordion type="single" collapsible className="w-full">
              {categories.map((category) => (
                <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">
                        {language === 'hi' && category.nameHindi
                          ? category.nameHindi
                          : category.name}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 space-y-2">
                      <Link
                        to={`/category/${category.id}`}
                        className="block py-2 text-sm text-gray-600 hover:text-green-600 focus-ring rounded"
                        onClick={() => setIsOpen(false)}
                      >
                        View All {category.name}
                      </Link>
                      {category.subcategories?.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/category/${subcategory.id}`}
                          className="block py-2 text-sm text-gray-600 hover:text-green-600 focus-ring rounded"
                          onClick={() => setIsOpen(false)}
                        >
                          {language === 'hi' && subcategory.nameHindi
                            ? subcategory.nameHindi
                            : subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Quick Links */}
            <div className="mt-8 pt-4 border-t">
              <h3 className="font-medium mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/offers"
                  className="block py-2 text-sm text-gray-600 hover:text-green-600 focus-ring rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Special Offers
                </Link>
                <Link
                  to="/financing"
                  className="block py-2 text-sm text-gray-600 hover:text-green-600 focus-ring rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Financing Options
                </Link>
                <Link
                  to="/support"
                  className="block py-2 text-sm text-gray-600 hover:text-green-600 focus-ring rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Customer Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

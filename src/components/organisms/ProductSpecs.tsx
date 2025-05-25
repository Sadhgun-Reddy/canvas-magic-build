
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Specifications {
  [category: string]: {
    [key: string]: string;
  };
}

interface ProductSpecsProps {
  specifications: Specifications;
}

export default function ProductSpecs({ specifications }: ProductSpecsProps) {
  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Technical Specifications</h3>
      
      <Accordion type="multiple" defaultValue={Object.keys(specifications)} className="w-full">
        {Object.entries(specifications).map(([category, specs]) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="text-left hover:no-underline">
              <span className="text-lg font-semibold">{formatCategoryName(category)}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-600">{key}:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Download Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Need More Details?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium">Technical Manual</h5>
              <p className="text-sm text-gray-600">Complete technical documentation</p>
            </div>
            <button className="text-green-600 hover:text-green-700 font-medium focus-ring rounded">
              Download PDF
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h5 className="font-medium">Parts Catalog</h5>
              <p className="text-sm text-gray-600">Spare parts and service guide</p>
            </div>
            <button className="text-green-600 hover:text-green-700 font-medium focus-ring rounded">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface FilterGroup {
  id: string;
  title: string;
  type: 'checkbox' | 'range' | 'radio';
  options?: { id: string; label: string; count?: number }[];
  min?: number;
  max?: number;
  unit?: string;
}

const filterGroups: FilterGroup[] = [
  {
    id: 'brand',
    title: 'Brand',
    type: 'checkbox',
    options: [
      { id: 'mahindra', label: 'Mahindra', count: 245 },
      { id: 'john-deere', label: 'John Deere', count: 156 },
      { id: 'swaraj', label: 'Swaraj', count: 198 },
      { id: 'new-holland', label: 'New Holland', count: 134 },
      { id: 'sonalika', label: 'Sonalika', count: 89 },
    ],
  },
  {
    id: 'price',
    title: 'Price Range',
    type: 'range',
    min: 100000,
    max: 2000000,
    unit: '₹',
  },
  {
    id: 'horsepower',
    title: 'Horsepower',
    type: 'checkbox',
    options: [
      { id: '20-30', label: '20-30 HP', count: 89 },
      { id: '30-40', label: '30-40 HP', count: 156 },
      { id: '40-50', label: '40-50 HP', count: 234 },
      { id: '50-60', label: '50-60 HP', count: 178 },
      { id: '60+', label: '60+ HP', count: 145 },
    ],
  },
  {
    id: 'fuel-type',
    title: 'Fuel Type',
    type: 'checkbox',
    options: [
      { id: 'diesel', label: 'Diesel', count: 567 },
      { id: 'electric', label: 'Electric', count: 23 },
      { id: 'hybrid', label: 'Hybrid', count: 12 },
    ],
  },
  {
    id: 'condition',
    title: 'Condition',
    type: 'checkbox',
    options: [
      { id: 'new', label: 'New', count: 456 },
      { id: 'refurbished', label: 'Refurbished', count: 123 },
    ],
  },
];

export default function FilterPanel() {
  const [openGroups, setOpenGroups] = useState<string[]>(['brand', 'price']);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState([500000, 1500000]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const current = prev[groupId] || [];
      if (checked) {
        return { ...prev, [groupId]: [...current, optionId] };
      } else {
        return { ...prev, [groupId]: current.filter(id => id !== optionId) };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setPriceRange([500000, 1500000]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-green-600 hover:text-green-700 focus-ring"
        >
          Clear All
        </Button>
      </div>

      {filterGroups.map((group) => (
        <div key={group.id} className="border-b border-gray-200 pb-4">
          <Collapsible
            open={openGroups.includes(group.id)}
            onOpenChange={() => toggleGroup(group.id)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left hover:text-green-600 focus-ring rounded">
              <span className="font-medium text-gray-900">{group.title}</span>
              {openGroups.includes(group.id) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            
            <CollapsibleContent className="pt-4 space-y-3">
              {group.type === 'checkbox' && group.options && (
                <div className="space-y-3">
                  {group.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${group.id}-${option.id}`}
                        checked={(selectedFilters[group.id] || []).includes(option.id)}
                        onCheckedChange={(checked) =>
                          handleFilterChange(group.id, option.id, checked as boolean)
                        }
                        className="focus-ring"
                      />
                      <Label
                        htmlFor={`${group.id}-${option.id}`}
                        className="flex-1 cursor-pointer text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span>{option.label}</span>
                          {option.count && (
                            <span className="text-gray-400">({option.count})</span>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {group.type === 'range' && group.min && group.max && (
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={group.min}
                    max={group.max}
                    step={50000}
                    className="focus-ring"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
}

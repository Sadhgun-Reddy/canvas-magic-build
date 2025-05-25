
import React, { useState } from 'react';
import { Tag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const availableCoupons = [
  {
    code: 'SAVE10',
    description: '10% off on orders above ₹1,00,000',
    discount: 10,
    minAmount: 100000,
  },
  {
    code: 'FIRSTBUY',
    description: '₹5,000 off on first purchase',
    discount: 5000,
    minAmount: 50000,
  },
  {
    code: 'FREESHIP',
    description: 'Free shipping on all orders',
    discount: 'free_shipping',
    minAmount: 0,
  },
];

export default function PromoCodeSection() {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState('');

  const handleApplyCode = () => {
    const code = promoCode.toUpperCase();
    const validCoupon = availableCoupons.find(coupon => coupon.code === code);
    
    if (validCoupon) {
      setAppliedCode(code);
      setError('');
      setPromoCode('');
    } else {
      setError('Invalid promo code');
    }
  };

  const handleRemoveCode = () => {
    setAppliedCode(null);
    setError('');
  };

  const applyCoupon = (code: string) => {
    setAppliedCode(code);
    setPromoCode('');
    setError('');
    setIsExpanded(false);
  };

  const appliedCoupon = availableCoupons.find(coupon => coupon.code === appliedCode);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Tag className="h-5 w-5 text-green-500" />
        <h3 className="font-semibold text-gray-900">Promo Code</h3>
      </div>

      {appliedCode ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800">{appliedCode}</span>
            {appliedCoupon && (
              <span className="text-sm text-green-600">
                {typeof appliedCoupon.discount === 'number' 
                  ? `${appliedCoupon.discount}% off`
                  : appliedCoupon.description
                }
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveCode}
            className="text-green-600 hover:text-green-700 focus-ring"
          >
            Remove
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 focus-ring"
            />
            <Button
              onClick={handleApplyCode}
              disabled={!promoCode.trim()}
              className="bg-green-500 hover:bg-green-600 focus-ring"
            >
              Apply
            </Button>
          </div>
          
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger className="text-sm text-green-600 hover:text-green-700 focus-ring rounded">
              View available coupons
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-2">
              {availableCoupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="font-mono">
                        {coupon.code}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {coupon.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyCoupon(coupon.code)}
                    className="focus-ring"
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  );
}

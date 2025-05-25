
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import QuantityStepper from '@/components/molecules/QuantityStepper';
import PromoCodeSection from '@/components/molecules/PromoCodeSection';

export default function Cart() {
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast({
      title: 'Item removed',
      description: 'Item has been removed from your cart.',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const gstAmount = state.total * 0.18; // 18% GST
  const shippingCost = state.total > 50000 ? 0 : 5000;
  const finalTotal = state.total + gstAmount + shippingCost;

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/">
            <Button className="bg-green-500 hover:bg-green-600 focus-ring">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/">
          <Button variant="ghost" size="icon" className="focus-ring">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart ({state.itemCount} items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                />

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  {item.variant && (
                    <p className="text-sm text-gray-600 mb-2">
                      Variant: {item.variant}
                    </p>
                  )}
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                    {item.stock < 5 && (
                      <Badge variant="destructive" className="text-xs">
                        Low Stock ({item.stock} left)
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(quantity) => handleUpdateQuantity(item.id, quantity)}
                    min={1}
                    max={item.stock}
                  />
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 focus-ring"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Item Total */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {item.quantity} × {formatPrice(item.price)}
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Promo Code */}
          <PromoCodeSection />

          {/* Summary Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(state.total)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium">{formatPrice(gstAmount)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              
              {state.total < 50000 && (
                <div className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                  Add {formatPrice(50000 - state.total)} more for free shipping
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            <Link to="/checkout">
              <Button className="w-full mt-6 bg-green-500 hover:bg-green-600 focus-ring">
                Proceed to Checkout
              </Button>
            </Link>
          </div>

          {/* Security Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure checkout with SSL encryption</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>GST invoice will be generated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

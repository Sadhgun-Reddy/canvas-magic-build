import React, { useState } from 'react';
import { MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { CheckedState } from '@radix-ui/react-checkbox';

interface OrderReviewProps {
  onComplete: (data: any) => void;
  addressData: any;
  paymentData: any;
  orderData: any;
}

export default function OrderReview({ 
  onComplete, 
  addressData, 
  paymentData, 
  orderData 
}: OrderReviewProps) {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!acceptTerms) return;
    
    setLoading(true);
    // Simulate order processing
    setTimeout(() => {
      onComplete({
        address: addressData,
        payment: paymentData,
        order: orderData,
      });
    }, 2000);
  };

  const handleTermsChange = (checked: CheckedState) => {
    setAcceptTerms(checked === true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case 'upi': return 'UPI';
      case 'card': return 'Credit/Debit Card';
      case 'netbanking': return 'Net Banking';
      default: return method;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Order
        </h2>
        <p className="text-gray-600">
          Please review your order details before placing the order
        </p>
      </div>

      {/* Delivery Address */}
      {addressData && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold text-gray-900">Delivery Address</h3>
          </div>
          <div className="text-gray-700">
            <p className="font-medium font-hindi">{addressData.name}</p>
            <p>{addressData.addressLine1}</p>
            {addressData.addressLine2 && <p>{addressData.addressLine2}</p>}
            <p>{addressData.city}, {addressData.state} - {addressData.pincode}</p>
            <p className="text-sm">Phone: {addressData.phone}</p>
          </div>
        </div>
      )}

      {/* Payment Method */}
      {paymentData && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CreditCard className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold text-gray-900">Payment Method</h3>
          </div>
          <div className="text-gray-700">
            <p className="font-medium">{getPaymentMethodName(paymentData.method)}</p>
            {paymentData.method === 'upi' && paymentData.data.upiId && (
              <p className="text-sm">UPI ID: {paymentData.data.upiId}</p>
            )}
            {paymentData.method === 'card' && paymentData.data.cardNumber && (
              <p className="text-sm">Card ending in ****{paymentData.data.cardNumber.slice(-4)}</p>
            )}
            {paymentData.method === 'netbanking' && paymentData.data.bank && (
              <p className="text-sm">Bank: {paymentData.data.bank}</p>
            )}
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-4">
          {orderData.items.map((item: any) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <p className="text-sm text-gray-600">
                  {formatPrice(item.price)} each
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={handleTermsChange}
            className="mt-1 focus-ring"
          />
          <div className="text-sm text-gray-700">
            <label htmlFor="terms" className="cursor-pointer">
              I agree to the{' '}
              <a href="/terms" className="text-green-600 hover:text-green-700 underline">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-green-600 hover:text-green-700 underline">
                Privacy Policy
              </a>
              . I understand that this order is subject to availability and AgriCommerce reserves the right to cancel orders in case of pricing errors or product unavailability.
            </label>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <Button
        onClick={handlePlaceOrder}
        disabled={!acceptTerms || loading}
        className="w-full bg-green-500 hover:bg-green-600 focus-ring"
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Processing Order...</span>
          </div>
        ) : (
          `Place Order - ${formatPrice(orderData.total)}`
        )}
      </Button>
    </div>
  );
}

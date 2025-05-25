
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import CheckoutStepper from '@/components/organisms/CheckoutStepper';
import AddressForm from '@/components/organisms/AddressForm';
import PaymentMethod from '@/components/organisms/PaymentMethod';
import OrderReview from '@/components/organisms/OrderReview';

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [addressData, setAddressData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const { state } = useCart();
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Address', component: AddressForm },
    { id: 2, title: 'Payment', component: PaymentMethod },
    { id: 3, title: 'Review', component: OrderReview },
  ];

  const handleStepComplete = (stepData: any) => {
    if (currentStep === 1) {
      setAddressData(stepData);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setPaymentData(stepData);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Process order
      handleOrderSubmit();
    }
  };

  const handleOrderSubmit = () => {
    // Simulate order processing
    const orderId = 'ORD' + Date.now().toString();
    navigate(`/order/${orderId}?success=true`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const gstAmount = state.total * 0.18;
  const shippingCost = state.total > 50000 ? 0 : 5000;
  const finalTotal = state.total + gstAmount + shippingCost;

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Add some items to your cart before checking out.
          </p>
          <Button onClick={() => navigate('/')} className="bg-green-500 hover:bg-green-600 focus-ring">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/cart')}
          className="focus-ring"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      </div>

      {/* Stepper */}
      <CheckoutStepper currentStep={currentStep} steps={steps} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <CurrentStepComponent
            onComplete={handleStepComplete}
            addressData={addressData}
            paymentData={paymentData}
            orderData={{ items: state.items, total: finalTotal }}
          />
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>
            
            {/* Items */}
            <div className="space-y-3 mb-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(state.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium">{formatPrice(gstAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

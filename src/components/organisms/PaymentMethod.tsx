
import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PaymentMethodProps {
  onComplete: (data: any) => void;
}

const paymentMethods = [
  {
    id: 'upi',
    name: 'UPI',
    description: 'Pay using PhonePe, Google Pay, Paytm',
    icon: Smartphone,
    recommended: true,
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, RuPay',
    icon: CreditCard,
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    description: 'All major banks supported',
    icon: Building,
  },
];

export default function PaymentMethod({ onComplete }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [paymentData, setPaymentData] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    bank: '',
  });

  const handleContinue = () => {
    onComplete({
      method: selectedMethod,
      data: paymentData,
    });
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'upi':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@paytm"
                value={paymentData.upiId}
                onChange={(e) => setPaymentData({ ...paymentData, upiId: e.target.value })}
                className="focus-ring"
              />
            </div>
            <div className="text-sm text-gray-600">
              You will be redirected to your UPI app to complete the payment
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                className="focus-ring"
              />
            </div>
            <div>
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="Name on card"
                value={paymentData.cardName}
                onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                className="focus-ring"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                  className="focus-ring"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                  className="focus-ring"
                />
              </div>
            </div>
          </div>
        );

      case 'netbanking':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bank">Select Bank</Label>
              <select
                id="bank"
                value={paymentData.bank}
                onChange={(e) => setPaymentData({ ...paymentData, bank: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="pnb">Punjab National Bank</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              You will be redirected to your bank's website to complete the payment
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Method
        </h2>
        <p className="text-gray-600">
          Choose your preferred payment method
        </p>
      </div>

      {/* Payment Methods */}
      <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`relative border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedMethod === method.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value={method.id} />
                <method.icon className="h-6 w-6 text-gray-600" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">
                      {method.name}
                    </h3>
                    {method.recommended && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {method.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Payment Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        {renderPaymentForm()}
      </div>

      {/* Security Notice */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
        <Shield className="h-5 w-5 text-blue-600" />
        <span>
          Your payment information is encrypted and secure. We do not store your card details.
        </span>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        className="w-full bg-green-500 hover:bg-green-600 focus-ring"
      >
        Review Order
      </Button>
    </div>
  );
}

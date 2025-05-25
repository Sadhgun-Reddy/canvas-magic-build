
import React, { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface AddressFormProps {
  onComplete: (data: any) => void;
}

const savedAddresses: Address[] = [
  {
    id: '1',
    name: 'राजेश पटेल',
    phone: '+91 98765 43210',
    addressLine1: 'Farm House, Village Kheda',
    addressLine2: 'Near Government School',
    city: 'Anand',
    state: 'Gujarat',
    pincode: '388001',
    isDefault: true,
  },
  {
    id: '2',
    name: 'राजेश पटेल',
    phone: '+91 98765 43210',
    addressLine1: 'Shop No. 15, Agricultural Market',
    city: 'Anand',
    state: 'Gujarat',
    pincode: '388002',
    isDefault: false,
  },
];

export default function AddressForm({ onComplete }: AddressFormProps) {
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Gujarat',
    pincode: '',
  });

  const handleContinue = () => {
    const address = savedAddresses.find(addr => addr.id === selectedAddress);
    onComplete(address || newAddress);
  };

  const handleNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(newAddress);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Delivery Address
        </h2>
        <p className="text-gray-600">
          Choose where you want your order to be delivered
        </p>
      </div>

      {!showNewForm ? (
        <>
          {/* Saved Addresses */}
          <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
            <div className="space-y-4">
              {savedAddresses.map((address) => (
                <div
                  key={address.id}
                  className={`relative border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedAddress === address.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={address.id} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900 font-hindi">
                          {address.name}
                        </h3>
                        {address.isDefault && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-1">
                        {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                      </p>
                      <p className="text-gray-700 mb-1">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Phone: {address.phone}
                      </p>
                    </div>
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>

          {/* Add New Address Button */}
          <Button
            variant="outline"
            onClick={() => setShowNewForm(true)}
            className="w-full focus-ring"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="w-full bg-green-500 hover:bg-green-600 focus-ring"
          >
            Continue to Payment
          </Button>
        </>
      ) : (
        /* New Address Form */
        <form onSubmit={handleNewAddressSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                required
                className="focus-ring"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                required
                className="focus-ring"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="addressLine1">Address Line 1 *</Label>
            <Input
              id="addressLine1"
              value={newAddress.addressLine1}
              onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
              required
              className="focus-ring"
            />
          </div>

          <div>
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              id="addressLine2"
              value={newAddress.addressLine2}
              onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
              className="focus-ring"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                required
                className="focus-ring"
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                required
                className="focus-ring"
              />
            </div>
            <div>
              <Label htmlFor="pincode">PIN Code *</Label>
              <Input
                id="pincode"
                value={newAddress.pincode}
                onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                required
                pattern="[0-9]{6}"
                className="focus-ring"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowNewForm(false)}
              className="flex-1 focus-ring"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 focus-ring"
            >
              Save & Continue
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

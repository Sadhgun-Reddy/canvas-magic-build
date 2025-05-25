
import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockAddresses = [
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

export default function AddressBook() {
  const [addresses, setAddresses] = useState(mockAddresses);

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Address Book</h2>
        <Button className="bg-green-500 hover:bg-green-600 focus-ring">
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <h3 className="font-semibold text-gray-900 font-hindi">
                  {address.name}
                </h3>
                {address.isDefault && (
                  <Badge variant="secondary">Default</Badge>
                )}
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="focus-ring">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700 focus-ring"
                  onClick={() => handleDelete(address.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-gray-700 space-y-1 mb-4">
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>{address.city}, {address.state} - {address.pincode}</p>
              <p className="text-sm">Phone: {address.phone}</p>
            </div>

            {!address.isDefault && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSetDefault(address.id)}
                className="focus-ring"
              >
                Set as Default
              </Button>
            )}
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No addresses saved
          </h3>
          <p className="text-gray-600 mb-6">
            Add your delivery addresses for faster checkout.
          </p>
          <Button className="bg-green-500 hover:bg-green-600 focus-ring">
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </div>
      )}
    </div>
  );
}


import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Download, MessageCircle, Package, Truck, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import OrderTimelineTracker from '@/components/organisms/OrderTimelineTracker';
import OrderSuccessAnimation from '@/components/molecules/OrderSuccessAnimation';

// Mock order data
const mockOrder = {
  id: 'ORD1735142400000',
  status: 'delivered',
  total: 1089500,
  orderDate: '2024-01-15',
  estimatedDelivery: '2024-01-20',
  actualDelivery: '2024-01-19',
  items: [
    {
      id: '1',
      name: 'Mahindra 575 DI XP Plus',
      quantity: 1,
      price: 895000,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
    },
  ],
  address: {
    name: 'राजेश पटेल',
    addressLine1: 'Farm House, Village Kheda',
    city: 'Anand',
    state: 'Gujarat',
    pincode: '388001',
    phone: '+91 98765 43210',
  },
  tracking: {
    currentLocation: 'Out for Delivery - Anand Distribution Center',
    estimatedTime: '2-3 hours',
  },
};

export default function OrderTracking() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-blue-500">Confirmed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-orange-500">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Animation */}
      {isSuccess && <OrderSuccessAnimation />}

      {/* Order Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order #{orderId}
            </h1>
            <div className="flex items-center space-x-4">
              {getStatusBadge(mockOrder.status)}
              <span className="text-gray-600">
                Placed on {formatDate(mockOrder.orderDate)}
              </span>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" className="focus-ring">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline" className="focus-ring">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp Support
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Timeline */}
          <OrderTimelineTracker orderId={orderId!} />

          {/* Live Tracking */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Live Tracking
            </h3>
            
            {/* Current Status */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-gray-900">
                  {mockOrder.tracking.currentLocation}
                </p>
                <p className="text-sm text-gray-600">
                  Estimated delivery in {mockOrder.tracking.estimatedTime}
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
              <div className="text-center text-gray-500">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p>Live tracking map</p>
                <p className="text-sm">Real-time location updates</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Items
            </h3>
            <div className="space-y-4">
              {mockOrder.items.map((item) => (
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
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Delivery Address */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delivery Address
            </h3>
            <div className="text-gray-700 space-y-1">
              <p className="font-medium font-hindi">{mockOrder.address.name}</p>
              <p>{mockOrder.address.addressLine1}</p>
              <p>{mockOrder.address.city}, {mockOrder.address.state}</p>
              <p>{mockOrder.address.pincode}</p>
              <p className="text-sm">Phone: {mockOrder.address.phone}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(895000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span>{formatPrice(161100)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(mockOrder.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-2">
              Need Help?
            </h3>
            <p className="text-green-700 text-sm mb-4">
              Our customer support team is here to help you with any questions about your order.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full focus-ring">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat Support
              </Button>
              <Button variant="outline" size="sm" className="w-full focus-ring">
                Call: 1800-123-4567
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

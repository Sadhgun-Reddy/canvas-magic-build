
import React, { useState } from 'react';
import { Package, Eye, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const mockOrders = [
  {
    id: 'ORD123456',
    date: '2024-01-15',
    status: 'delivered',
    total: 1089500,
    items: [
      {
        name: 'Mahindra 575 DI XP Plus',
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop',
        quantity: 1,
      },
    ],
  },
  {
    id: 'ORD123457',
    date: '2024-01-10',
    status: 'shipped',
    total: 675000,
    items: [
      {
        name: 'Swaraj 744 FE',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&h=100&fit=crop',
        quantity: 1,
      },
    ],
  },
];

export default function OrderHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500">Shipped</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500">Processing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
        <Button variant="outline" className="focus-ring">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by order ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 focus-ring"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Orders</option>
          <option value="delivered">Delivered</option>
          <option value="shipped">Shipped</option>
          <option value="processing">Processing</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <Package className="h-8 w-8 text-gray-400" />
                <div>
                  <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {getStatusBadge(order.status)}
                <span className="font-semibold text-gray-900">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="flex items-center space-x-4 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Link to={`/order/${order.id}`}>
                <Button variant="outline" size="sm" className="focus-ring">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="focus-ring">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              {order.status === 'delivered' && (
                <Button variant="outline" size="sm" className="focus-ring">
                  Write Review
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {mockOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No orders found
          </h3>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet.
          </p>
          <Link to="/">
            <Button className="bg-green-500 hover:bg-green-600 focus-ring">
              Start Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

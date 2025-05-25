
import React from 'react';
import { Check, Package, Truck, CheckCircle, Clock } from 'lucide-react';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface OrderTimelineTrackerProps {
  orderId: string;
}

export default function OrderTimelineTracker({ orderId }: OrderTimelineTrackerProps) {
  const timelineSteps: TimelineStep[] = [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      description: 'Your order has been placed and confirmed',
      status: 'completed',
      timestamp: '15 Jan 2024, 10:30 AM',
      icon: CheckCircle,
    },
    {
      id: 'processing',
      title: 'Processing',
      description: 'Your order is being prepared for dispatch',
      status: 'completed',
      timestamp: '16 Jan 2024, 2:15 PM',
      icon: Package,
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: 'Your order is on its way to you',
      status: 'completed',
      timestamp: '17 Jan 2024, 9:45 AM',
      icon: Truck,
    },
    {
      id: 'out-for-delivery',
      title: 'Out for Delivery',
      description: 'Your order is out for delivery',
      status: 'current',
      timestamp: '19 Jan 2024, 8:00 AM',
      icon: Truck,
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Order delivered successfully',
      status: 'pending',
      icon: Check,
    },
  ];

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100 border-green-600';
      case 'current':
        return 'text-blue-600 bg-blue-100 border-blue-600';
      default:
        return 'text-gray-400 bg-gray-100 border-gray-300';
    }
  };

  const getLineColor = (status: string) => {
    return status === 'completed' ? 'bg-green-500' : 'bg-gray-300';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Order Progress
      </h3>
      
      <div className="relative">
        {timelineSteps.map((step, index) => (
          <div key={step.id} className="relative flex items-start space-x-4 pb-8 last:pb-0">
            {/* Vertical Line */}
            {index < timelineSteps.length - 1 && (
              <div
                className={`absolute left-6 top-12 w-0.5 h-16 ${getLineColor(step.status)}`}
              />
            )}
            
            {/* Icon */}
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${getStepColor(step.status)}`}
            >
              <step.icon className="h-6 w-6" />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`font-semibold ${
                  step.status === 'completed' ? 'text-green-900' :
                  step.status === 'current' ? 'text-blue-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </h4>
                {step.status === 'current' && (
                  <div className="flex items-center space-x-1 text-blue-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">In Progress</span>
                  </div>
                )}
              </div>
              <p className={`text-sm mt-1 ${
                step.status === 'completed' ? 'text-green-700' :
                step.status === 'current' ? 'text-blue-700' : 'text-gray-500'
              }`}>
                {step.description}
              </p>
              {step.timestamp && (
                <p className="text-xs text-gray-500 mt-1">
                  {step.timestamp}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

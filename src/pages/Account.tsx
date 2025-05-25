
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { User, Package, Heart, MapPin, Wallet, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import OrderHistory from '@/components/organisms/OrderHistory';
import Wishlist from '@/components/organisms/Wishlist';
import AddressBook from '@/components/organisms/AddressBook';
import ProfileSettings from '@/components/organisms/ProfileSettings';
import LoginForm from '@/components/organisms/LoginForm';

const menuItems = [
  { id: 'orders', label: 'My Orders', icon: Package, path: '/account/orders' },
  { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/account/wishlist' },
  { id: 'addresses', label: 'Addresses', icon: MapPin, path: '/account/addresses' },
  { id: 'profile', label: 'Profile', icon: User, path: '/account/profile' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, path: '/account/wallet' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/account/settings' },
];

export default function Account() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const currentPath = location.pathname;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="font-hindi">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900 font-hindi">
                  {user?.name}
                </h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors focus-ring ${
                    currentPath === item.path
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <Button
                variant="ghost"
                onClick={logout}
                className="flex items-center space-x-3 px-3 py-2 w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 focus-ring"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Routes>
            <Route path="orders" element={<OrderHistory />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="addresses" element={<AddressBook />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="wallet" element={<div>Wallet Component</div>} />
            <Route path="settings" element={<div>Settings Component</div>} />
            <Route path="*" element={<OrderHistory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

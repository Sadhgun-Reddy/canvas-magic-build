
import React, { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileSettings() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    language: 'en',
    notifications: {
      email: true,
      sms: true,
      push: false,
    },
    twoFactor: false,
  });

  const handleSave = () => {
    // Save profile data
    console.log('Saving profile:', profileData);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>

      {/* Profile Picture */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-xl font-hindi">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute -bottom-2 -right-2 rounded-full bg-green-500 hover:bg-green-600 focus-ring"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 font-hindi">{user?.name}</h4>
            <p className="text-sm text-gray-600 mb-2">JPG, PNG or GIF (max. 5MB)</p>
            <Button variant="outline" size="sm" className="focus-ring">
              Change Picture
            </Button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="focus-ring"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="focus-ring"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="focus-ring"
            />
          </div>
          <div>
            <Label htmlFor="language">Preferred Language</Label>
            <select
              id="language"
              value={profileData.language}
              onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive order updates via email</p>
            </div>
            <Switch
              checked={profileData.notifications.email}
              onCheckedChange={(checked) => 
                setProfileData({ 
                  ...profileData, 
                  notifications: { ...profileData.notifications, email: checked } 
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">SMS Notifications</h4>
              <p className="text-sm text-gray-600">Receive order updates via SMS</p>
            </div>
            <Switch
              checked={profileData.notifications.sms}
              onCheckedChange={(checked) => 
                setProfileData({ 
                  ...profileData, 
                  notifications: { ...profileData.notifications, sms: checked } 
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-600">Receive notifications on your device</p>
            </div>
            <Switch
              checked={profileData.notifications.push}
              onCheckedChange={(checked) => 
                setProfileData({ 
                  ...profileData, 
                  notifications: { ...profileData.notifications, push: checked } 
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={profileData.twoFactor}
              onCheckedChange={(checked) => 
                setProfileData({ ...profileData, twoFactor: checked })
              }
            />
          </div>
          <Button variant="outline" className="focus-ring">
            Change Password
          </Button>
        </div>
      </div>

      {/* Save Button */}
      <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 focus-ring">
        <Save className="h-4 w-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
}

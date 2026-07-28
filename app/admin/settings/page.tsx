"use client";
import React, { useState, useEffect } from 'react';
import { 
  User,
  Mail,
  Shield,
  Camera,
  Eye,
  EyeOff,
  Lock,
  Edit2,
  Save,
  X
} from 'lucide-react';
import { GetAdminProfile, UpdateAdminProfile, ChangeAdminPassword } from '@/app/api/ApiHelper/adminProfileHelper';
import Swal from 'sweetalert2';

export default function Settings() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile State
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Admin'
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const fetchProfile = async () => {
    try {
      const res = await GetAdminProfile();
      if (res.data?.data) {
        const admin = res.data.data;
        setProfileData({
          name: admin.name || '',
          email: admin.email || '',
          phone: admin.phone || '',
          role: 'Admin'
        });
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      const res = await UpdateAdminProfile({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
      });
      if (res.data?.success || res.status === 200) {
        Swal.fire('Success', 'Profile updated successfully!', 'success');
        setShowEditProfile(false);
        fetchProfile();
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      Swal.fire('Error', error.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire('Error', 'New password and confirm password do not match!', 'error');
      return;
    }

    try {
      setLoading(true);
      const res = await ChangeAdminPassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (res.data?.success || res.status === 200) {
        Swal.fire('Success', 'Password changed successfully!', 'success');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setShowChangePassword(false);
      }
    } catch (error: any) {
      console.error('Password change error:', error);
      Swal.fire('Error', error.response?.data?.message || 'Failed to change password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-0 p-4 lg:p-6 pb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-xl font-bold">Admin Profile</h2>
          {!showEditProfile && (
            <button
              onClick={() => setShowEditProfile(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              <span className="font-semibold text-sm">Edit Profile</span>
            </button>
          )}
        </div>

        <div className="flex items-start gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-[#FFC93C] to-orange-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {profileData.name ? profileData.name.slice(0, 2).toUpperCase() : 'AD'}
            </div>
            {showEditProfile && (
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg">
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            {!showEditProfile ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="font-bold text-lg">{profileData.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email Address</p>
                    <p className="font-medium text-gray-700">{profileData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Role</p>
                    <span className="inline-block bg-[#FFC93C] text-gray-900 px-3 py-1 rounded-lg text-sm font-bold">
                      {profileData.role}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Edit Form */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={handleProfileUpdate}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowEditProfile(false)}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Security</h2>
            <p className="text-sm text-gray-600">Manage your account security and password</p>
          </div>
          {!showChangePassword && (
            <button
              onClick={() => setShowChangePassword(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span className="font-semibold text-sm">Change Password</span>
            </button>
          )}
        </div>

        {showChangePassword ? (
          <div className="max-w-2xl space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                />
                <button
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Password must be at least 8 characters long</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handlePasswordChange}
                disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Update Password
              </button>
              <button
                onClick={() => {
                  setShowChangePassword(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-bold mb-1">Password Protection Active</p>
              <p className="text-sm text-gray-600">Your account is secured with a strong password</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
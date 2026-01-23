"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search,
  Bell,
  MoreVertical,
  Eye,
  Trash2,
  Ban,
  UserPlus,
  Download,
  Filter,
  X
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: string;
  avatar: string;
}

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<'users' | 'blocked'>('users');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter()

  const users: User[] = [
    {
      id: '1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@email.com',
      phone: '+91 98765 43210',
      joinDate: 'Jan 15, 2024',
      status: 'Active',
      avatar: 'AS'
    },
    {
      id: '2',
      name: 'Priya Singh',
      email: 'priya.singh@email.com',
      phone: '+91 98765 43211',
      joinDate: 'Jan 18, 2024',
      status: 'Active',
      avatar: 'PS'
    },
    {
      id: '3',
      name: 'Rahul Verma',
      email: 'rahul.verma@email.com',
      phone: '+91 98765 43212',
      joinDate: 'Jan 20, 2024',
      status: 'Active',
      avatar: 'RV'
    },
    {
      id: '4',
      name: 'Sneha Patel',
      email: 'sneha.patel@email.com',
      phone: '+91 98765 43213',
      joinDate: 'Jan 22, 2024',
      status: 'Active',
      avatar: 'SP'
    },
    {
      id: '5',
      name: 'Vikram Kumar',
      email: 'vikram.kumar@email.com',
      phone: '+91 98765 43214',
      joinDate: 'Jan 25, 2024',
      status: 'Active',
      avatar: 'VK'
    },
    {
      id: '6',
      name: 'Ananya Desai',
      email: 'ananya.desai@email.com',
      phone: '+91 98765 43215',
      joinDate: 'Jan 28, 2024',
      status: 'Active',
      avatar: 'AD'
    },
    {
      id: '7',
      name: 'Arjun Malhotra',
      email: 'arjun.malhotra@email.com',
      phone: '+91 98765 43216',
      joinDate: 'Feb 01, 2024',
      status: 'Active',
      avatar: 'AM'
    },
    {
      id: '8',
      name: 'Diya Reddy',
      email: 'diya.reddy@email.com',
      phone: '+91 98765 43217',
      joinDate: 'Feb 03, 2024',
      status: 'Active',
      avatar: 'DR'
    }
  ];

  const blockedUsers: User[] = [
    {
      id: '101',
      name: 'Rohan Gupta',
      email: 'rohan.gupta@email.com',
      phone: '+91 98765 43220',
      joinDate: 'Dec 10, 2023',
      status: 'Blocked',
      avatar: 'RG'
    },
    {
      id: '102',
      name: 'Kavya Joshi',
      email: 'kavya.joshi@email.com',
      phone: '+91 98765 43221',
      joinDate: 'Dec 15, 2023',
      status: 'Blocked',
      avatar: 'KJ'
    }
  ];

  const currentUsers = activeTab === 'users' ? users : blockedUsers;

  const handleMenuClick = (userId: string) => {
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  const handleAction = (action: string, user: User) => {
    console.log(`${action} for user:`, user.name);
    router.push("userdetails")
    setOpenMenuId(null);
  };

  return (
    <div className="p-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-sm text-gray-600">Manage all users and their access</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="font-semibold text-sm">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
            <UserPlus className="w-4 h-4" />
            <span className="font-semibold text-sm">Add New User</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'users'
              ? 'bg-white shadow-sm'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('blocked')}
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'blocked'
              ? 'bg-white shadow-sm'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          Blocked Users ({blockedUsers.length})
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span className="font-semibold text-sm">Filter</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{user.avatar}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">{user.joinDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => handleMenuClick(user.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuId === user.id && (
                        <>
                          {/* Backdrop */}
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenuId(null)}
                          />
                          
                          {/* Menu */}
                          <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                            <button
                              onClick={() => handleAction('View Detail', user)}
                              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-700">View Detail</span>
                            </button>
                            
                            {activeTab === 'users' && (
                              <button
                                onClick={() => handleAction('Block User', user)}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                              >
                                <Ban className="w-4 h-4 text-orange-600" />
                                <span className="text-sm font-medium text-orange-600">Block User</span>
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleAction('Delete User', user)}
                              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium text-red-600">Delete User</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{currentUsers.length}</span> of{' '}
            <span className="font-semibold">{currentUsers.length}</span> users
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
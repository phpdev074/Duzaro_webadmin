"use client";
import React, { useEffect, useState } from 'react';
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
import { GetUserList } from '@/app/api/ApiHelper/userHelper';
import { IMAGE_BASE_URL } from '@/app/api/api';
import { createPortal } from 'react-dom';

interface User {
  fullName: any;
  profilePictureUrl: any;
  countryCode: any;
  mobileNumber: any;
  createdAt: string | number | Date;
  isComplated: any;
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: string;
  avatar: string;
}

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'blocked'>('users');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const limit = 10;
  const router = useRouter()

  // const users: User[] = [
  //   {
  //     id: '1',
  //     name: 'Aarav Sharma',
  //     email: 'aarav.sharma@email.com',
  //     phone: '+91 98765 43210',
  //     joinDate: 'Jan 15, 2024',
  //     status: 'Active',
  //     avatar: 'AS'
  //   },
  //   {
  //     id: '2',
  //     name: 'Priya Singh',
  //     email: 'priya.singh@email.com',
  //     phone: '+91 98765 43211',
  //     joinDate: 'Jan 18, 2024',
  //     status: 'Active',
  //     avatar: 'PS'
  //   },
  //   {
  //     id: '3',
  //     name: 'Rahul Verma',
  //     email: 'rahul.verma@email.com',
  //     phone: '+91 98765 43212',
  //     joinDate: 'Jan 20, 2024',
  //     status: 'Active',
  //     avatar: 'RV'
  //   },
  //   {
  //     id: '4',
  //     name: 'Sneha Patel',
  //     email: 'sneha.patel@email.com',
  //     phone: '+91 98765 43213',
  //     joinDate: 'Jan 22, 2024',
  //     status: 'Active',
  //     avatar: 'SP'
  //   },
  //   {
  //     id: '5',
  //     name: 'Vikram Kumar',
  //     email: 'vikram.kumar@email.com',
  //     phone: '+91 98765 43214',
  //     joinDate: 'Jan 25, 2024',
  //     status: 'Active',
  //     avatar: 'VK'
  //   },
  //   {
  //     id: '6',
  //     name: 'Ananya Desai',
  //     email: 'ananya.desai@email.com',
  //     phone: '+91 98765 43215',
  //     joinDate: 'Jan 28, 2024',
  //     status: 'Active',
  //     avatar: 'AD'
  //   },
  //   {
  //     id: '7',
  //     name: 'Arjun Malhotra',
  //     email: 'arjun.malhotra@email.com',
  //     phone: '+91 98765 43216',
  //     joinDate: 'Feb 01, 2024',
  //     status: 'Active',
  //     avatar: 'AM'
  //   },
  //   {
  //     id: '8',
  //     name: 'Diya Reddy',
  //     email: 'diya.reddy@email.com',
  //     phone: '+91 98765 43217',
  //     joinDate: 'Feb 03, 2024',
  //     status: 'Active',
  //     avatar: 'DR'
  //   }
  // ];

  const blockedUsers: User[] = [

  ];

  const currentUsers = activeTab === 'users' ? users : blockedUsers;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
      // setBlockedPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const GetUsersData = async () => {
    setIsLoading(true);
    // setUsers([]);
    try {
      const respo = await GetUserList({ search: debouncedSearch, page, limit });

      setUsers(respo.data.data || []);
      setTotalPages(respo.data.pagination.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetUsersData();
  }, [debouncedSearch, page])

  const handleMenuClick = (
    userId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom + 8,
      left: rect.right - 192, // dropdown width
    });

    setOpenMenuId(openMenuId === userId ? null : userId);
  };


  const handleAction = (action: string, user: User) => {
    console.log(`${action} for user:`, user.fullName);
    sessionStorage.setItem('selectedUser', JSON.stringify(user));
    router.push("userdetails")
    setOpenMenuId(null);
  };

  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);


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
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'users'
            ? 'bg-white shadow-sm'
            : 'text-gray-600 hover:text-black'
            }`}
        >
          Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('blocked')}
          className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'blocked'
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              {currentUsers.map((user) => {
                const initials =
                  user?.fullName?.trim()
                    ? user.fullName
                      .trim()
                      .split(/\s+/)
                      .map((n: string) => n.charAt(0))
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()
                    : 'NA';

                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
                          {user?.profilePictureUrl ? (
                            <img
                              src={
                                user.profilePictureUrl.startsWith('https')
                                  ? user.profilePictureUrl
                                  : `${IMAGE_BASE_URL}${user.profilePictureUrl}`
                              }
                              alt={user.fullName}
                              className="block w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-500 text-white font-semibold text-xs">
                              {initials}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{user.fullName}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{user.countryCode} {user.mobileNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${user.isComplated
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {user.isComplated ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={(e) => handleMenuClick(user.id, e)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId && menuPosition &&
                          createPortal(
                            <>
                              {/* Backdrop */}
                              <div
                                className="fixed inset-0 z-[9998]"
                                onClick={() => setOpenMenuId(null)}
                              />

                              {/* Dropdown */}
                              <div
                                className="fixed z-[9999] w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                                style={{
                                  top: menuPosition.top,
                                  left: menuPosition.left,
                                }}
                              >
                                <button
                                  onClick={() => {
                                    const user = currentUsers.find(u => u.id === openMenuId)!;
                                    handleAction("View Detail", user);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                                >
                                  <Eye className="w-4 h-4 text-gray-600" />
                                  <span className="text-sm font-medium text-gray-700">
                                    View Detail
                                  </span>
                                </button>

                                {activeTab === "users" && (
                                  <button
                                    onClick={() => {
                                      const user = currentUsers.find(u => u.id === openMenuId)!;
                                      handleAction("Block User", user);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                                  >
                                    <Ban className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-medium text-orange-600">
                                      Block User
                                    </span>
                                  </button>
                                )}

                                <button
                                  onClick={() => {
                                    const user = currentUsers.find(u => u.id === openMenuId)!;
                                    handleAction("Delete User", user);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                  <span className="text-sm font-medium text-red-600">
                                    Delete User
                                  </span>
                                </button>
                              </div>
                            </>,
                            document.body
                          )}

                      </div>
                    </td>
                  </tr>
                )
              })}
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
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors
      ${page === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'}
    `}
            >
              Previous
            </button>

            <span className="text-sm text-gray-600 font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors
      ${page === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'}
    `}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
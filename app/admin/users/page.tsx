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
import { GetUserList, BlockUser, UnblockUser, ToggleBlockUser, DeleteUser } from '@/app/api/ApiHelper/userHelper';
import { IMAGE_BASE_URL } from '@/app/api/api';
import { createPortal } from 'react-dom';
import Swal from 'sweetalert2';

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
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);
  const [blockedTotalPages, setBlockedTotalPages] = useState(1);
  const [blockedTotalUsers, setBlockedTotalUsers] = useState(0);
  const [blockedPage, setBlockedPage] = useState(1);

  const limit = 10;
  const router = useRouter()

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
    const currentPage = activeTab === "users" ? page : blockedPage;

    try {
      const respo = await GetUserList({
        search: debouncedSearch,
        page: currentPage,
        limit,
        isBlocked: activeTab === "blocked",
      });

      const resData = respo.data || {};
      const pagination = resData.pagination || resData;

      const userList = Array.isArray(resData.data)
        ? resData.data
        : (resData.data?.data || []);

      // If page > 1 and returned 0 items, step back to previous page
      if (userList.length === 0 && currentPage > 1) {
        if (activeTab === "users") {
          setPage((prev) => Math.max(prev - 1, 1));
        } else {
          setBlockedPage((prev) => Math.max(prev - 1, 1));
        }
        return;
      }

      const rawTotal = Number(pagination?.total ?? pagination?.totalUsers ?? 0);

      let computedTotalPages = Number(pagination?.totalPages || (rawTotal > 0 ? Math.ceil(rawTotal / limit) : 1));

      // If current page returned fewer items than limit, this IS the last page
      if (userList.length < limit && userList.length > 0) {
        computedTotalPages = currentPage;
      }

      if (activeTab === "users") {
        setUsers(userList);
        setTotalUsers(rawTotal || userList.length);
        setTotalPages(computedTotalPages || 1);
      } else {
        setBlockedUsers(userList);
        setBlockedTotalUsers(rawTotal || userList.length);
        setBlockedTotalPages(computedTotalPages || 1);
      }
    } catch (error) {
      console.error("GetUsersData error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetUsersData();
  }, [debouncedSearch, page, blockedPage, activeTab]);

  useEffect(() => {
    if (activeTab === "users") {
      setPage(1);
    } else {
      setBlockedPage(1);
    }
  }, [activeTab]);

  const handleMenuClick = (
    userId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dropdownHeight = 145; // Approximate dropdown height for 3 options

    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < dropdownHeight + 10;

    setMenuPosition({
      top: openUpward ? Math.max(8, rect.top - dropdownHeight - 6) : rect.bottom + 8,
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

  const handleToggleBlockUser = async (user: User) => {
    setOpenMenuId(null);
    try {
      const res = activeTab === "users" ? await BlockUser(user.id) : await UnblockUser(user.id);
      if (res.data?.success || res.status === 200) {
        GetUsersData();
      }
    } catch (error) {
      console.error("Error toggling block status:", error);
    }
  };

  const handleDeleteUser = async (user: User) => {
    setOpenMenuId(null);

    const result = await Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${user.fullName || "this user"}? You can recover or restore this user later.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await DeleteUser(user.id);
      if (res.data?.success || res.status === 200) {
        Swal.fire("Deleted!", "User has been deleted.", "success");
        GetUsersData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error!", "Failed to delete user.", "error");
    }
  };

  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (openMenuId) {
        setOpenMenuId(null);
      }
    };

    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [openMenuId]);


  const currentTotal = activeTab === 'users' ? totalUsers : blockedTotalUsers;
  const currentPage = activeTab === 'users' ? page : blockedPage;
  const currentMaxPages = activeTab === 'users' ? totalPages : blockedTotalPages;

  const isLastPage = currentPage >= currentMaxPages || currentUsers.length < limit;
  const startItem = currentUsers.length === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = (currentPage - 1) * limit + currentUsers.length;

  return (
    <div className="flex flex-col h-full min-h-0 overflow-y-auto lg:overflow-hidden px-4 lg:px-6 pt-3 lg:pt-4 pb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Page Header */}
      <div className="mb-2.5 flex-shrink-0">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-xs text-gray-500">Manage all users and their access</p>
      </div>

      {/* Controls Bar: Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 flex-shrink-0">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-gray-200/70 p-1 rounded-xl w-fit flex-shrink-0">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all ${activeTab === 'users'
              ? 'bg-white shadow-xs text-black'
              : 'text-gray-600 hover:text-black'
              }`}
          >
            Users ({totalUsers || users.length})
          </button>
          <button
            onClick={() => setActiveTab('blocked')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all ${activeTab === 'blocked'
              ? 'bg-white shadow-xs text-black'
              : 'text-gray-600 hover:text-black'
              }`}
          >
            Blocked Users ({blockedTotalUsers || blockedUsers.length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
          />
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="overflow-y-auto overflow-x-auto flex-1 max-h-[calc(100vh-250px)] lg:max-h-none">
          <table className="w-full">
            <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 shadow-2xs">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center flex-shrink-0">
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
                          <div className="font-semibold text-xs lg:text-sm">{user.fullName}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-2.5">
                      <div className="text-xs lg:text-sm text-gray-700">{user.countryCode} {user.mobileNumber}</div>
                    </td>
                    <td className="px-5 py-2.5">
                      <div className="text-xs lg:text-sm text-gray-700">
                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: '2-digit',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-5 py-2.5">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${user.isComplated
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                          }`}
                      >
                        {user.isComplated ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-2.5">
                      <div className="relative">
                        <button
                          onClick={(e) => handleMenuClick(user.id, e)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
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

                                {activeTab === "users" ? (
                                  <button
                                    onClick={() => {
                                      const user = currentUsers.find(u => u.id === openMenuId)!;
                                      if (user) handleToggleBlockUser(user);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                                  >
                                    <Ban className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-medium text-orange-600">
                                      Block User
                                    </span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      const user = currentUsers.find(u => u.id === openMenuId)!;
                                      if (user) handleToggleBlockUser(user);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                                  >
                                    <Ban className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium text-green-600">
                                      Unblock User
                                    </span>
                                  </button>
                                )}

                                <button
                                  onClick={() => {
                                    const user = currentUsers.find(u => u.id === openMenuId)!;
                                    if (user) handleDeleteUser(user);
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
        <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between flex-shrink-0 bg-white">
          <div className="text-xs lg:text-sm text-gray-600">
            Showing <span className="font-semibold">{startItem} - {endItem}</span> of{' '}
            <span className="font-semibold">{currentTotal || currentUsers.length}</span> users
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() =>
                activeTab === "users"
                  ? setPage((p) => Math.max(p - 1, 1))
                  : setBlockedPage((p) => Math.max(p - 1, 1))
              }
              className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-colors
      ${currentPage <= 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'}
    `}
            >
              Previous
            </button>

            <span className="text-xs lg:text-sm text-gray-600 font-medium">
              Page {currentPage} of {currentMaxPages}
            </span>

            <button
              disabled={isLastPage}
              onClick={() =>
                activeTab === "users"
                  ? setPage((p) => Math.min(p + 1, totalPages))
                  : setBlockedPage((p) => Math.min(p + 1, blockedTotalPages))
              }
              className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-colors
      ${isLastPage
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
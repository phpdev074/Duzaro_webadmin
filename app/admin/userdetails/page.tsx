"use client"
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Ban,
  CheckCircle,
  Briefcase,
  Star,
  Clock,
  Building2,
  Image as ImageIcon,
  CreditCard,
  FileText,
  IdCard,
  Radius
} from 'lucide-react';
import { IMAGE_BASE_URL } from '@/app/api/api';
import { useRouter } from 'next/navigation';
import { BlockUser, UnblockUser } from '@/app/api/ApiHelper/userHelper';
import Swal from 'sweetalert2';

interface UserDetailProps {
  onBack?: () => void;
}

export default function UserDetail({ onBack }: UserDetailProps) {
  const [activeMainTab, setActiveMainTab] = useState<'user' | 'vendor'>('vendor');
  const [activeUserTab, setActiveUserTab] = useState<'overview' | 'bookings' | 'reviews'>('overview');
  const [activeVendorTab, setActiveVendorTab] = useState<'basic' | 'presence' | 'services' | 'time' | 'trust' | 'bank' | 'portfolio'>('basic');
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('selectedUser');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleToggleBlock = async () => {
    if (!userData) return;
    try {
      const res = userData.isComplated ? await BlockUser(userData.id) : await UnblockUser(userData.id);
      if (res.data?.success || res.status === 200) {
        const updated = { ...userData, isComplated: !userData.isComplated };
        setUserData(updated);
        sessionStorage.setItem('selectedUser', JSON.stringify(updated));
        Swal.fire({
          icon: 'success',
          title: updated.isComplated ? 'User Unblocked' : 'User Blocked',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const vendorData = {
    intro: 'Professional cleaning and home maintenance services with 10+ years of experience. Specialized in residential and commercial cleaning, deep cleaning, and sanitization services.',
    businessAddress: 'Shop No. 12, Sunrise Complex, Andheri West',
    city: 'Mumbai',
    pin: '400058',
    serviceArea: '10 km',
    services: [
      { name: 'Home Cleaning', subServices: ['Deep Cleaning', 'Regular Cleaning', 'Kitchen Cleaning'] },
      { name: 'AC Service', subServices: ['AC Repair', 'AC Installation', 'AC Maintenance'] },
      { name: 'Plumbing', subServices: ['Tap Repair', 'Pipe Fitting', 'Bathroom Fitting'] }
    ],
    schedule: [
      { day: 'Monday', time: '9:00 AM - 6:00 PM' },
      { day: 'Tuesday', time: '9:00 AM - 6:00 PM' },
      { day: 'Wednesday', time: '9:00 AM - 6:00 PM' },
      { day: 'Thursday', time: '9:00 AM - 6:00 PM' },
      { day: 'Friday', time: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
      { day: 'Sunday', time: 'Closed' }
    ],
    trust: {
      aadhaarNumber: '1234 5678 9012',
      gstNumber: '27AABCU9603R1ZM'
    },
    bank: {
      upiId: 'aarav@paytm',
      bankNumber: '1234567890123456',
      ifscCode: 'HDFC0001234'
    }
  };

  const bookings = [
    { id: 1, service: 'Home Cleaning', category: 'Cleaning Services', date: 'Feb 15, 2024', amount: 1500, status: 'Completed', vendor: 'Clean Pro Services' },
    { id: 2, service: 'AC Repair', category: 'Repair Services', date: 'Feb 10, 2024', amount: 2800, status: 'Completed', vendor: 'Cool Tech Solutions' },
    { id: 3, service: 'Plumbing Service', category: 'Home Services', date: 'Feb 05, 2024', amount: 1200, status: 'Completed', vendor: 'Quick Fix Plumbers' },
    { id: 4, service: 'Electrical Work', category: 'Home Services', date: 'Jan 28, 2024', amount: 3500, status: 'Cancelled', vendor: 'Spark Electricals' }
  ];

  const reviews = [
    { id: 1, service: 'Home Cleaning', rating: 5, comment: 'Excellent service! The team was professional and thorough.', date: 'Feb 16, 2024', vendor: 'Clean Pro Services' },
    { id: 2, service: 'AC Repair', rating: 4, comment: 'Good work, but took slightly longer than expected.', date: 'Feb 11, 2024', vendor: 'Cool Tech Solutions' },
    { id: 3, service: 'Plumbing Service', rating: 5, comment: 'Very satisfied with the quick response and quality work.', date: 'Feb 06, 2024', vendor: 'Quick Fix Plumbers' }
  ];

  if (!userData) {
    return (
      <div className="p-6 text-xs text-gray-500 font-medium">
        Loading user details...
      </div>
    );
  }

  const initials =
    userData?.fullName?.trim()
      ? userData.fullName
        .trim()
        .split(/\s+/)
        .map((n: string) => n.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
      : 'NA';

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden px-4 lg:px-6 pt-3 lg:pt-4 pb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">User Details</h1>
            <p className="text-xs text-gray-500">View and manage detailed profile information</p>
          </div>
        </div>

        <button
          onClick={handleToggleBlock}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-semibold shadow-xs ${
            userData?.isComplated
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <Ban className="w-3.5 h-3.5" />
          {userData?.isComplated ? 'Block User' : 'Unblock User'}
        </button>
      </div>

      {/* User Profile Overview Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3.5 lg:p-4 shadow-xs border border-gray-200 mb-3 flex-shrink-0">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center flex-shrink-0 border-2 border-white shadow-xs">
            {userData?.profilePictureUrl ? (
              <img
                src={userData.profilePictureUrl.startsWith('https') ? userData.profilePictureUrl : `${IMAGE_BASE_URL}${userData.profilePictureUrl}`}
                alt={userData.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-bold text-lg">{initials}</span>
            )}
          </div>

          {/* User Details Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1.5">
              <h2 className="text-base lg:text-lg font-bold text-gray-900 truncate">{userData.fullName}</h2>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                  userData?.isComplated
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {userData?.isComplated ? <CheckCircle className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                {userData?.isComplated ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2 bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-100">
                <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-medium">Email</p>
                  <p className="font-semibold text-gray-700 truncate">{userData.email || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-100">
                <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-medium">Phone</p>
                  <p className="font-semibold text-gray-700 truncate">{userData.countryCode} {userData.mobileNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-100">
                <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-medium">Joined</p>
                  <p className="font-semibold text-gray-700 truncate">{new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-50/80 px-2.5 py-1.5 rounded-lg border border-gray-100">
                <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-medium">Location</p>
                  <p className="font-semibold text-gray-700 truncate">{userData.address || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Container */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xs border border-gray-200 flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Main Tab Header */}
        <div className="border-b border-gray-200 px-4 bg-gray-50/50 flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveMainTab('vendor')}
              className={`py-2.5 px-3 border-b-2 font-bold text-xs transition-colors ${
                activeMainTab === 'vendor'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Vendor Info
            </button>
            <button
              onClick={() => setActiveMainTab('user')}
              className={`py-2.5 px-3 border-b-2 font-bold text-xs transition-colors ${
                activeMainTab === 'user'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              User Info
            </button>
          </div>
        </div>

        {/* Vendor Sub-Tabs Bar */}
        {activeMainTab === 'vendor' && (
          <div className="border-b border-gray-100 px-4 bg-white flex-shrink-0 overflow-x-auto">
            <div className="flex gap-1 py-1">
              {[
                { id: 'basic', label: 'Basic' },
                { id: 'presence', label: 'Presence' },
                { id: 'services', label: 'Services' },
                { id: 'time', label: 'Time' },
                { id: 'trust', label: 'Trust' },
                { id: 'bank', label: 'Bank' },
                { id: 'portfolio', label: 'Portfolio' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveVendorTab(tab.id as any)}
                  className={`py-1 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeVendorTab === tab.id
                      ? 'bg-black text-white shadow-2xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* User Sub-Tabs Bar */}
        {activeMainTab === 'user' && (
          <div className="border-b border-gray-100 px-4 bg-white flex-shrink-0 overflow-x-auto">
            <div className="flex gap-1 py-1">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'bookings', label: `Bookings (${bookings.length})` },
                { id: 'reviews', label: `Reviews (${reviews.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveUserTab(tab.id as any)}
                  className={`py-1 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeUserTab === tab.id
                      ? 'bg-black text-white shadow-2xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content Body (Scrollable area) */}
        <div className="flex-1 overflow-y-auto p-3.5 lg:p-4 min-h-0">
          {/* Vendor Info Tabs Content */}
          {activeMainTab === 'vendor' && (
            <>
              {activeVendorTab === 'basic' && (
                <div className="space-y-3">
                  <h3 className="font-bold text-xs lg:text-sm text-gray-900">Profile Information</h3>
                  <div className="flex flex-col sm:flex-row items-start gap-4 bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FFC93C] to-orange-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-xs flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-900 mb-1">{userData.fullName}</h4>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Introduction</p>
                      <p className="text-xs text-gray-700 leading-relaxed bg-white p-2.5 rounded-lg border border-gray-200/80">{vendorData.intro}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeVendorTab === 'presence' && (
                <div className="space-y-3">
                  <h3 className="font-bold text-xs lg:text-sm text-gray-900">Business Presence</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Building2 className="w-3.5 h-3.5 text-gray-500" />
                        <p className="text-[11px] font-semibold text-gray-500">Business Address</p>
                      </div>
                      <p className="text-xs font-semibold text-gray-800">{vendorData.businessAddress}</p>
                    </div>

                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        <p className="text-[11px] font-semibold text-gray-500">City</p>
                      </div>
                      <p className="text-xs font-semibold text-gray-800">{vendorData.city}</p>
                    </div>

                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        <p className="text-[11px] font-semibold text-gray-500">PIN Code</p>
                      </div>
                      <p className="text-xs font-semibold text-gray-800">{vendorData.pin}</p>
                    </div>

                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Radius className="w-3.5 h-3.5 text-gray-500" />
                        <p className="text-[11px] font-semibold text-gray-500">Service Radius</p>
                      </div>
                      <p className="text-xs font-semibold text-gray-800">{vendorData.serviceArea}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeVendorTab === 'services' && (
                <div className="space-y-3">
                  <h3 className="font-bold text-xs lg:text-sm text-gray-900">Services Offered</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {vendorData.services.map((service, index) => (
                      <div key={index} className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-7 h-7 bg-[#FFC93C] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-3.5 h-3.5 text-gray-900" />
                          </div>
                          <h4 className="font-bold text-xs text-gray-900">{service.name}</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {service.subServices.map((sub, subIndex) => (
                            <span key={subIndex} className="px-2 py-0.5 bg-white rounded-md text-[11px] font-semibold text-gray-700 border border-gray-200">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeVendorTab === 'time' && (
                <div className="space-y-3">
                  <h3 className="font-bold text-xs lg:text-sm text-gray-900">Working Hours Schedule</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {vendorData.schedule.map((schedule, index) => (
                      <div key={index} className="bg-gray-50/80 p-2.5 rounded-xl border border-gray-100 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <p className="font-bold text-xs text-gray-800">{schedule.day}</p>
                        </div>
                        <p className={`text-[11px] font-semibold ${schedule.time === 'Closed' ? 'text-red-600' : 'text-gray-600'}`}>
                          {schedule.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeVendorTab === 'trust' && (
                <div className="space-y-3">
                  <h3 className="font-bold text-xs lg:text-sm text-gray-900">Trust & Verification Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <IdCard className="w-4 h-4 text-gray-600" />
                        <h4 className="font-bold text-xs text-gray-900">Aadhaar Card</h4>
                        <span className="ml-auto text-xs font-bold text-gray-700">{vendorData.trust.aadhaarNumber}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white p-2 rounded-lg border border-dashed border-gray-300 text-center">
                          <div className="h-16 bg-gray-100 rounded-md flex items-center justify-center mb-1">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-[10px] font-medium text-gray-500">Front Side</p>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-dashed border-gray-300 text-center">
                          <div className="h-16 bg-gray-100 rounded-md flex items-center justify-center mb-1">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-[10px] font-medium text-gray-500">Back Side</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <h4 className="font-bold text-xs text-gray-900">GST Certificate</h4>
                        <span className="ml-auto text-xs font-bold text-gray-700">{vendorData.trust.gstNumber}</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-dashed border-gray-300 text-center">
                        <div className="h-16 bg-gray-100 rounded-md flex items-center justify-center mb-1">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-[10px] font-medium text-gray-500">GST Certificate Image</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeVendorTab === 'bank' && (
                <div className="space-y-3">
                  <h3 className="font-bold text-xs lg:text-sm text-gray-900">Bank Details & Payment Setup</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase">UPI ID</p>
                        <p className="font-bold text-xs text-gray-900">{vendorData.bank.upiId}</p>
                      </div>
                      <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase">Account Number</p>
                        <p className="font-bold text-xs text-gray-900">{vendorData.bank.bankNumber}</p>
                      </div>
                      <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                        <p className="text-[10px] font-semibold text-gray-400 uppercase">IFSC Code</p>
                        <p className="font-bold text-xs text-gray-900">{vendorData.bank.ifscCode}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1.5 mb-2">
                        <CreditCard className="w-4 h-4 text-gray-600" />
                        <span className="font-bold text-xs text-gray-900">Payment QR Code</span>
                      </div>
                      <div className="w-24 h-24 bg-white p-2 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeVendorTab === 'portfolio' && (
                <div className="space-y-3">
                  <h3 className="font-bold text-xs lg:text-sm text-gray-900">Work Portfolio Gallery</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="bg-gray-50 p-2.5 rounded-xl border border-dashed border-gray-300 text-center">
                        <div className="h-20 bg-gray-200/70 rounded-lg flex items-center justify-center mb-1">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-[10px] font-medium text-gray-600">Sample {item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* User Info Content */}
          {activeMainTab === 'user' && (
            <>
              {activeUserTab === 'overview' && (
                <div className="space-y-3">
                  <h3 className="font-bold text-xs lg:text-sm text-gray-900">Recent Activity</h3>
                  <div className="space-y-2">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-2xs border border-gray-100">
                            <Briefcase className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-gray-900">{booking.service}</p>
                            <p className="text-[11px] text-gray-500">{booking.vendor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xs text-gray-900">₹{booking.amount.toLocaleString()}</p>
                          <p className="text-[10px] text-gray-400">{booking.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeUserTab === 'bookings' && (
                <div className="space-y-2">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50/80 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-2xs border border-gray-100">
                          <Briefcase className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-gray-900">{booking.service}</p>
                          <p className="text-[11px] text-gray-500">{booking.vendor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-xs text-gray-900">₹{booking.amount.toLocaleString()}</p>
                          <p className="text-[10px] text-gray-400">{booking.date}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          booking.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeUserTab === 'reviews' && (
                <div className="space-y-2.5">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-3 bg-gray-50/80 rounded-xl border border-gray-100">
                      <div className="flex items-start justify-between mb-1.5">
                        <div>
                          <p className="font-bold text-xs text-gray-900">{review.service}</p>
                          <p className="text-[11px] text-gray-500 mb-1">{review.vendor}</p>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, index) => (
                              <Star key={index} className={`w-3 h-3 ${index < review.rating ? 'fill-[#FFC93C] text-[#FFC93C]' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-400">{review.date}</p>
                      </div>
                      <p className="text-xs text-gray-700 leading-normal bg-white p-2 rounded-lg border border-gray-100">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

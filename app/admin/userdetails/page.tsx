"use client"
import  { useState } from 'react';
import { 
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Edit2,
  Ban,
  CheckCircle,
  DollarSign,
  Briefcase,
  Star,
  Clock,
  MoreVertical,
  User,
  Building2,
  Home,
  Image as ImageIcon,
  CreditCard,
  FileText,
  CheckCircle2,
  IdCard,
  Radius
} from 'lucide-react';

interface UserDetailProps {
  onBack?: () => void;
}

export default function UserDetail({ onBack }: UserDetailProps) {
  const [activeMainTab, setActiveMainTab] = useState<'user' | 'vendor'>('user');
  const [activeUserTab, setActiveUserTab] = useState<'overview' | 'bookings' | 'reviews'>('overview');
  const [activeVendorTab, setActiveVendorTab] = useState<'basic' | 'presence' | 'services' | 'time' | 'trust' | 'bank' | 'portfolio'>('basic');
  
  // Mock user data
  const userData = {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aaravsharma@email.com',
    phone: '+91 98765 43210',
    initials: 'AS',
    joinDate: 'Jan 15, 2024',
    location: 'Mumbai, Maharashtra',
    status: 'Active',
    totalBookings: 24,
    totalSpent: 45600,
    averageRating: 4.8,
    totalReviews: 18
  };

  // Mock vendor data
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
    {
      id: 1,
      service: 'Home Cleaning',
      category: 'Cleaning Services',
      date: 'Feb 15, 2024',
      amount: 1500,
      status: 'Completed',
      vendor: 'Clean Pro Services'
    },
    {
      id: 2,
      service: 'AC Repair',
      category: 'Repair Services',
      date: 'Feb 10, 2024',
      amount: 2800,
      status: 'Completed',
      vendor: 'Cool Tech Solutions'
    },
    {
      id: 3,
      service: 'Plumbing Service',
      category: 'Home Services',
      date: 'Feb 05, 2024',
      amount: 1200,
      status: 'Completed',
      vendor: 'Quick Fix Plumbers'
    },
    {
      id: 4,
      service: 'Electrical Work',
      category: 'Home Services',
      date: 'Jan 28, 2024',
      amount: 3500,
      status: 'Cancelled',
      vendor: 'Spark Electricals'
    }
  ];

  const reviews = [
    {
      id: 1,
      service: 'Home Cleaning',
      rating: 5,
      comment: 'Excellent service! The team was professional and thorough.',
      date: 'Feb 16, 2024',
      vendor: 'Clean Pro Services'
    },
    {
      id: 2,
      service: 'AC Repair',
      rating: 4,
      comment: 'Good work, but took slightly longer than expected.',
      date: 'Feb 11, 2024',
      vendor: 'Cool Tech Solutions'
    },
    {
      id: 3,
      service: 'Plumbing Service',
      rating: 5,
      comment: 'Very satisfied with the quick response and quality work.',
      date: 'Feb 06, 2024',
      vendor: 'Quick Fix Plumbers'
    }
  ];

  return (
    <div className="p-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">User Details</h1>
            <p className="text-sm text-gray-600">View and manage user information</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold">
            <Edit2 className="w-4 h-4" />
            Edit User
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold">
            <Ban className="w-4 h-4" />
            Block User
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
        <div className="flex items-start gap-6">
          {/* Profile Picture */}
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {userData.initials}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-bold ${
                    userData.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {userData.status === 'Active' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Ban className="w-4 h-4" />
                    )}
                    {userData.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email Address</p>
                  <p className="font-medium text-gray-700">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <p className="font-medium text-gray-700">{userData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Join Date</p>
                  <p className="font-medium text-gray-700">{userData.joinDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-medium text-gray-700">{userData.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{userData.totalBookings}</p>
          <p className="text-sm text-gray-600">Total Bookings</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">₹{userData.totalSpent.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Spent</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{userData.averageRating}</p>
          <p className="text-sm text-gray-600">Average Rating</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{userData.totalReviews}</p>
          <p className="text-sm text-gray-600">Total Reviews</p>
        </div>
      </div>

      {/* Main Tabs - User Info / Vendor Info */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveMainTab('user')}
              className={`py-4 px-2 border-b-2 transition-colors font-semibold ${
                activeMainTab === 'user'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              User Info
            </button>
            <button
              onClick={() => setActiveMainTab('vendor')}
              className={`py-4 px-2 border-b-2 transition-colors font-semibold ${
                activeMainTab === 'vendor'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Vendor Info
            </button>
          </div>
        </div>

        {/* User Info Content */}
        {activeMainTab === 'user' && (
          <>
            <div className="border-b border-gray-200 px-6 bg-gray-50">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveUserTab('overview')}
                  className={`py-3 px-3 border-b-2 transition-colors text-sm font-semibold ${
                    activeUserTab === 'overview'
                      ? 'border-[#FFC93C] text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveUserTab('bookings')}
                  className={`py-3 px-3 border-b-2 transition-colors text-sm font-semibold ${
                    activeUserTab === 'bookings'
                      ? 'border-[#FFC93C] text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Bookings ({bookings.length})
                </button>
                <button
                  onClick={() => setActiveUserTab('reviews')}
                  className={`py-3 px-3 border-b-2 transition-colors text-sm font-semibold ${
                    activeUserTab === 'reviews'
                      ? 'border-[#FFC93C] text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeUserTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {bookings.slice(0, 3).map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                              <Briefcase className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-bold mb-1">{booking.service}</p>
                              <p className="text-sm text-gray-600">{booking.vendor}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold mb-1">₹{booking.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{booking.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeUserTab === 'bookings' && (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <Briefcase className="w-7 h-7 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-1">{booking.service}</p>
                          <p className="text-sm text-gray-600 mb-1">{booking.vendor}</p>
                          <p className="text-xs text-gray-500">{booking.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Date</p>
                          <p className="font-semibold">{booking.date}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Amount</p>
                          <p className="font-bold text-lg">₹{booking.amount.toLocaleString()}</p>
                        </div>
                        <div className="text-center min-w-[100px]">
                          <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${
                            booking.status === 'Completed' 
                              ? 'bg-green-100 text-green-700'
                              : booking.status === 'Cancelled'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeUserTab === 'reviews' && (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-5 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-lg mb-1">{review.service}</p>
                          <p className="text-sm text-gray-600 mb-2">{review.vendor}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                className={`w-4 h-4 ${
                                  index < review.rating
                                    ? 'fill-[#FFC93C] text-[#FFC93C]'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Vendor Info Content */}
        {activeMainTab === 'vendor' && (
          <>
            <div className="border-b border-gray-200 px-6 bg-gray-50">
              <div className="flex gap-3 overflow-x-auto">
                <button
                  onClick={() => setActiveVendorTab('basic')}
                  className={`py-3 px-3 border-b-2 transition-colors text-sm font-semibold whitespace-nowrap ${
                    activeVendorTab === 'basic'
                      ? 'border-[#FFC93C] text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Basic
                </button>
                <button
                  onClick={() => setActiveVendorTab('presence')}
                  className={`py-3 px-3 border-b-2 transition-colors text-sm font-semibold whitespace-nowrap ${
                    activeVendorTab === 'presence'
                      ? 'border-[#FFC93C] text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Presence
                </button>
                <button
                  onClick={() => setActiveVendorTab('services')}
                  className={`py-3 px-3 border-b-2 transition-colors text-sm font-semibold whitespace-nowrap ${
                    activeVendorTab === 'services'
                      ? 'border-[#FFC93C] text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => setActiveVendorTab('time')}
                  className={`py-3 px-3 border-b-2 transition-colors text-sm font-semibold whitespace-nowrap ${
                    activeVendorTab === 'time'
                      ? 'border-[#FFC93C] text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Time
                </button>
                <button
                  onClick={() => setActiveVendorTab('trust')}
                  className={`py-3 px-3 border-b-2 transition-colors text-sm font-semibold whitespace-nowrap ${
                    activeVendorTab === 'trust'
                      ? 'border-[#FFC93C] text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Trust
                </button>
                <button
                  onClick={() => setActiveVendorTab('bank')}
                  className={`py-3 px-3 border-b-2 transition-colors text-sm font-semibold whitespace-nowrap ${
                    activeVendorTab === 'bank'
                      ? 'border-[#FFC93C] text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Bank
                </button>
                <button
                  onClick={() => setActiveVendorTab('portfolio')}
                  className={`py-3 px-3 border-b-2 transition-colors text-sm font-semibold whitespace-nowrap ${
                    activeVendorTab === 'portfolio'
                      ? 'border-[#FFC93C] text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Portfolio
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Basic Tab */}
              {activeVendorTab === 'basic' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Profile Information</h3>
                    <div className="flex items-start gap-6">
                      <div className="w-32 h-32 bg-gradient-to-br from-[#FFC93C] to-orange-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                        {userData.initials}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-3">{userData.name}</h4>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm font-semibold text-gray-600 mb-2">Introduction</p>
                          <p className="text-gray-700 leading-relaxed">{vendorData.intro}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Presence Tab */}
              {activeVendorTab === 'presence' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg mb-4">Business Presence</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <Building2 className="w-5 h-5 text-gray-600" />
                        <p className="text-sm font-semibold text-gray-600">Business Address</p>
                      </div>
                      <p className="font-medium text-gray-900">{vendorData.businessAddress}</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <p className="text-sm font-semibold text-gray-600">City</p>
                      </div>
                      <p className="font-medium text-gray-900">{vendorData.city}</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <p className="text-sm font-semibold text-gray-600">PIN Code</p>
                      </div>
                      <p className="font-medium text-gray-900">{vendorData.pin}</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <Radius className="w-5 h-5 text-gray-600" />
                        <p className="text-sm font-semibold text-gray-600">Service Area</p>
                      </div>
                      <p className="font-medium text-gray-900">{vendorData.serviceArea}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Services Tab */}
              {activeVendorTab === 'services' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg mb-4">Services Offered</h3>
                  
                  <div className="space-y-4">
                    {vendorData.services.map((service, index) => (
                      <div key={index} className="bg-gray-50 p-5 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-[#FFC93C] rounded-lg flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-gray-900" />
                          </div>
                          <h4 className="font-bold text-lg">{service.name}</h4>
                        </div>
                        <div className="pl-13">
                          <p className="text-sm font-semibold text-gray-600 mb-2">Sub-Services:</p>
                          <div className="flex flex-wrap gap-2">
                            {service.subServices.map((sub, subIndex) => (
                              <span
                                key={subIndex}
                                className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200"
                              >
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Time Tab */}
              {activeVendorTab === 'time' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg mb-4">Working Hours</h3>
                  
                  <div className="space-y-3">
                    {vendorData.schedule.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-gray-600" />
                          <p className="font-bold">{schedule.day}</p>
                        </div>
                        <p className={`font-semibold ${
                          schedule.time === 'Closed' ? 'text-red-600' : 'text-gray-700'
                        }`}>
                          {schedule.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Tab */}
              {activeVendorTab === 'trust' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg mb-4">Trust & Verification</h3>
                  
                  {/* Aadhaar Section */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <IdCard className="w-6 h-6 text-gray-600" />
                      <h4 className="font-bold text-lg">Aadhaar Card</h4>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Aadhaar Number</p>
                      <p className="font-bold text-xl text-gray-900">{vendorData.trust.aadhaarNumber}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-sm font-semibold text-center text-gray-600">Front Photo</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-sm font-semibold text-center text-gray-600">Back Photo</p>
                      </div>
                    </div>
                  </div>

                  {/* GST Section */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText className="w-6 h-6 text-gray-600" />
                      <h4 className="font-bold text-lg">GST Certificate</h4>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-600 mb-2">GST Number</p>
                      <p className="font-bold text-xl text-gray-900">{vendorData.trust.gstNumber}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 max-w-md">
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                      <p className="text-sm font-semibold text-center text-gray-600">GST Certificate Image</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Tab */}
              {activeVendorTab === 'bank' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg mb-4">Bank Details</h3>
                  
                  {/* QR Code */}
                  <div className="bg-gray-50 p-6 rounded-xl max-w-md">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                      <h4 className="font-bold text-lg">Payment QR Code</h4>
                    </div>
                    <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-300">
                      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="text-sm font-semibold text-center text-gray-600 mt-3">QR Code Image</p>
                    </div>
                  </div>

                  {/* Bank Information */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 p-5 rounded-xl">
                      <p className="text-sm font-semibold text-gray-600 mb-2">UPI ID</p>
                      <p className="font-bold text-lg text-gray-900">{vendorData.bank.upiId}</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Bank Account Number</p>
                      <p className="font-bold text-lg text-gray-900">{vendorData.bank.bankNumber}</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-xl">
                      <p className="text-sm font-semibold text-gray-600 mb-2">IFSC Code</p>
                      <p className="font-bold text-lg text-gray-900">{vendorData.bank.ifscCode}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Portfolio Tab */}
              {activeVendorTab === 'portfolio' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-lg mb-4">Work Portfolio</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="bg-gray-50 p-4 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-sm font-semibold text-center text-gray-600 mt-2">Work Image {item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LoginAdmin } from './api/ApiHelper/loginHelper';


export default function AdminLoginDesktop() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      router.replace('/admin');
    }
  }, [router]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateForm(value, password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validateForm(email, value);
  };

  const validateForm = (emailVal: string, passwordVal: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(emailVal);
    const isPasswordValid = passwordVal.length >= 6;
    setIsValid(isEmailValid && isPasswordValid);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin login:', { email, password, rememberMe });
    try {
      const payload = {
        email,
        password,
      };

      const response = await LoginAdmin(payload);
      // assuming backend response shape like:
      // { status: true, data: { token: "jwt-token-here" } }
      const token = response?.data?.data?.token;

      if (!token) {
        alert('Login failed: token not received');
        return;
      }

      // store token
      if (rememberMe) {
        localStorage.setItem('admin_token', token);
      } else {
        localStorage.setItem('admin_token', token);
      }

      router.push('/admin');
    } catch (error: any) {
      console.error('Admin login error:', error);
      alert(
        error?.response?.data?.message || 'Invalid email or password'
      );
    }
    // alert('Logging in as admin...');
    // router.push('/admin')
  };

  return (
    <div className="w-full h-screen h-dvh relative overflow-hidden mx-auto flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{
        background: 'linear-gradient(135deg, #E8EAED 0%, #F5F5DC 50%, #E8F5E9 100%)'
      }}
    >
      {/* Background Pattern - Subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 201, 60, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255, 201, 60, 0.02) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating Elements - Very Subtle */}
      <div className="absolute top-16 left-16 w-64 h-64 bg-[#FFC93C]/3 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-16 right-16 w-80 h-80 bg-[#FFC93C]/3 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative w-full max-w-7xl max-h-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center z-10">

        {/* Left Side - Branding */}
        <div className="flex flex-col justify-center lg:pr-6">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#FFC93C] to-[#FFD666] rounded-2xl lg:rounded-[20px] mb-3 lg:mb-5 shadow-xl shadow-[#FFC93C]/40 flex-shrink-0">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1F232A] tracking-wide">DZ</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1F232A] mb-2 lg:mb-4 tracking-tight leading-tight">
            Admin Portal
          </h1>

          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-4 lg:mb-8 leading-relaxed max-w-lg">
            Secure access to manage DUEZARO platform, monitor users, and oversee operations.
          </p>

          {/* Features */}
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-start gap-3 lg:gap-4">
              <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-[#FFC93C]/10 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 stroke-[#FFC93C]" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-[#1F232A] font-semibold text-xs sm:text-sm lg:text-base mb-0.5">User Management</h3>
                <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">Complete control over user accounts and permissions</p>
              </div>
            </div>

            <div className="flex items-start gap-3 lg:gap-4">
              <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-[#FFC93C]/10 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 stroke-[#FFC93C]" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M3 3v18h18"></path>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-[#1F232A] font-semibold text-xs sm:text-sm lg:text-base mb-0.5">Analytics Dashboard</h3>
                <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">Real-time insights and performance metrics</p>
              </div>
            </div>

            <div className="flex items-start gap-3 lg:gap-4">
              <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-[#FFC93C]/10 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 stroke-[#FFC93C]" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-[#1F232A] font-semibold text-xs sm:text-sm lg:text-base mb-0.5">Enhanced Security</h3>
                <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">Multi-layer authentication and encryption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl lg:rounded-3xl px-5 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 shadow-2xl border border-white/50 w-full max-w-[480px] mx-auto lg:ml-auto">

          {/* Welcome Section */}
          <div className="mb-3 lg:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1F232A] mb-1">Admin Login</h2>
            <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">Enter your credentials to access the admin panel</p>
          </div>

          {/* Security Badge */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-2 lg:px-4 lg:py-2.5 flex items-start gap-2.5 mb-3 lg:mb-5">
            <svg className="w-4 h-4 stroke-emerald-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <p className="text-xs text-gray-700 leading-relaxed">This is a secure area. Your session is encrypted and monitored.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-3 lg:mb-4">
              <label className="block text-gray-700 text-xs lg:text-sm font-semibold mb-1">
                Email Address
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 stroke-gray-500" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  type="email"
                  className="w-full bg-white/80 text-[#1F232A] py-2 lg:py-2.5 pl-10 pr-3.5 rounded-xl border-2 border-gray-300 text-xs lg:text-sm transition-all focus:outline-none focus:border-[#FFC93C] focus:shadow-[0_0_0_4px_rgba(255,201,60,0.1)] placeholder:text-gray-400"
                  placeholder="admin@duezaro.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3 lg:mb-4">
              <label className="block text-gray-700 text-xs lg:text-sm font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 stroke-gray-500" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white/80 text-[#1F232A] py-2 lg:py-2.5 pl-10 pr-10 rounded-xl border-2 border-gray-300 text-xs lg:text-sm transition-all focus:outline-none focus:border-[#FFC93C] focus:shadow-[0_0_0_4px_rgba(255,201,60,0.1)] placeholder:text-gray-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FFC93C] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between gap-2 mb-3 lg:mb-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border-2 transition-all ${rememberMe
                    ? 'bg-[#FFC93C] border-[#FFC93C]'
                    : 'bg-white/80 border-gray-300 group-hover:border-[#FFC93C]'
                    }`}>
                    {rememberMe && (
                      <svg className="w-full h-full stroke-[#1F232A]" viewBox="0 0 24 24" fill="none" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-xs text-[#FFC93C] font-semibold hover:text-[#FFD666] transition-colors">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 lg:py-3 bg-gradient-to-br from-[#FFC93C] to-[#FFD666] text-[#1F232A] rounded-xl font-bold text-xs lg:text-sm transition-all mb-3 lg:mb-4 shadow-lg shadow-[#FFC93C]/30 hover:shadow-xl hover:shadow-[#FFC93C]/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              disabled={!isValid}
            >
              Sign In to Admin Panel
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-600 text-xs">
            Need admin access? <a href="#" className="text-[#FFC93C] font-semibold hover:text-[#FFD666] transition-colors">Contact Super Admin</a>
          </p>

          <p className="text-center text-gray-600 text-[11px] lg:text-xs mt-1.5 lg:mt-2">
            Protected by DUEZARO Security • <a href="#" className="text-[#FFC93C] font-semibold hover:text-[#FFD666] transition-colors">View Logs</a>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from 'react';
import { Wrench, Rocket, Code2, Sparkles } from 'lucide-react';

export default function ContentPage() {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl max-w-2xl w-full border border-gray-200">
        {/* Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Animated background circles */}
            <div className="absolute inset-0 bg-[#FFC93C]/20 rounded-full blur-2xl animate-pulse"></div>
            
            {/* Main icon container */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-[#FFC93C] to-[#FFD65C] rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Wrench className="w-12 h-12 text-black" strokeWidth={2} />
            </div>

            {/* Floating icons */}
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md animate-bounce">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Under Development
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We're working hard to bring you something amazing! This feature is currently under construction and will be available soon.
          </p>

          {/* Feature Preview Cards */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Fast</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Powerful</p>
            </div>
            <div className="text-center p-4 bg-[#FFC93C]/20 rounded-xl hover:bg-[#FFC93C]/30 transition-colors">
              <div className="w-12 h-12 bg-[#FFC93C] rounded-full flex items-center justify-center mx-auto mb-2">
                <Code2 className="w-6 h-6 text-black" />
              </div>
              <p className="text-xs font-semibold text-gray-700">Intuitive</p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">Development Progress</span>
              <span className="text-sm font-bold text-[#FFC93C]">15%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FFC93C] to-[#FFD65C] rounded-full transition-all duration-500 ease-out"
                style={{ width: '15%' }}
              ></div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <button className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Notify Me When Ready
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
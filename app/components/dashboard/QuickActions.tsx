import React from 'react';
import { Briefcase, FolderOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const QuickActions: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 lg:p-4 border border-gray-100 shadow-2xs h-full flex flex-col justify-start">
      <h2 className="font-bold text-sm lg:text-base text-gray-900 mb-3">Quick Actions</h2>
      
      <div className="space-y-2.5">
        <button
          onClick={() => router.push('/admin/services?action=add')}
          className="w-full bg-white hover:bg-amber-50/60 border border-gray-200 hover:border-[#FFC93C] text-gray-800 font-semibold py-2 px-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-2xs group"
        >
          <Briefcase className="w-3.5 h-3.5 text-gray-600 group-hover:text-black transition-colors" />
          Add Service
        </button>
        <button
          onClick={() => router.push('/admin/category?action=add')}
          className="w-full bg-white hover:bg-amber-50/60 border border-gray-200 hover:border-[#FFC93C] text-gray-800 font-semibold py-2 px-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-2xs group"
        >
          <FolderOpen className="w-3.5 h-3.5 text-gray-600 group-hover:text-black transition-colors" />
          New Category
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
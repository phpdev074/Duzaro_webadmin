import React from 'react';
import { Briefcase, FolderOpen } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
      <h2 className="font-bold text-lg mb-6">Quick Actions</h2>
      
      <div className="space-y-3">
        <button className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
          <Briefcase className="w-4 h-4" />
          Add Service
        </button>
        <button className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
          <FolderOpen className="w-4 h-4" />
          New Category
        </button>
      </div>


    </div>
  );
};

export default QuickActions;
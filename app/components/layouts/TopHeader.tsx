// "use client";
// import React, { useState } from 'react';
// import { Search, Bell } from 'lucide-react';

// interface TopHeaderProps {
//   activeMenu: string;
// }

// const TopHeader: React.FC<TopHeaderProps> = ({ activeMenu }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">{activeMenu}</h1>
//           <p className="text-sm text-gray-600">
//             {activeMenu === 'Dashboard' 
//               ? 'Welcome back, Admin!' 
//               : `Manage ${activeMenu.toLowerCase()} settings and configurations`}
//           </p>
//         </div>

//         <div className="flex items-center gap-4">
//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-64 pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
//             />
//           </div>

//           {/* Notifications */}
//           <button className="relative w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
//             <Bell className="w-5 h-5" />
//             <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//               3
//             </span>
//           </button>

//           {/* Profile */}
//           <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
//             <span className="text-white font-bold text-sm">AM</span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopHeader;
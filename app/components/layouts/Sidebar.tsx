// "use client";
// import React from 'react';
// import { 
//   LayoutDashboard,
//   Users,
//   FolderOpen,
//   Briefcase,
//   FileText,
//   CreditCard,
//   Settings,
//   ChevronDown
// } from 'lucide-react';
// import { MenuItem } from '@/app/types';

// interface SidebarProps {
//   activeMenu: string;
//   onMenuClick: (menuName: string) => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuClick }) => {
//   const menuItems: MenuItem[] = [
//     { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
//     { name: 'User', icon: Users, path: '/admin/users' },
//     { name: 'Category', icon: FolderOpen, path: '/admin/category' },
//     { name: 'Services', icon: Briefcase, path: '/admin/services' },
//     { name: 'Content', icon: FileText, path: '/admin/content' },
//     { name: 'Subscription', icon: CreditCard, path: '/admin/subscription' },
//     { name: 'Setting', icon: Settings, path: '/admin/settings' },
//   ];

//   return (
//     <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 fixed left-0 top-0 h-screen flex flex-col shadow-xl z-50">
//       {/* Logo */}
//       <div className="p-6 border-b border-gray-700">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-[#FFC93C] rounded-full flex items-center justify-center">
//             <span className="text-black font-bold text-lg">d</span>
//           </div>
//           <span className="text-white font-bold text-xl">duezaro</span>
//         </div>
//         <p className="text-gray-400 text-xs mt-2">Admin Panel</p>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 p-4 overflow-y-auto">
//         <ul className="space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = activeMenu === item.name;
//             return (
//               <li key={item.name}>
//                 <button
//                   onClick={() => onMenuClick(item.name)}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                     isActive
//                       ? 'bg-[#FFC93C] text-black font-semibold shadow-lg'
//                       : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="text-sm">{item.name}</span>
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* Bottom User Info */}
//       <div className="p-4 border-t border-gray-700">
//         <div className="flex items-center gap-3 px-2">
//           <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
//             <span className="text-white font-bold text-sm">AM</span>
//           </div>
//           <div className="flex-1">
//             <div className="text-white text-sm font-semibold">Admin</div>
//             <div className="text-gray-400 text-xs">admin@duezaro.com</div>
//           </div>
//           <ChevronDown className="w-4 h-4 text-gray-400" />
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
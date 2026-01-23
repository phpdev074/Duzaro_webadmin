// "use client";
// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import TopHeader from './TopHeader';

// interface AdminLayoutProps {
//   children: React.ReactNode;
// }

// const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
//   const [activeMenu, setActiveMenu] = useState('Dashboard');

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-green-50 flex" style={{ fontFamily: 'Montserrat, sans-serif' }}>
//       <Sidebar activeMenu={activeMenu} onMenuClick={setActiveMenu} />
      
//       <div className="flex-1 ml-64">
//         <TopHeader activeMenu={activeMenu} />
//         <main className="p-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
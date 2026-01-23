"use client";
import React, { useState } from 'react';
import { 
  Search,
  Plus,
  X,
  Upload,
  Edit2,
  Trash2,
  MoreVertical,
  Image as ImageIcon
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
  servicesCount: number;
}

export default function CategoryManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: '1',
      name: 'Electricity',
      image: '⚡',
      servicesCount: 24
    },
    {
      id: '2',
      name: 'Water',
      image: '💧',
      servicesCount: 18
    },
    {
      id: '3',
      name: 'Gas',
      image: '🔥',
      servicesCount: 15
    },
    {
      id: '4',
      name: 'Insurance',
      image: '🛡️',
      servicesCount: 32
    },
    {
      id: '5',
      name: 'Telecom',
      image: '📱',
      servicesCount: 28
    },
    {
      id: '6',
      name: 'Internet',
      image: '🌐',
      servicesCount: 21
    },
    {
      id: '7',
      name: 'DTH/Cable',
      image: '📺',
      servicesCount: 16
    },
    {
      id: '8',
      name: 'Loan EMI',
      image: '💰',
      servicesCount: 42
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log('New Category:', { name: categoryName, image: categoryImage });
    // Reset form
    setCategoryName('');
    setCategoryImage(null);
    setShowAddModal(false);
  };

  const handleMenuClick = (categoryId: string) => {
    setOpenMenuId(openMenuId === categoryId ? null : categoryId);
  };

  return (
    <div className="p-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Category Management</h1>
          <p className="text-sm text-gray-600">Manage service categories</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="font-semibold text-sm">Add Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Three Dot Menu */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => handleMenuClick(category.id)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {openMenuId === category.id && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpenMenuId(null)}
                  />
                  
                  {/* Menu */}
                  <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                    <button
                      onClick={() => setOpenMenuId(null)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Edit</span>
                    </button>
                    
                    <button
                      onClick={() => setOpenMenuId(null)}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-600">Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 text-4xl">
                {category.image}
              </div>
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.servicesCount} Services</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add New Category</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setCategoryName('');
                  setCategoryImage(null);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2">Category Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#FFC93C] transition-colors">
                  {categoryImage ? (
                    <div className="relative">
                      <img
                        src={categoryImage}
                        alt="Category preview"
                        className="w-32 h-32 object-cover rounded-xl mx-auto"
                      />
                      <button
                        onClick={() => setCategoryImage(null)}
                        className="absolute top-0 right-1/2 translate-x-16 -translate-y-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-3">
                        Click to upload or drag and drop
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-semibold transition-colors"
                      >
                        Choose File
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Category Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!categoryName || !categoryImage}
                className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

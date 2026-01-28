"use client";
import React, { useEffect, useState } from 'react';
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
import { CreateCategory, DeleteCategory, GetCategory, UpdateCategory } from '@/app/api/ApiHelper/categoryHelper';
import { IMAGE_BASE_URL } from '@/app/api/api';
import { UploadProviderLogo } from '@/app/api/ApiHelper/uploadHelper';
import Swal from "sweetalert2";

interface Category {
  id: string;
  name: string;
  image: string;
  servicesCount: number;
}

export default function CategoryManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(1);

  const limit = 1000;

  // const categories: Category[] = [
  //   {
  //     id: '1',
  //     name: 'Electricity',
  //     image: '⚡',
  //     servicesCount: 24
  //   },
  //   {
  //     id: '2',
  //     name: 'Water',
  //     image: '💧',
  //     servicesCount: 18
  //   },
  //   {
  //     id: '3',
  //     name: 'Gas',
  //     image: '🔥',
  //     servicesCount: 15
  //   },
  //   {
  //     id: '4',
  //     name: 'Insurance',
  //     image: '🛡️',
  //     servicesCount: 32
  //   },
  //   {
  //     id: '5',
  //     name: 'Telecom',
  //     image: '📱',
  //     servicesCount: 28
  //   },
  //   {
  //     id: '6',
  //     name: 'Internet',
  //     image: '🌐',
  //     servicesCount: 21
  //   },
  //   {
  //     id: '7',
  //     name: 'DTH/Cable',
  //     image: '📺',
  //     servicesCount: 16
  //   },
  //   {
  //     id: '8',
  //     name: 'Loan EMI',
  //     image: '💰',
  //     servicesCount: 42
  //   },
  // ];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
      // setBlockedPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const GetUsersData = async () => {
    setIsLoading(true);
    // setUsers([]);
    try {
      const respo = await GetCategory({ search: debouncedSearch, page, limit });

      setCategories(respo.data.data || []);
      setTotalPages(respo.data.pagination.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetUsersData();
  }, [debouncedSearch, page])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCategoryImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!categoryName || !categoryImage) return;

    try {
      setIsSubmitting(true);
      // 1️⃣ Upload image
      const uploadRes = await UploadProviderLogo(categoryImage);

      const imageUrl = uploadRes.data?.filePath;
      // ⚠️ adjust key if backend returns differently

      if (!imageUrl) {
        alert("Image upload failed");
        return;
      }

      // 2️⃣ Create category
      await CreateCategory({
        name: categoryName,
        image: imageUrl,
        isDefault: 'true',
        categoryType: "category",
      });

      // 3️⃣ Reset + close modal
      setCategoryName("");
      setCategoryImage(null);
      setShowAddModal(false);

      // 4️⃣ Refresh list
      GetUsersData();

    } catch (error) {
      console.error("Create category error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMenuClick = (categoryId: string) => {
    setOpenMenuId(openMenuId === categoryId ? null : categoryId);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    const result = await Swal.fire({
      title: "Delete Category?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await DeleteCategory(categoryId);

      Swal.fire({
        title: "Deleted!",
        text: "Category has been deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setOpenMenuId(null);
      GetUsersData();
    } catch (error) {
      console.error("Delete category error:", error);

      Swal.fire({
        title: "Error",
        text: "Failed to delete category.",
        icon: "error",
      });
    }
  };

  const handleEditCategory = (category: any) => {
    setIsEditMode(true);
    setSelectedCategory(category);
    setCategoryName(category.name);
    setCategoryImage(null); // image optional on edit
    setShowAddModal(true);
    setOpenMenuId(null);
  };

  const handleUpdateCategory = async () => {
    if (!categoryName || !selectedCategory) return;

    try {
      setIsSubmitting(true);

      let imageUrl = selectedCategory.image;

      // Upload only if new image selected
      if (categoryImage) {
        const uploadRes = await UploadProviderLogo(categoryImage);
        imageUrl = uploadRes.data?.filePath;

        if (!imageUrl) {
          alert("Image upload failed");
          return;
        }
      }

      await UpdateCategory(selectedCategory.id, {
        name: categoryName,
        image: imageUrl,
      });

      resetModal();
      GetUsersData();
    } catch (error) {
      console.error("Update category error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setCategoryName("");
    setCategoryImage(null);
    setSelectedCategory(null);
    setIsEditMode(false);
    setShowAddModal(false);
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
          onClick={() => {
            setIsEditMode(false);
            setSelectedCategory(null);
            setCategoryName("");
            setCategoryImage(null);
            setShowAddModal(true);
          }}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-4 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-4 flex flex-col items-center justify-center py-20 text-gray-500">
            <ImageIcon className="w-12 h-12 mb-3" />
            <p className="text-lg font-semibold">No categories found</p>
            <p className="text-sm">Try changing your search</p>
          </div>
        ) : (
          categories.map((category) => (
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
                        onClick={() => handleEditCategory(category)}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteCategory(category.id)}
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
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
                  {category.image ? (
                    <img
                      src={
                        category.image.startsWith('http')
                          ? category.image
                          : `${IMAGE_BASE_URL}${category.image}`
                      }
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                  )}
                </div>

                <h3 className="font-bold text-lg mb-2">{category.name}</h3>

                {category.servicesCount !== undefined && (
                  <p className="text-sm text-gray-600">
                    {category.servicesCount} Services
                  </p>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{isEditMode ? "Edit Category" : "Add New Category"}</h2>
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
              {/* Category Image */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category Image
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">

                  {/* IMAGE PREVIEW */}
                  {(categoryImage || (isEditMode && selectedCategory?.image)) && (
                    <div className="mb-4">
                      <img
                        src={
                          categoryImage
                            ? URL.createObjectURL(categoryImage) // new image
                            : selectedCategory.image.startsWith("http")
                              ? selectedCategory.image              // old image (full url)
                              : `${IMAGE_BASE_URL}${selectedCategory.image}` // old image (relative)
                        }
                        alt="Category preview"
                        className="w-32 h-32 object-cover rounded-xl mx-auto"
                      />
                    </div>
                  )}

                  {/* UPLOAD ICON + TEXT */}
                  <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-3">
                    {isEditMode ? "Upload new image to replace" : "Upload category image"}
                  </p>

                  {/* FILE INPUT */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />

                  {/* BUTTON */}
                  <label
                    htmlFor="image-upload"
                    className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-semibold"
                  >
                    Choose File
                  </label>

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
                onClick={isEditMode ? handleUpdateCategory : handleSubmit}
                disabled={
                  isSubmitting ||
                  !categoryName ||
                  (!isEditMode && !categoryImage)
                }
                className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting && (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isEditMode
                  ? isSubmitting ? "Updating..." : "Update"
                  : isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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
import { CreateSubService, DeleteSubService, Get_SubServices, UpdateSubService } from '@/app/api/ApiHelper/serviceHelper';

interface Category {
  id: string;
  name: string;
  image: string;
  servicesCount: number;
}

export default function CategoryManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddModalSubCategory, setShowAddModalSubCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
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
  const [activeTab, setActiveTab] = useState<'category' | 'sub-category'>('category');
  const [subCategory, setSubCategory] = useState<any[]>([]);
  const [categorySearch, setCategorySearch] = useState('');
  const [subCategorySearch, setSubCategorySearch] = useState('');
  const [debouncedSubCategorySearch, setDebouncedSubCategorySearch] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [subServiceName, setSubServiceName] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [isSubServiceSubmitting, setIsSubServiceSubmitting] = useState(false);
  const [isEditSubService, setIsEditSubService] = useState(false);
  const [selectedSubService, setSelectedSubService] = useState<any>(null);
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSubCategorySearch(subCategorySearch);
      setPage(1);
      // setBlockedPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [subCategorySearch]);

  const fetchSubServices = async () => {
    try {
      const res = await Get_SubServices({
        search: debouncedSubCategorySearch,
        services: 'category',
        page,
        limit,
      });
      console.log(res.data.data)
      setSubCategory(res.data?.data || []);
      // setTotalPages(res.data.pagination.totalPages || 1);
    } catch (err) {
      console.error("Fetch sub-services error", err);
    }
  };

  useEffect(() => {
    if (activeTab === "sub-category") {
      fetchSubServices();
    }
  }, [activeTab, debouncedSubCategorySearch]);

  useEffect(() => {
    if (showAddModalSubCategory) {
      fetchServicesForDropdown();
    }
  }, [showAddModalSubCategory]);

  const fetchServicesForDropdown = async () => {
    try {
      const res = await GetCategory({});
      console.log(res.data)
      setCategoryOptions(res.data?.data || []);
    } catch (err) {
      console.error("Fetch services error", err);
    }
  };

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

  const handleSubServiceSubmit = async () => {
    if (!selectedService || !subServiceName) return;

    try {
      setIsSubServiceSubmitting(true);

      if (isEditSubService && selectedSubService) {
        // 🔁 UPDATE
        await UpdateSubService(selectedSubService.id, {
          name: subServiceName,
          categoryId: Number(selectedService),
          subCatType: "category"
        });
      } else {
        // ➕ CREATE
        await CreateSubService({
          name: subServiceName,
          categoryId: Number(selectedService),
          isDefault: true,
          subCatType: "category"
        });
      }

      // reset
      setSelectedService("");
      setSubServiceName("");
      setSelectedSubService(null);
      setIsEditSubService(false);
      setShowAddModalSubCategory(false);

      fetchSubServices();
    } catch (err: any) {
      console.error("Sub-service submit error", err);

      const errorMessage =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setIsSubServiceSubmitting(false);
    }
  };

  const handleEditSubService = (subService: any) => {
    setIsEditSubService(true);
    setSelectedSubService(subService);

    setSubServiceName(subService.name);
    setSelectedService(String(subService.category.id));

    setShowAddModalSubCategory(true);
    setOpenMenuId(null);
  };

  const handleDeleteSubService = async (subServiceId: string) => {
    const result = await Swal.fire({
      title: "Delete Sub-Category?",
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
      await DeleteSubService(subServiceId);

      Swal.fire({
        title: "Deleted!",
        text: "Sub-category deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setOpenMenuId(null);
      fetchSubServices(); // 🔥 refresh sub-services list
    } catch (error) {
      console.error("Delete sub-category error:", error);

      Swal.fire({
        title: "Error",
        text: "Failed to delete sub-category.",
        icon: "error",
      });
    }
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
          // onClick={() => {
          //   setIsEditMode(false);
          //   setSelectedCategory(null);
          //   setCategoryName("");
          //   setCategoryImage(null);
          //   setShowAddModal(true);
          // }}
          onClick={() => activeTab === 'category' ? setShowAddModal(true) : setShowAddModalSubCategory(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="font-semibold text-sm">
            {activeTab === 'category' ? 'Add Category' : 'Add Sub-category'}
          </span>
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('category')}
          className={`px-4 py-3 font-semibold text-sm transition-colors relative ${activeTab === 'category'
            ? 'text-black'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Category
          {activeTab === 'category' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC93C]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('sub-category')}
          className={`px-4 py-3 font-semibold text-sm transition-colors relative ${activeTab === 'sub-category'
            ? 'text-black'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Sub-Category
          {activeTab === 'sub-category' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC93C]"></div>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={activeTab === 'category' ? searchQuery : subCategorySearch}
            onChange={(e) =>
              activeTab === 'category'
                ? setSearchQuery(e.target.value)
                : setSubCategorySearch(e.target.value)
            }
            placeholder={`Search ${activeTab === 'category' ? 'categories' : 'sub-categories'}...`}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {activeTab === 'category' && (
        <div className="grid grid-cols-4 gap-6">
          {categories.length === 0 ? (
            <div className="col-span-4 flex flex-col items-center justify-center py-20 text-gray-500">
              <ImageIcon className="w-12 h-12 mb-3" />
              <p className="text-lg font-semibold">No categories found</p>
              {/* <p className="text-sm">Try changing your search</p> */}
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
      )}

      {activeTab === 'sub-category' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm">
          {subCategory.length === 0 ? (
            /* 🔴 EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <ImageIcon className="w-12 h-12 mb-3" />
              <p className="text-lg font-semibold">No sub-categories found</p>
              {/* <p className="text-sm">Try changing your search</p> */}
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">S.No</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Category Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Sub-Category Name</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subCategory.map((subCategory, index) => (
                  <tr
                    key={subCategory.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {subCategory.category.name}
                    </td>
                    <td className="px-6 py-4 text-sm">{subCategory.name}</td>

                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuClick(`sub-${subCategory.id}`);
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>

                        {openMenuId === `sub-${subCategory.id}` && (
                          <>
                            {/* 🔴 CLICK ANYWHERE TO CLOSE */}
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border py-2 z-20">
                              {/* ✅ EDIT */}
                              <button
                                onClick={() => handleEditSubService(subCategory)}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                              >
                                <Edit2 className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">Edit</span>
                              </button>

                              {/* DELETE */}
                              <button
                                onClick={() => handleDeleteSubService(subCategory.id)}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-medium text-red-600">Delete</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          )}
        </div>
      )}

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

      {/* Add Sub Category Modal */}
      {showAddModalSubCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add Sub-Category</h2>
              <button
                onClick={() => {
                  setShowAddModalSubCategory(false);
                  setSelectedService('');
                  setSubServiceName('');
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Select Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">Select Category</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm
                   focus:outline-none focus:ring-2 focus:ring-[#FFC93C]
                   max-h-52 overflow-y-auto"
                >
                  <option value="">Choose a service</option>
                  {categoryOptions.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub-Service Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Enter Sub-Category</label>
                <input
                  type="text"
                  value={subServiceName}
                  onChange={(e) => setSubServiceName(e.target.value)}
                  placeholder="Enter sub-category name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubServiceSubmit}
                disabled={
                  isSubServiceSubmitting ||
                  !selectedService ||
                  !subServiceName
                }
                className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubServiceSubmitting && (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isEditSubService
                  ? isSubServiceSubmitting ? "Updating..." : "Update"
                  : isSubServiceSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useEffect, useState, Suspense } from 'react';
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
import CustomConfirmModal, { ConfirmModalState } from '@/app/components/common/CustomConfirmModal';
import { CreateSubService, DeleteSubService, Get_SubServices, UpdateSubService } from '@/app/api/ApiHelper/serviceHelper';
import { useSearchParams } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  image: string;
  servicesCount: number;
}

function CategoryContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setShowAddModal(true);
    }
  }, [searchParams]);
  const [showAddModalSubCategory, setShowAddModalSubCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
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
  const [subCategoryPage, setSubCategoryPage] = useState(1);
  const [subCategoryTotalPages, setSubCategoryTotalPages] = useState(1);
  const [subCategoryTotalItems, setSubCategoryTotalItems] = useState(0);

  const limit = 12;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const GetUsersData = async () => {
    setIsLoading(true);
    try {
      const respo = await GetCategory({ search: debouncedSearch, page, limit });
      setCategories(respo.data.data || []);
      if (respo.data?.pagination) {
        setTotalPages(respo.data.pagination.totalPages || 1);
        setTotalItems(respo.data.pagination.total || 0);
      } else {
        const count = respo.data?.data?.length || 0;
        setTotalPages(Math.max(1, Math.ceil(count / limit)));
        setTotalItems(count);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetUsersData();
  }, [debouncedSearch, page]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSubCategorySearch(subCategorySearch);
      setSubCategoryPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [subCategorySearch]);

  const fetchSubServices = async () => {
    try {
      const res = await Get_SubServices({
        search: debouncedSubCategorySearch,
        services: 'category',
        page: subCategoryPage,
        limit,
      });
      setSubCategory(res.data?.data || []);
      if (res.data?.pagination) {
        setSubCategoryTotalPages(res.data.pagination.totalPages || 1);
        setSubCategoryTotalItems(res.data.pagination.total || 0);
      } else {
        const count = res.data?.data?.length || 0;
        setSubCategoryTotalPages(Math.max(1, Math.ceil(count / limit)));
        setSubCategoryTotalItems(count);
      }
    } catch (err) {
      console.error("Fetch sub-services error", err);
    }
  };

  useEffect(() => {
    if (activeTab === "sub-category") {
      fetchSubServices();
    }
  }, [activeTab, debouncedSubCategorySearch, subCategoryPage]);

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

  const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
    isOpen: false,
    title: "",
    message: "",
  });

  const handleDeleteCategory = (categoryId: string) => {
    setOpenMenuId(null);
    setConfirmModal({
      isOpen: true,
      title: "Delete Category",
      message: "Are you sure you want to delete this category? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmVariant: "danger",
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          await DeleteCategory(categoryId);
          GetUsersData();
        } catch (error) {
          console.error("Delete category error:", error);
        }
      },
      onCancel: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
    });
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

      setConfirmModal({
        isOpen: true,
        title: "Error",
        message: errorMessage,
        confirmText: "OK",
        cancelText: "",
        confirmVariant: "danger",
        onConfirm: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
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

  const handleDeleteSubService = (subServiceId: string) => {
    setOpenMenuId(null);
    setConfirmModal({
      isOpen: true,
      title: "Delete Sub-Category",
      message: "Are you sure you want to delete this sub-category? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmVariant: "danger",
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          await DeleteSubService(subServiceId);
          fetchSubServices();
        } catch (error) {
          console.error("Delete sub-category error:", error);
        }
      },
      onCancel: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
    });
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-0 p-4 lg:p-6 pb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
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

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Segmented Pill Tabs */}
        <div className="inline-flex bg-gray-200/70 p-1 rounded-xl shadow-inner">
          <button
            onClick={() => setActiveTab('category')}
            className={`px-5 py-2 font-bold text-xs lg:text-sm rounded-lg transition-all ${
              activeTab === 'category'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Category
          </button>
          <button
            onClick={() => setActiveTab('sub-category')}
            className={`px-5 py-2 font-bold text-xs lg:text-sm rounded-lg transition-all ${
              activeTab === 'sub-category'
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Sub-Category
          </button>
        </div>

        {/* Compact Search Bar */}
        <div className="relative w-full sm:w-64">
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
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C] shadow-sm"
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
                <div className="absolute top-4 right-4 flex items-center gap-1">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Category Name</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subCategory.map((subCategory, index) => (
                  <tr
                    key={subCategory.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">
                      {(subCategoryPage - 1) * limit + index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {subCategory.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {subCategory.category?.name || 'N/A'}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEditSubService(subCategory)}
                          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSubService(subCategory.id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Pagination Footer */}
      {((activeTab === 'category' && categories.length > 0) || (activeTab === 'sub-category' && subCategory.length > 0)) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs lg:text-sm text-gray-600">
            {activeTab === 'category' ? (
              <>Showing {totalItems > 0 ? (page - 1) * limit + 1 : 0} - {Math.min(page * limit, totalItems)} of {totalItems} categories</>
            ) : (
              <>Showing {subCategoryTotalItems > 0 ? (subCategoryPage - 1) * limit + 1 : 0} - {Math.min(subCategoryPage * limit, subCategoryTotalItems)} of {subCategoryTotalItems} sub-categories</>
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => activeTab === 'category' ? setPage(p => Math.max(1, p - 1)) : setSubCategoryPage(p => Math.max(1, p - 1))}
              disabled={activeTab === 'category' ? page <= 1 : subCategoryPage <= 1}
              className="px-3 py-1.5 border border-gray-300 rounded-xl text-xs font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <span className="px-3 py-1.5 bg-[#FFC93C]/20 text-black text-xs font-semibold rounded-xl">
              Page {activeTab === 'category' ? page : subCategoryPage} of {activeTab === 'category' ? totalPages : subCategoryTotalPages}
            </span>

            <button
              onClick={() => activeTab === 'category' ? setPage(p => Math.min(totalPages, p + 1)) : setSubCategoryPage(p => Math.min(subCategoryTotalPages, p + 1))}
              disabled={activeTab === 'category' ? page >= totalPages : subCategoryPage >= subCategoryTotalPages}
              className="px-3 py-1.5 border border-gray-300 rounded-xl text-xs font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
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

      <CustomConfirmModal {...confirmModal} />
    </div>
  );
}

export default function CategoryManagement() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-[#FFC93C] rounded-full animate-spin" />
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}

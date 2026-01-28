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
  ImageIcon
} from 'lucide-react';
import { CreateSubService, DeleteSubService, Get_SubServices, GetServices, UpdateSubService } from '@/app/api/ApiHelper/serviceHelper';
import { IMAGE_BASE_URL } from '@/app/api/api';
import { CreateCategory, DeleteCategory, UpdateCategory } from '@/app/api/ApiHelper/categoryHelper';
import Swal from "sweetalert2";
import { UploadProviderLogo } from '@/app/api/ApiHelper/uploadHelper';

interface Service {
  id: string;
  name: string;
  image: string;
  subServicesCount: number;
}

interface SubService {
  id: string;
  serviceName: string;
  subServiceName: string;
}

export default function ServiceManagement() {
  const [activeTab, setActiveTab] = useState<'services' | 'sub-services'>('services');
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showAddSubServiceModal, setShowAddSubServiceModal] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceImage, setServiceImage] = useState<File | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [subServiceName, setSubServiceName] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  // sub-services states
  const [subServices, setSubServices] = useState<any[]>([]);
  const [serviceOptions, setServiceOptions] = useState<any[]>([]);
  const [isEditSubService, setIsEditSubService] = useState(false);
  const [selectedSubService, setSelectedSubService] = useState<any>(null);

  const [serviceSearch, setServiceSearch] = useState('');
  const [subServiceSearch, setSubServiceSearch] = useState('');

  const [debouncedServiceSearch, setDebouncedServiceSearch] = useState('');
  const [debouncedSubServiceSearch, setDebouncedSubServiceSearch] = useState('');

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1);
  // const [servicesName, setServicesName] = useState('');
  // const [servicesImage, setServicesImage] = useState<File | null>(null);
  const [selectedServices, setSelectedServices] = useState<any>(null);
  // const [showAddModal, setShowAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isServiceSubmitting, setIsServiceSubmitting] = useState(false);
  const [isSubServiceSubmitting, setIsSubServiceSubmitting] = useState(false);

  const limit = 1000;

  // const services: Service[] = [
  //   {
  //     id: '1',
  //     name: 'Doctor',
  //     image: '👨‍⚕️',
  //     subServicesCount: 12
  //   },
  //   {
  //     id: '2',
  //     name: 'Advocate',
  //     image: '⚖️',
  //     subServicesCount: 8
  //   },
  //   {
  //     id: '3',
  //     name: 'CA (Chartered Accountant)',
  //     image: '💼',
  //     subServicesCount: 15
  //   },
  //   {
  //     id: '4',
  //     name: 'Plumber',
  //     image: '🔧',
  //     subServicesCount: 6
  //   },
  //   {
  //     id: '5',
  //     name: 'Electrician',
  //     image: '⚡',
  //     subServicesCount: 9
  //   },
  //   {
  //     id: '6',
  //     name: 'Carpenter',
  //     image: '🪚',
  //     subServicesCount: 7
  //   },
  //   {
  //     id: '7',
  //     name: 'Tutor',
  //     image: '📚',
  //     subServicesCount: 20
  //   },
  //   {
  //     id: '8',
  //     name: 'Mechanic',
  //     image: '🔩',
  //     subServicesCount: 11
  //   },
  // ];

  // const subServices: SubService[] = [
  //   {
  //     id: '1',
  //     serviceName: 'Doctor',
  //     subServiceName: 'General Physician'
  //   },
  //   {
  //     id: '2',
  //     serviceName: 'Doctor',
  //     subServiceName: 'Cardiologist'
  //   },
  //   {
  //     id: '3',
  //     serviceName: 'Doctor',
  //     subServiceName: 'Dentist'
  //   },
  //   {
  //     id: '4',
  //     serviceName: 'Advocate',
  //     subServiceName: 'Criminal Lawyer'
  //   },
  //   {
  //     id: '5',
  //     serviceName: 'Advocate',
  //     subServiceName: 'Civil Lawyer'
  //   },
  //   {
  //     id: '6',
  //     serviceName: 'CA (Chartered Accountant)',
  //     subServiceName: 'Tax Consultant'
  //   },
  //   {
  //     id: '7',
  //     serviceName: 'CA (Chartered Accountant)',
  //     subServiceName: 'Audit Services'
  //   },
  //   {
  //     id: '8',
  //     serviceName: 'Plumber',
  //     subServiceName: 'Pipe Repair'
  //   },
  //   {
  //     id: '9',
  //     serviceName: 'Electrician',
  //     subServiceName: 'Wiring Installation'
  //   },
  //   {
  //     id: '10',
  //     serviceName: 'Tutor',
  //     subServiceName: 'Mathematics Tutor'
  //   },
  // ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setServiceImage(file);
    }
  };

  const handleServiceSubmit = () => {
    console.log('New Service:', { name: serviceName, image: serviceImage });
    // Reset form
    setServiceName('');
    setServiceImage(null);
    setShowAddServiceModal(false);
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
        });
      } else {
        // ➕ CREATE
        await CreateSubService({
          name: subServiceName,
          categoryId: Number(selectedService),
          isDefault: true,
        });
      }

      // reset
      setSelectedService("");
      setSubServiceName("");
      setSelectedSubService(null);
      setIsEditSubService(false);
      setShowAddSubServiceModal(false);

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

  const handleMenuClick = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedServiceSearch(serviceSearch);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [serviceSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSubServiceSearch(subServiceSearch);
    }, 500);

    return () => clearTimeout(handler);
  }, [subServiceSearch]);


  const GetUsersData = async () => {
    setIsLoading(true);
    // setUsers([]);
    try {
      const respo = await GetServices({ search: debouncedServiceSearch, page, limit });
      console.log(respo.data.data)
      setServices(respo.data.data || []);
      setTotalPages(respo.data.pagination.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetUsersData();
  }, [debouncedServiceSearch, page])

  useEffect(() => {
    if (activeTab === "sub-services") {
      fetchSubServices();
    }
  }, [activeTab, debouncedSubServiceSearch]);

  useEffect(() => {
    if (showAddSubServiceModal) {
      fetchServicesForDropdown();
    }
  }, [showAddSubServiceModal]);

  const fetchSubServices = async () => {
    try {
      const res = await Get_SubServices({
        search: debouncedSubServiceSearch,
      });

      setSubServices(res.data?.data || []);
    } catch (err) {
      console.error("Fetch sub-services error", err);
    }
  };

  const fetchServicesForDropdown = async () => {
    try {
      const res = await GetServices({});
      console.log(res.data)
      setServiceOptions(res.data?.data || []);
    } catch (err) {
      console.error("Fetch services error", err);
    }
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

  const handleSubmit = async () => {
    if (!serviceName || !serviceImage) return;

    try {
      setIsServiceSubmitting(true);
      // 1️⃣ Upload image
      const uploadRes = await UploadProviderLogo(serviceImage);

      const imageUrl = uploadRes.data?.filePath;
      // ⚠️ adjust key if backend returns differently

      if (!imageUrl) {
        alert("Image upload failed");
        return;
      }

      // 2️⃣ Create category
      await CreateCategory({
        name: serviceName,
        image: imageUrl,
        isDefault: 'true',
        categoryType: "services",
      });

      // 3️⃣ Reset + close modal
      setServiceName("");
      setServiceImage(null);
      setShowAddServiceModal(false);

      // 4️⃣ Refresh list
      GetUsersData();

    } catch (error) {
      console.error("Create category error:", error);
    } finally {
      setIsServiceSubmitting(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!serviceName || !selectedServices) return;

    try {
      setIsServiceSubmitting(true);

      let imageUrl = selectedServices.image;

      // Upload only if new image selected
      if (serviceImage) {
        const uploadRes = await UploadProviderLogo(serviceImage);
        imageUrl = uploadRes.data?.filePath;

        if (!imageUrl) {
          alert("Image upload failed");
          return;
        }
      }

      await UpdateCategory(selectedServices.id, {
        name: serviceName,
        image: imageUrl,
      });

      resetModal();
      GetUsersData();
    } catch (error) {
      console.error("Update category error:", error);
    } finally {
      setIsServiceSubmitting(false);
    }
  };

  const resetModal = () => {
    setServiceName("");
    setServiceImage(null);
    setSelectedServices(null);
    setIsEditMode(false);
    setShowAddServiceModal(false);
  };

  const handleEditCategory = (service: any) => {
    setIsEditMode(true);
    setSelectedServices(service);
    setServiceName(service.name);
    setServiceImage(null); // image optional on edit
    setShowAddServiceModal(true);
    setOpenMenuId(null);
  };

  const handleDeleteSubService = async (subServiceId: string) => {
    const result = await Swal.fire({
      title: "Delete Sub-Service?",
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
        text: "Sub-service deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setOpenMenuId(null);
      fetchSubServices(); // 🔥 refresh sub-services list
    } catch (error) {
      console.error("Delete sub-service error:", error);

      Swal.fire({
        title: "Error",
        text: "Failed to delete sub-service.",
        icon: "error",
      });
    }
  };

  const handleEditSubService = (subService: any) => {
    setIsEditSubService(true);
    setSelectedSubService(subService);

    setSubServiceName(subService.name);
    setSelectedService(String(subService.category.id)); // 👈 preselect service

    setShowAddSubServiceModal(true);
    setOpenMenuId(null);
  };

  return (
    <div className="p-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Service Management</h1>
          <p className="text-sm text-gray-600">Manage services and sub-services</p>
        </div>

        <button
          onClick={() => activeTab === 'services' ? setShowAddServiceModal(true) : setShowAddSubServiceModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="font-semibold text-sm">
            {activeTab === 'services' ? 'Add Service' : 'Add Sub-Service'}
          </span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-3 font-semibold text-sm transition-colors relative ${activeTab === 'services'
            ? 'text-black'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Services
          {activeTab === 'services' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC93C]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('sub-services')}
          className={`px-4 py-3 font-semibold text-sm transition-colors relative ${activeTab === 'sub-services'
            ? 'text-black'
            : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          Sub-Services
          {activeTab === 'sub-services' && (
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
            value={activeTab === 'services' ? serviceSearch : subServiceSearch}
            onChange={(e) =>
              activeTab === 'services'
                ? setServiceSearch(e.target.value)
                : setSubServiceSearch(e.target.value)
            }
            placeholder={`Search ${activeTab === 'services' ? 'services' : 'sub-services'}...`}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
          />
        </div>
      </div>

      {/* Services Tab Content */}
      {activeTab === 'services' && (
        <div className="grid grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Three Dot Menu */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => handleMenuClick(service.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {openMenuId === service.id && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setOpenMenuId(null)}
                    />

                    {/* Menu */}
                    <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                      <button
                        onClick={() => handleEditCategory(service)}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteCategory(service.id)}
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
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 text-4xl">
                  {service.image ? (
                    <img
                      src={
                        service.image.startsWith('http')
                          ? service.image
                          : `${IMAGE_BASE_URL}${service.image}`
                      }
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                {/* <p className="text-sm text-gray-600">{service.subServicesCount} Sub-Services</p> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-Services Tab Content */}
      {activeTab === 'sub-services' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">S.No</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Service Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Sub-Service Name</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subServices.map((subService, index) => (
                <tr
                  key={subService.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {subService.category.name}
                  </td>
                  <td className="px-6 py-4 text-sm">{subService.name}</td>

                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => handleMenuClick(`sub-${subService.id}`)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>

                      {openMenuId === `sub-${subService.id}` && (
                        <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border py-2 z-20">
                          {/* ✅ EDIT */}
                          <button
                            onClick={() => handleEditSubService(subService)}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Edit</span>
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDeleteSubService(subService.id)}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-medium text-red-600">Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add New Service</h2>
              <button
                onClick={() => {
                  setShowAddServiceModal(false);
                  setServiceName('');
                  setServiceImage(null);
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
                <label className="block text-sm font-semibold mb-2">
                  Service Image
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">

                  {/* IMAGE PREVIEW */}
                  {(serviceImage || (isEditMode && selectedServices?.image)) && (
                    <div className="mb-4">
                      <img
                        src={
                          serviceImage
                            ? URL.createObjectURL(serviceImage)
                            : selectedServices.image.startsWith("http")
                              ? selectedServices.image
                              : `${IMAGE_BASE_URL}${selectedServices.image}`
                        }
                        alt="Service preview"
                        className="w-32 h-32 object-cover rounded-xl mx-auto"
                      />
                    </div>
                  )}

                  <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-3">
                    {isEditMode ? "Upload new image to replace" : "Upload service image"}
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="service-image-upload"
                  />

                  <label
                    htmlFor="service-image-upload"
                    className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-semibold"
                  >
                    Choose File
                  </label>
                </div>
              </div>


              {/* Service Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Service Name</label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="Enter service name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={isEditMode ? handleUpdateCategory : handleSubmit}
                disabled={
                  isServiceSubmitting ||
                  !serviceName ||
                  (!isEditMode && !serviceImage)
                }
                className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isServiceSubmitting && (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isEditMode
                  ? isServiceSubmitting ? "Updating..." : "Update"
                  : isServiceSubmitting ? "Submitting..." : "Submit"}
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Add Sub-Service Modal */}
      {showAddSubServiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add Sub-Service</h2>
              <button
                onClick={() => {
                  setShowAddSubServiceModal(false);
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
              {/* Select Service */}
              <div>
                <label className="block text-sm font-semibold mb-2">Select Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm
             focus:outline-none focus:ring-2 focus:ring-[#FFC93C]
             max-h-52 overflow-y-auto"
                >
                  <option value="">Choose a service</option>
                  {serviceOptions.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub-Service Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Enter Sub-Service</label>
                <input
                  type="text"
                  value={subServiceName}
                  onChange={(e) => setSubServiceName(e.target.value)}
                  placeholder="Enter sub-service name"
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

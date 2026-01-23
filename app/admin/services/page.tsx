"use client";
import React, { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  X,
  Upload,
  Edit2,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { CreateSubService, Get_SubServices, GetServices } from '@/app/api/ApiHelper/serviceHelper';

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
  const [serviceImage, setServiceImage] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [subServiceName, setSubServiceName] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  // sub-services states
  const [subServices, setSubServices] = useState<any[]>([]);
  const [serviceOptions, setServiceOptions] = useState<any[]>([]);
  const [isEditSubService, setIsEditSubService] = useState(false);
  const [selectedSubService, setSelectedSubService] = useState<any>(null);

  const services: Service[] = [
    {
      id: '1',
      name: 'Doctor',
      image: '👨‍⚕️',
      subServicesCount: 12
    },
    {
      id: '2',
      name: 'Advocate',
      image: '⚖️',
      subServicesCount: 8
    },
    {
      id: '3',
      name: 'CA (Chartered Accountant)',
      image: '💼',
      subServicesCount: 15
    },
    {
      id: '4',
      name: 'Plumber',
      image: '🔧',
      subServicesCount: 6
    },
    {
      id: '5',
      name: 'Electrician',
      image: '⚡',
      subServicesCount: 9
    },
    {
      id: '6',
      name: 'Carpenter',
      image: '🪚',
      subServicesCount: 7
    },
    {
      id: '7',
      name: 'Tutor',
      image: '📚',
      subServicesCount: 20
    },
    {
      id: '8',
      name: 'Mechanic',
      image: '🔩',
      subServicesCount: 11
    },
  ];

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      await CreateSubService({
        name: subServiceName,
        categoryId: Number(selectedService), // 👈 send service ID
        isDefault: true,
      });

      setSelectedService("");
      setSubServiceName("");
      setShowAddSubServiceModal(false);

      fetchSubServices(); // refresh list
    } catch (err) {
      console.error("Create sub-service error", err);
    }
  };

  const handleMenuClick = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    if (activeTab === "sub-services") {
      fetchSubServices();
    }
  }, [activeTab]);

  useEffect(() => {
    if (showAddSubServiceModal) {
      fetchServicesForDropdown();
    }
  }, [showAddSubServiceModal]);

  const fetchSubServices = async () => {
    try {
      const res = await Get_SubServices({});

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
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 text-4xl">
                  {service.image}
                </div>
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.subServicesCount} Sub-Services</p>
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
                <tr key={subService.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium">{subService.category.name}</td>
                  <td className="px-6 py-4 text-sm">{subService.name}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => handleMenuClick(`sub-${subService.id}`)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuId === `sub-${subService.id}` && (
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
                <label className="block text-sm font-semibold mb-2">Service Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#FFC93C] transition-colors">
                  {serviceImage ? (
                    <div className="relative">
                      <img
                        src={serviceImage}
                        alt="Service preview"
                        className="w-32 h-32 object-cover rounded-xl mx-auto"
                      />
                      <button
                        onClick={() => setServiceImage(null)}
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
                        id="service-image-upload"
                      />
                      <label
                        htmlFor="service-image-upload"
                        className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-semibold transition-colors"
                      >
                        Choose File
                      </label>
                    </>
                  )}
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
                onClick={handleServiceSubmit}
                disabled={!serviceName || !serviceImage}
                className="w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit
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
                disabled={!selectedService || !subServiceName}
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

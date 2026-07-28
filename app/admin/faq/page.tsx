"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle } from "lucide-react";
import CustomConfirmModal, { ConfirmModalState } from "@/app/components/common/CustomConfirmModal";
import { CreateFaq, DeleteFaq, GetFaqs, UpdateFaq } from "@/app/api/ApiHelper/faqHelper";

interface FaqItem {
  id: string | number;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
}

export default function FaqManagement() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFaqs, setTotalFaqs] = useState(0);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "Category",
    isPublished: true,
  });

  // Debounce search query changes by 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const res = await GetFaqs({ search: debouncedSearchQuery, page, limit });
      const payload = res.data;
      const items = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.data?.data)
            ? payload.data.data
            : [];

      const pagination = payload?.pagination || payload?.data?.pagination || {};
      const totalCount = Number(pagination.total ?? items.length);
      const computedTotalPages = Number(pagination.totalPages || (totalCount > 0 ? Math.ceil(totalCount / limit) : 1));

      setFaqs(items);
      setTotalFaqs(totalCount);
      setTotalPages(computedTotalPages);
    } catch (error) {
      console.error("Fetch faq error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [debouncedSearchQuery, page]);

  const resetModal = () => {
    setForm({ question: "", answer: "", category: "Category", isPublished: true });
    setSelectedFaq(null);
    setIsEditMode(false);
    setShowModal(false);
  };

  const handleSubmit = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      setConfirmModal({
        isOpen: true,
        title: "Missing Fields",
        message: "Please fill in both question and answer.",
        confirmText: "OK",
        cancelText: "",
        confirmVariant: "warning",
        onConfirm: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
      });
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEditMode && selectedFaq) {
        await UpdateFaq(selectedFaq.id, form);
      } else {
        await CreateFaq(form);
      }

      resetModal();
      fetchFaqs();
    } catch (error: any) {
      setConfirmModal({
        isOpen: true,
        title: "Request Failed",
        message: error?.response?.data?.message || "Something went wrong.",
        confirmText: "OK",
        cancelText: "",
        confirmVariant: "danger",
        onConfirm: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
        onCancel: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (faq: FaqItem) => {
    setSelectedFaq(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "Category",
      isPublished: faq.isPublished ?? true,
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
    isOpen: false,
    title: "",
    message: "",
  });

  const handleDelete = (faq: FaqItem) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete FAQ",
      message: "Are you sure you want to delete this FAQ entry? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmVariant: "danger",
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        try {
          await DeleteFaq(faq.id);
          fetchFaqs();
        } catch (error) {
          console.error("Error deleting FAQ:", error);
        }
      },
      onCancel: () => setConfirmModal((prev) => ({ ...prev, isOpen: false })),
    });
  };

  const startItem = faqs.length > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, totalFaqs || faqs.length);

  return (
    <div className="flex-1 overflow-y-auto min-h-0 p-4 lg:p-6 pb-8 space-y-6">
      {/* Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-sm text-gray-600">Add, edit, and manage FAQ entries for your app.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#FFC93C] text-black font-semibold px-4 py-2 rounded-xl hover:bg-[#f5bc13] transition-colors shadow-sm text-sm"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FFC93C] text-xs lg:text-sm shadow-sm"
          />
        </div>
      </div>

      {/* FAQs List Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No FAQ entries found.</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-base">{faq.question}</h3>
                    {faq.isPublished ? (
                      <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-600 text-xs font-medium bg-yellow-50 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> Draft
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs lg:text-sm text-gray-600">
          Showing <span className="font-semibold">{startItem} - {endItem}</span> of{' '}
          <span className="font-semibold">{totalFaqs || faqs.length}</span> FAQs
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className={`px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all shadow-sm ${
              page <= 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>

          <span className="text-xs lg:text-sm text-gray-600 font-semibold px-2">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className={`px-4 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all shadow-sm ${
              page >= totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{isEditMode ? "Edit FAQ" : "Add FAQ"}</h2>
              <button onClick={resetModal} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                <input
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                  placeholder="How do I reset my password?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[120px] text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC93C]"
                  placeholder="Click on the Forgot Password link on the login page."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={resetModal}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-[#FFC93C] text-black font-semibold hover:bg-[#f5bc13] disabled:opacity-60 text-sm"
              >
                {isSubmitting ? "Saving..." : isEditMode ? "Update FAQ" : "Create FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}

      <CustomConfirmModal {...confirmModal} />
    </div>
  );
}

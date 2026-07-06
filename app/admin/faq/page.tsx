"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle } from "lucide-react";
import Swal from "sweetalert2";
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
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "Category",
    isPublished: true,
  });

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const res = await GetFaqs({ search: searchQuery, page: 1, limit: 100 });
      const payload = res.data;
      const items = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.items)
            ? payload.items
            : [];

      setFaqs(items);
    } catch (error) {
      console.error("Fetch faq error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [searchQuery]);

  const resetModal = () => {
    setForm({ question: "", answer: "", category: "Category", isPublished: true });
    setSelectedFaq(null);
    setIsEditMode(false);
    setShowModal(false);
  };

  const handleSubmit = async () => {
    if (!form.question.trim() || !form.answer.trim() || !form.category.trim()) {
      Swal.fire({ icon: "warning", title: "Missing fields", text: "Please fill all required fields." });
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEditMode && selectedFaq) {
        await UpdateFaq(selectedFaq.id, form);
      } else {
        await CreateFaq(form);
      }

      Swal.fire({
        icon: "success",
        title: isEditMode ? "FAQ updated" : "FAQ created",
        text: isEditMode ? "The FAQ was updated successfully." : "The FAQ was added successfully.",
        timer: 1400,
        showConfirmButton: false,
      });

      resetModal();
      fetchFaqs();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Request failed",
        text: error?.response?.data?.message || "Something went wrong.",
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
      category: faq.category,
      isPublished: faq.isPublished,
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (faq: FaqItem) => {
    const result = await Swal.fire({
      title: "Delete FAQ?",
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
      await DeleteFaq(faq.id);
      Swal.fire({ icon: "success", title: "Deleted", text: "FAQ removed successfully." });
      fetchFaqs();
    } catch (error) {
      Swal.fire({ icon: "error", title: "Failed", text: "Unable to delete FAQ." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-sm text-gray-600">Add, edit, and manage FAQ entries for your app.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#FFC93C] text-black font-semibold px-4 py-2 rounded-xl hover:bg-[#f5bc13]"
        >
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQ"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#FFC93C]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No FAQ entries found.</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    {faq.isPublished ? (
                      <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                        <CheckCircle2 className="w-4 h-4" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-600 text-xs font-medium">
                        <XCircle className="w-4 h-4" /> Draft
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                  <p className="text-xs text-gray-500">Category: Category</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50"
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="How do I reset my password?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[120px]"
                  placeholder="Click on the Forgot Password link on the login page."
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={resetModal}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-[#FFC93C] text-black font-semibold hover:bg-[#f5bc13] disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : isEditMode ? "Update FAQ" : "Create FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { Mail, Search, ChevronDown, ChevronUp } from "lucide-react";
import { GetContactMessages } from "@/app/api/ApiHelper/contactHelper";

interface ContactMessage {
  id: number | string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ContactUsManagement() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<number | string>>(new Set());

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);

  // Debounce search query changes by 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const toggleExpand = (id: number | string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await GetContactMessages({ page, limit, search: debouncedSearchQuery });
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

      setMessages(items);
      setTotalMessages(totalCount);
      setTotalPages(computedTotalPages);

      if (items.length > 0) {
        setExpandedIds(new Set([items[0].id]));
      }
    } catch (error) {
      console.error("Fetch contact messages error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [debouncedSearchQuery, page]);

  const startItem = messages.length > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, totalMessages || messages.length);

  return (
    <div className="flex-1 overflow-y-auto min-h-0 p-4 lg:p-6 pb-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Us Messages</h1>
          <p className="text-sm text-gray-600">View all messages received from the Contact Us form.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FFC93C] text-xs lg:text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No contact messages found.</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {messages.map((item) => {
              const isExpanded = expandedIds.has(item.id);
              const initials = item.name ? item.name.charAt(0).toUpperCase() : 'C';

              return (
                <div
                  key={item.id}
                  onClick={() => toggleExpand(item.id)}
                  className="p-4 hover:bg-gray-50/80 cursor-pointer transition-all space-y-2"
                >
                  {/* Collapsed Header: Name & Email + Chevron */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-[#FFC93C]/20 text-black font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-xs lg:text-sm text-gray-900 truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500 truncate">{item.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details: Subject + Full Message + Sent Date */}
                  {isExpanded && (
                    <div className="pl-11 pt-1 space-y-2">
                      {item.subject && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                          <Mail className="w-3.5 h-3.5 text-gray-500" />
                          {item.subject}
                        </span>
                      )}
                      <div className="rounded-xl bg-gray-50/90 p-3.5 border border-gray-100">
                        <p className="text-xs text-gray-800 whitespace-pre-line leading-relaxed">{item.message}</p>
                      </div>
                      {item.createdAt && (
                        <p className="text-[11px] font-medium text-gray-400">
                          Sent on: {new Date(item.createdAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs lg:text-sm text-gray-600">
          Showing <span className="font-semibold">{startItem} - {endItem}</span> of{' '}
          <span className="font-semibold">{totalMessages || messages.length}</span> messages
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
    </div>
  );
}

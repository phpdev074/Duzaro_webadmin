"use client";
import React, { useEffect, useState } from "react";
import { Mail, Search } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await GetContactMessages({ page: 1, limit: 100 });
      const payload = res.data;
      const items = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : [];

      setMessages(items);
    } catch (error) {
      console.error("Fetch contact messages error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((item) => {
    const term = searchQuery.toLowerCase();
    return (
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.subject?.toLowerCase().includes(term) ||
      item.message?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contact Us Messages</h1>
        <p className="text-sm text-gray-600">View all messages received from the Contact Us form.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#FFC93C]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading messages...</div>
        ) : filteredMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No contact messages found.</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((item) => (
              <div key={item.id} className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.email}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    <Mail className="w-3.5 h-3.5" />
                    {item.subject || "No subject"}
                  </span>
                </div>

                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{item.message}</p>
                </div>

                {item.createdAt && (
                  <p className="text-xs text-gray-500">
                    Sent on: {new Date(item.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

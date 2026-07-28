"use client";
import React from "react";

export interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "danger" | "warning" | "primary" | "success";
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface CustomConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "danger" | "warning" | "primary" | "success";
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function CustomConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}: CustomConfirmModalProps) {
  if (!isOpen) return null;

  const getConfirmBtnClass = () => {
    switch (confirmVariant) {
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white shadow-red-600/30";
      case "warning":
        return "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30";
      case "primary":
      case "success":
        return "bg-[#FFC93C] hover:bg-[#f5bc13] text-black shadow-amber-500/20";
      default:
        return "bg-red-600 hover:bg-red-700 text-white";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl lg:rounded-3xl p-6 lg:p-8 max-w-md w-full shadow-2xl transform transition-all">
        <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
        <p className="text-sm text-slate-300 mb-8 leading-relaxed">{message}</p>

        <div className="flex items-center justify-end gap-3">
          {cancelText ? (
            <button
              onClick={onCancel}
              className="px-5 py-2.5 rounded-xl font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all text-sm"
            >
              {cancelText}
            </button>
          ) : null}

          <button
            onClick={onConfirm}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${getConfirmBtnClass()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

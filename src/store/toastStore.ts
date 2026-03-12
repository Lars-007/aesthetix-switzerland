import { create } from "zustand";

interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "info";
}

interface ToastStore {
    toasts: Toast[];
    addToast: (message: string, type?: "success" | "error" | "info") => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (message, type = "success") => {
        const id = Math.random().toString(36).slice(2);
        set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
        setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3500);
    },
    removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

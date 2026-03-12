import { create } from 'zustand';

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
};

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    toggleCart: () => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    isOpen: false,

    addItem: (newItem) => set((state) => {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        if (existingItem) {
            return {
                items: state.items.map((item) =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
                isOpen: true // auto open cart on add
            };
        }
        return { items: [...state.items, { ...newItem, quantity: 1 }], isOpen: true };
    }),

    removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
    })),

    updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
    })),

    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

    clearCart: () => set({ items: [] }),
}));

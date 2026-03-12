import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedStore {
    ids: string[];
    addId: (id: string) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
    persist(
        (set) => ({
            ids: [],
            addId: (id) =>
                set((s) => ({
                    ids: [id, ...s.ids.filter((x) => x !== id)].slice(0, 8),
                })),
        }),
        { name: "aesthetix-recently-viewed" }
    )
);

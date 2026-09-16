import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order, CustomerAddress } from "@/types";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses?: CustomerAddress[];
}

interface AuthStore {
  user: UserProfile | null;
  orders: Order[];
  isHydrated: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  addAddress: (address: CustomerAddress) => void;
  removeAddress: (id: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null, // By default NOT logged in!
      orders: [],
      isHydrated: false,

      login: (userData) => {
        set({ user: userData });
      },

      logout: () => {
        set({ user: null });
      },

      addOrder: (newOrder) => {
        set((state) => {
          // Avoid duplicate order IDs
          const exists = state.orders.some((o) => o.orderNumber === newOrder.orderNumber);
          if (exists) return state;
          return {
            orders: [newOrder, ...state.orders],
          };
        });
      },

      addAddress: (newAddress) => {
        set((state) => {
          if (!state.user) return state;
          const currentAddresses = state.user.addresses || [];
          return {
            user: {
              ...state.user,
              addresses: [newAddress, ...currentAddresses],
            },
          };
        });
      },

      removeAddress: (id) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              addresses: (state.user.addresses || []).filter((a) => a.id !== id),
            },
          };
        });
      },
    }),
    {
      name: "zelevation-auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state) state.isHydrated = true;
      },
    }
  )
);


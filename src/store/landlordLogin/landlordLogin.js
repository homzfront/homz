import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLandlordLogin = create(
    persist(
        (set) => ({
            routeTo: null,
            setRouteTo: (data) => set({ routeTo: data }),
            clearRouteTo: () => {
                set({ routeTo: null });
                localStorage.removeItem('landlord-login-storage');
            },
        }),
        {
            name: 'landlord-login-storage', // Key name in localStorage
            getStorage: () => localStorage, // Specify localStorage
        }
    )
);

export default useLandlordLogin;

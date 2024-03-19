import { create } from 'zustand';

const LandLordInactiveStore = create((set) => ({
    showKindlyWait: false,
    middle: false,
    setProfileData: (data) =>
        set((state) => ({  showKindlyWait: data?.estates?.length === 0, middle: data?.estates?.length === 0 })),
}));

export default LandLordInactiveStore;
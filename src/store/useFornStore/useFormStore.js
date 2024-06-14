import { create } from 'zustand';

const useFormDataStore = create((set) => ({
    name: "",
    phoneNumber: "",
    estateName: "",
    busName: "",
    noHouses: "",
    estateAddre: "",
    setFormData: (data) =>
        set((state) => ({
            name: data.fullName || state.fullName,
            phoneNumber: data.phoneNo || state.phoneNo,
            estateName: data.estate || state.estate,
            busName: data.businessName || state.businessName,
            noHouses: data.numberOfHouses || state.numberOfHouses,
            estateAddre: data.estateAddress || state.estateAddress,
        })),
}));

export default useFormDataStore;
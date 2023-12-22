// Create a file, e.g., store.js
import create from 'zustand';

const useConversationStore = create((set) => ({
  selectedTenantId: false,
  Data: [],
  setSelection: (data) =>
    set((state) => ({ selectedTenantId: !state.selectedTenantId, Data: data })),
}));

export default useConversationStore;

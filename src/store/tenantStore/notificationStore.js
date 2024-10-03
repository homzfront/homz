import { create } from 'zustand'

const NotificationStore = create((set) => ({
  noti: null,
  setNoti: (data) => set({ noti: data }),
}));

export default NotificationStore;
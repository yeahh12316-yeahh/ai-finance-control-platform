import { create } from 'zustand';

interface AppState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  currentModule: string;
  setCurrentModule: (module: string) => void;
}

const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  currentModule: '',
  setCurrentModule: (module: string) => set({ currentModule: module }),
}));

export default useAppStore;

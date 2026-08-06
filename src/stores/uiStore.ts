import { create } from 'zustand';

interface UiState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const useUiStore = create<UiState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  theme: 'light',
  setTheme: (theme: 'light' | 'dark') => set({ theme }),
}));

export default useUiStore;

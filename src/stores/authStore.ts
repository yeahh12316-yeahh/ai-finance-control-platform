import { create } from 'zustand';
import { TOKEN_KEY, USER_KEY } from '@/utils/constants';

interface User {
  id: string;
  username: string;
  realName: string;
  role: string;
  roleName: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem(USER_KEY) || 'null'),
  token: localStorage.getItem(TOKEN_KEY),
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),

  login: async (username: string, password: string) => {
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUser: User = {
      id: '1',
      username,
      realName: '管理员',
      role: 'admin',
      roleName: '系统管理员',
      avatar: '',
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));

    set({
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = JSON.parse(localStorage.getItem(USER_KEY) || 'null');

    set({
      token,
      user,
      isAuthenticated: !!token,
    });
  },
}));

export default useAuthStore;

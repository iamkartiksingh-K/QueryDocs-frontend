import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { login as apiLogin, register as apiRegister, getProfile } from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login action
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiLogin(email, password);
          
          if (response.success) {
            // Load user profile after successful login
            await get().loadUser();
            return { success: true };
          } else {
            set({ 
              isLoading: false, 
              error: 'Login failed. Please check your credentials.' 
            });
            return { success: false, error: 'Login failed' };
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null
          });
          return { success: false, error: errorMessage };
        }
      },

      // Register action
      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await apiRegister(name, email, password);
          
          if (response.success) {
            // Load user profile after successful registration
            await get().loadUser();
            return { success: true };
          } else {
            set({ 
              isLoading: false, 
              error: 'Registration failed. Please try again.' 
            });
            return { success: false, error: 'Registration failed' };
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Registration failed';
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false,
            user: null,
            token: null
          });
          return { success: false, error: errorMessage };
        }
      },

      // Load user profile
      loadUser: async () => {
        set({ isLoading: true });
        
        try {
          const userData = await getProfile();
          
          if (userData && userData.id) {
            set({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            // Clear auth state if profile loading fails
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              token: null
            });
          }
        } catch (error) {
          // Clear auth state on error
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            token: null,
            error: 'Failed to load user profile'
          });
        }
      },

      // Logout action
      logout: async () => {
        set({ isLoading: true });
        
        try {
          // Call logout API endpoint
          await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include'
          });
        } catch (error) {
          console.error('Logout API call failed:', error);
        } finally {
          // Clear all auth state regardless of API call result
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null
          });
        }
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Set loading state
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist essential data
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      // Rehydrate and validate stored data
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Validate stored user data and load fresh profile
          if (state.isAuthenticated && state.user) {
            // Only load user after hydration to prevent SSR issues
            setTimeout(() => {
              state.loadUser();
            }, 0);
          }
        }
      },
      // Skip hydration during SSR
      skipHydration: typeof window === 'undefined'
    }
  )
);

// Hook for checking authentication status
export const useAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  return { user, isAuthenticated, isLoading };
};

// Hook for auth actions
export const useAuthActions = () => {
  const { login, register, logout, clearError } = useAuthStore();
  return { login, register, logout, clearError };
};
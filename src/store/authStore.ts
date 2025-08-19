import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,

      signIn: async (email: string, password: string) => {
        try {
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (authError) throw authError;

          if (authData.user) {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authData.user.id)
              .single();

            if (profileError) throw profileError;

            set({
              user: {
                id: authData.user.id,
                email: authData.user.email!,
                full_name: profileData.full_name,
                role: profileData.role,
                created_at: profileData.created_at,
              },
            });
          }

          return { success: true };
        } catch (error: any) {
          return { success: false, error: error.message };
        }
      },

      signUp: async (email: string, password: string, fullName: string) => {
        try {
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
          });

          if (authError) throw authError;

          if (authData.user) {
            const { error: profileError } = await supabase.from('profiles').insert({
              id: authData.user.id,
              email: authData.user.email,
              full_name: fullName,
              role: 'customer',
            });

            if (profileError) throw profileError;
          }

          return { success: true };
        } catch (error: any) {
          return { success: false, error: error.message };
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null });
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user) {
            const { data: profileData, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (!error && profileData) {
              set({
                user: {
                  id: session.user.id,
                  email: session.user.email!,
                  full_name: profileData.full_name,
                  role: profileData.role,
                  created_at: profileData.created_at,
                },
              });
            }
          }
        } catch (error) {
          console.error('Auth check error:', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
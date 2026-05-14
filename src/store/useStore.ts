import { create } from 'zustand';

interface AppState {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  
  currentSection: number;
  setCurrentSection: (section: number) => void;
  
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;

  activeProject: number | null;
  setActiveProject: (id: number | null) => void;
}

export const useStore = create<AppState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  
  currentSection: 0,
  setCurrentSection: (section) => set({ currentSection: section }),
  
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),

  activeProject: null,
  setActiveProject: (id) => set({ activeProject: id }),
}));

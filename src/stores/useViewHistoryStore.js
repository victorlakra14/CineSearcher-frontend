import { create } from "zustand";

const useViewHistoryStore = create(set => ({
  viewHistory: [],
  addToHistory: movie =>
    set(state => {
      const movieExists = state.viewHistory.some(m => m.id === movie.id);

      if (movieExists) {
        return {
          viewHistory: state.viewHistory.map(m => ({
            ...m,
            isRecent: m.id === movie.id,
          })),
        };
      }

      return {
        viewHistory: [
          { ...movie, isRecent: true },
          ...state.viewHistory.map(m => ({ ...m, isRecent: false })),
        ],
      };
    }),
  removeFromHistory: movieId =>
    set(state => ({
      viewHistory: state.viewHistory.filter(movie => movie.id !== movieId),
    })),
  clearHistory: () =>
    set(() => ({
      viewHistory: [],
    })),
}));

export default useViewHistoryStore;

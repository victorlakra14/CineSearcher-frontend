import { getFromLocalStorage, setToLocalStorage } from "utils/storage";
import { create } from "zustand";

import { HISTORY_LOCAL_STORAGE_KEY } from "./constants";

const useViewHistoryStore = create(set => ({
  viewHistory: getFromLocalStorage(HISTORY_LOCAL_STORAGE_KEY) || [],
  addToHistory: movie =>
    set(state => {
      const movieExists = state.viewHistory.some(m => m.id === movie.id);

      const updatedHistory = movieExists
        ? state.viewHistory.map(m => ({
            ...m,
            isRecent: m.id === movie.id,
          }))
        : [
            { ...movie, isRecent: true },
            ...state.viewHistory.map(m => ({ ...m, isRecent: false })),
          ];

      setToLocalStorage(HISTORY_LOCAL_STORAGE_KEY, updatedHistory);

      return { viewHistory: updatedHistory };
    }),

  removeFromHistory: movieId =>
    set(state => {
      const updatedHistory = state.viewHistory.filter(
        movie => movie.id !== movieId
      );
      setToLocalStorage(HISTORY_LOCAL_STORAGE_KEY, updatedHistory);

      return { viewHistory: updatedHistory };
    }),

  clearHistory: () => {
    setToLocalStorage(HISTORY_LOCAL_STORAGE_KEY, []);

    return { viewHistory: [] };
  },
}));

export default useViewHistoryStore;

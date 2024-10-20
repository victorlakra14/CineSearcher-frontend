import { includes } from "ramda";
import { create } from "zustand";

const useViewHistoryStore = create(set => ({
  viewHistory: [],
  addToHistory: movie =>
    set(state => {
      if (includes(movie, state.viewHistory)) {
        return {};
      }

      return {
        viewHistory: [movie, ...state.viewHistory],
      };
    }),
}));

export default useViewHistoryStore;

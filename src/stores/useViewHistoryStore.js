import { existsById } from "@bigbinary/neeto-cist";
import { assoc, filter, map, prepend } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useViewHistoryStore = create(
  persist(
    set => ({
      viewHistory: [],
      addToHistory: movie =>
        set(state => {
          const movieExists = existsById(movie.id, state.viewHistory);

          const updateHistory = map(m =>
            assoc("isRecent", m.id === movie.id, m)
          );

          return {
            viewHistory: movieExists
              ? updateHistory(state.viewHistory)
              : prepend(
                  assoc("isRecent", true, movie),
                  updateHistory(state.viewHistory)
                ),
          };
        }),

      removeFromHistory: movieId =>
        set(state => ({
          viewHistory: filter(movie => movie.id !== movieId, state.viewHistory),
        })),

      clearHistory: () =>
        set(() => ({
          viewHistory: [],
        })),
    }),
    { name: "view-history-store" }
  )
);

export default useViewHistoryStore;

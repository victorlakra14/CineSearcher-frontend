import { existsById } from "neetocist";
import { append, filter } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoritesStore = create(
  persist(
    set => ({
      favorites: [],
      toggleFavorite: movie =>
        set(state => ({
          favorites: existsById(movie.id, state.favorites)
            ? filter(m => m.id !== movie.id, state.favorites)
            : append(movie, state.favorites),
        })),
    }),
    { name: "favorites-store" }
  )
);

export default useFavoritesStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoritesStore = create(
  persist(
    set => ({
      favorites: [],
      toggleFavorite: movie =>
        set(state => {
          const movieExists = state.favorites.some(m => m.id === movie.id);

          if (movieExists) {
            return {
              favorites: state.favorites.filter(m => m.id !== movie.id),
            };
          }

          return {
            favorites: [...state.favorites, movie],
          };
        }),
    }),
    { name: "favorites-store" }
  )
);

export default useFavoritesStore;

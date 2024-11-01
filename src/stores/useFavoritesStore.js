import { create } from "zustand";

const useFavoritesStore = create(set => ({
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
}));

export default useFavoritesStore;

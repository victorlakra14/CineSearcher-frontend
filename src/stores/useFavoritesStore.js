import { getFromLocalStorage, setToLocalStorage } from "utils/storage";
import { create } from "zustand";

import { FAVORITE_LOCAL_STORAGE_KEY } from "./constants";

const useFavoritesStore = create(set => ({
  favorites: getFromLocalStorage(FAVORITE_LOCAL_STORAGE_KEY) || [],
  toggleFavorite: movie =>
    set(state => {
      const movieExists = state.favorites.some(m => m.id === movie.id);

      const updatedFavorites = movieExists
        ? state.favorites.filter(m => m.id !== movie.id)
        : [...state.favorites, movie];

      setToLocalStorage(FAVORITE_LOCAL_STORAGE_KEY, updatedFavorites);

      return { favorites: updatedFavorites };
    }),
}));

export default useFavoritesStore;

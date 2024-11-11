import { existsById } from "neetocist";

export const checkFavorite = (id, favorite) => existsById(id, favorite);

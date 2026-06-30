import { createContext, useContext, useState, useCallback } from "react";

const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = useCallback((food) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === food.id);
      if (exists) return prev.filter((f) => f.id !== food.id);
      return [...prev, food];
    });
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const totalFavorites = favorites.length;

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, removeFavorite, totalFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error("useFavorite must be inside FavoriteProvider");
  return ctx;
}

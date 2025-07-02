
import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    // localStorage에서 즐겨찾기 목록을 불러옵니다
    const savedFavorites = localStorage.getItem('restaurantFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (restaurantId: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(restaurantId)
        ? prev.filter(id => id !== restaurantId)
        : [...prev, restaurantId];
      
      // localStorage에 저장
      localStorage.setItem('restaurantFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (restaurantId: number) => favorites.includes(restaurantId);

  return { favorites, toggleFavorite, isFavorite };
};

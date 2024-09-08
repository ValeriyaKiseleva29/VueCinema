// дз 6 номер 2 - Это хранилище управляет избранными фильмами
// дз 6 номер 8
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore({
    id: 'favoritesStore',
    state: () => ({
        favorites: [],
    }),
    actions: {
        //дз 6 номер 5 - Действие для удаления фильма из избранного
        removeFavorite(filmId) {
            //дз 6 номер 4 - Изменение состояния favorites
            this.favorites = this.favorites.filter(f => f.id !== filmId);
        },
        clearFavorites() {
            // дз 6 номер 4 - Очищение состояния favorites
            this.favorites = [];
        },
    },
});

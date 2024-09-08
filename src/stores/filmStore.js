// дз 6 номер 2  - это хранилище используется для фильмов
// дз 6 номер 8
import { defineStore } from 'pinia';
import { getAllFilms, searchFilmsByTitle } from '@/services/api.js';

export const useFilmStore = defineStore({
    id: 'filmStore',
    state: () => ({
        films: [],
        currentPage: 1,
        totalPages: 0,
        loading: false,
        hasMoreFilms: true,
        searchQuery: '',
        searchedFilms: [],
    }),
    getters: {
        // Селектор дз 6 номер 7
        randomMovieOnPage: (state) => {
            if (state.films.length === 0) return null;
            const randomIndex = Math.floor(Math.random() * state.films.length);
            const randomMovie = state.films[randomIndex];
            if (!randomMovie || (!randomMovie.ru_title && !randomMovie.orig_title)) {
                return null;
            }
            return randomMovie;
        }
    },
    actions: {
        async searchFilms() {
            if (!this.searchQuery) return;
            this.loading = true;
            try {
                const response = await searchFilmsByTitle(this.searchQuery);
                this.searchedFilms = response.data;
                this.currentPage = 1;
                this.totalPages = Math.ceil(response.data.length / 20);
                this.getFilmsByPageWithQuery();
                this.hasMoreFilms = this.currentPage < this.totalPages;
            } catch (error) {
                console.error('Ошибка при поиске фильмов:', error);
            } finally {
                this.loading = false;
            }
        },
        // дз 6 номер 5 асинхронная загрузка данных с API
        // дз 6 номер 9 асинхронные действия взаимодействуют с API
        // дз 6 номер 10 - пагинация
        async fetchFilms(page = 1) {
            this.loading = true;
            try {
                const data = await getAllFilms(page);
                if (data.data && data.data.length) {
                    this.films = data.data;
                    this.currentPage = page;
                    this.totalPages = Math.ceil(data.total / data.per_page);
                    this.hasMoreFilms = this.currentPage < this.totalPages;
                } else {
                    this.films = [];
                    this.totalPages = 0;
                    this.hasMoreFilms = false;
                }
            } catch (error) {
                console.error('Ошибка при загрузке фильмов:', error);
                this.films = [];
            } finally {
                this.loading = false;
            }
        },
        getFilmsByPageWithQuery() {
            const start = (this.currentPage - 1) * 20;
            this.films = this.searchedFilms.slice(start, start + 20);
            this.hasMoreFilms = this.currentPage < this.totalPages;
        },
        resetState() {
            this.films = [];
            this.searchQuery = '';
            this.searchedFilms = [];
            this.currentPage = 1;
            this.totalPages = 0;
            this.hasMoreFilms = true;
        },
        // дз 6 номер 10 - пагинация
        nextPage() {
            if (this.searchQuery) {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                    this.getFilmsByPageWithQuery();
                    this.hasMoreFilms = this.currentPage < this.totalPages;
                }
            } else {
                if (this.currentPage < this.totalPages) {
                    this.fetchFilms(this.currentPage + 1);
                }
            }
        },
        // дз 6 номер 10 - пагинация
        prevPage() {
            if (this.searchQuery) {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.getFilmsByPageWithQuery();
                }
            } else {
                if (this.currentPage > 1) {
                    this.fetchFilms(this.currentPage - 1);
                }
            }
        }
    }
});

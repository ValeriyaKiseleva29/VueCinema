import axios from 'axios';
import * as url from "node:url";

const filmToken = 'O0NZvxemcwkiq30bsgQoFKEQX6EqiVl7';
const filmEndpoint = 'movies';
const shortEndpoint = 'short';
const apiCinema = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2/films',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'e2c340fa-58e4-4ca8-9726-d8cb6a801707',
    }
});

const apiFilms = axios.create({
    baseURL: 'https://videocdn.tv/api/',
});
export const searchFilmsByTitle = async (title) => {
    try {
        const response = await apiFilms.get(`short?api_token=${filmToken}&title=${title}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при поиске фильма через API:', error);
        throw error;
    }
};


export const getAllFilms = async (page = null) => {
    if (page) {
        return await apiFilms.get(`${filmEndpoint}?api_token=${filmToken}&page=${page}`)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        return await apiFilms.get(`${filmEndpoint}?api_token=${filmToken}`)
            .then(res => {
                return res.data.data;
            })
            .catch(err => {
                console.log(err);
            });
    }
};
export const getOneFilm = async (id) => {
    return await apiFilms.get(`${shortEndpoint}?api_token=${filmToken}&kinopoisk_id=${id}`)
        .then(res => {
            return res.data.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getImageUrl = async (id) => {

    return await apiCinema.get(`/${id}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return {
                error: err,
                id: id,
                posterUrl: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  // Фейковые данные
            };
        });
};



import axios from 'axios'

const GENRES_URL = 'http://localhost:8083/genre';

class GenreService {

    getGenres() {
        return axios.get(GENRES_URL);
    }

    getGenreById(genreId){
        return axios.get(GENRES_URL + '/' + genreId);
    }

    createGenre(genre){
        return axios.post(GENRES_URL, genre);
    }

    updateGenre(genre){
        return axios.put(GENRES_URL, genre);
    }

    deleteGenre(genreId){
        return axios.delete(GENRES_URL + '/' + genreId);
    }

}

export default new GenreService();
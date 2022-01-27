import axios from 'axios'

const AUTHORS_URL = 'http://localhost:8083/author';

class AuthorService {

    getAuthors() {
        return axios.get(AUTHORS_URL);
    }

    getAuthorById(authorId){
        return axios.get(AUTHORS_URL + '/' + authorId);
    }

    createAuthor(author){
        return axios.post(AUTHORS_URL, author);
    }


    updateAuthor(author){
        return axios.put(AUTHORS_URL, author);
    }

    deleteAuthor(authorId){
        return axios.delete(AUTHORS_URL + '/' + authorId);
    }
}

export default new AuthorService();
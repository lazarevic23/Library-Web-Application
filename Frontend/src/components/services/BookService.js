import axios from 'axios'

const BOOKS_URL = 'http://localhost:8083/book';

class BookService {

    getBooks() {
        return axios.get(BOOKS_URL);
    }

    createBook(book){
        return axios.post(BOOKS_URL, book);
    }

    getBookById(bookId){
        return axios.get(BOOKS_URL + '/' + bookId);
    }

    updateBook(book){
        return axios.put(BOOKS_URL, book);
    }

    deleteBook(bookId){
        return axios.delete(BOOKS_URL + '/' + bookId);
    }

    getBooksByGenre(genreId){
        console.log("usloo");
        return axios.get(BOOKS_URL + '/genre/' + genreId); 
    }
}

export default new BookService();
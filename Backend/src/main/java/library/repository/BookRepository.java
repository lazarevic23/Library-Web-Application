package library.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import library.jpa.Author;
import library.jpa.Book;
import library.jpa.Genre;

public interface BookRepository extends JpaRepository<Book, Integer>{
	
	Collection<Book> findByTitleContainingIgnoreCase(String title);
	
	Collection<Book> findByAuthor(Author a);
	
	Collection<Book> findByGenre(Genre g);

}

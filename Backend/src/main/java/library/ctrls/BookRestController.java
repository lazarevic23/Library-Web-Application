package library.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import library.jpa.Author;
import library.jpa.Book;
import library.jpa.Genre;
import library.repository.AuthorRepository;
import library.repository.BookRepository;
import library.repository.GenreRepository;
import library.exception.ResourceNotFoundException;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class BookRestController {
	
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private AuthorRepository authorRepository;
	
	@Autowired
	private GenreRepository genreRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("book")
	public Collection<Book> getBooks() {
		return bookRepository.findAll();
	}
	
	@GetMapping("book/{id}")
	public Book getBook(@PathVariable("id") Integer id) {
		return bookRepository.getOne(id);
				//.orElseThrow(() -> new ResourceNotFoundException("Book not found with id :" + id));
	}
	
	@GetMapping("bookTitle/{title}")
	public Collection<Book> getBooksByTitle(@PathVariable("title") String title){
		return bookRepository.findByTitleContainingIgnoreCase(title);
	}
	
	@GetMapping("bookAuthor/{author}")
	public Collection<Book> getBooksByAuthorId(@PathVariable("author") int author) {
		Author a = authorRepository.getOne(author);
		return bookRepository.findByAuthor(a);
	}
	
	@GetMapping("book/genre/{genre}")
	public Collection<Book> getBooksByGenreId(@PathVariable("genre") int genre){
		Genre g = genreRepository.getOne(genre);
		return bookRepository.findByGenre(g);
	}
	
	@PostMapping("book")
	public ResponseEntity<Book> insertBook(@RequestBody Book book) {
		if(!bookRepository.existsById(book.getBookId())) {
			bookRepository.save(book);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("book")
	public ResponseEntity<Book> updateBook(@RequestBody Book book) {
		if(!bookRepository.existsById(book.getBookId())) 
			return new ResponseEntity<Book>(HttpStatus.NO_CONTENT);
		bookRepository.save(book);
		return new ResponseEntity<Book>(HttpStatus.OK);
	}
	
	@DeleteMapping("book/{id}")
	public ResponseEntity<Book> deleteBook(@PathVariable ("id") Integer id) {
		if(!bookRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		jdbcTemplate.execute("delete from image where book = "+id);
		jdbcTemplate.execute("delete from reservation where book = "+id);
		bookRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}

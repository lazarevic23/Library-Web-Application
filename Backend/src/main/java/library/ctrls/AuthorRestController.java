package library.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import library.jpa.Author;
import library.repository.AuthorRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class AuthorRestController {
	
	@Autowired
	private AuthorRepository authorRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("author")
	public Collection<Author> getAuthors() {
		return authorRepository.findAll();
	}
	
	@GetMapping("author/{id}")
	public Author getAuthor(@PathVariable("id") Integer id) {
		return authorRepository.getOne(id);
	}
	
	@GetMapping("authorForename/{forename}")
	public Collection<Author> getAuthorsByForename(@PathVariable("forename") String forename){
		return authorRepository.findByForenameContainingIgnoreCase(forename);
	}
	
	@GetMapping("authorSurname/{surname}")
	public Collection<Author> getAuthorsBySurname(@PathVariable("surname") String surname){
		return authorRepository.findBySurnameContainingIgnoreCase(surname);
	}
	
	@PostMapping("author")
	public ResponseEntity<Author> insertAuthor(@RequestBody Author author) {
		if(!authorRepository.existsById(author.getAuthorId())) {
			authorRepository.save(author);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("author")
	public ResponseEntity<Author> updateAuthor(@RequestBody Author author) {
		if(!authorRepository.existsById(author.getAuthorId()))
			return new ResponseEntity<Author>(HttpStatus.NO_CONTENT);
		authorRepository.save(author);
		return new ResponseEntity<Author>(HttpStatus.OK);
	}
	
	@DeleteMapping("author/{id}")
	public ResponseEntity<Author> deleteAuthor(@PathVariable ("id") Integer id) {
		if(!authorRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		jdbcTemplate.execute("delete from book where author = "+id);
		authorRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}

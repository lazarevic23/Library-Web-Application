package library.ctrls;


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

import library.jpa.Genre;
import library.repository.GenreRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class GenreRestController {

	@Autowired
	private GenreRepository genreRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("genre")
	public ResponseEntity<?> getGenres() {
		return new ResponseEntity<>(genreRepository.findAll(),HttpStatus.OK);
	}
	
	@GetMapping("genre/{id}")
	public ResponseEntity<?> getGenre(@PathVariable("id") Integer id){	
		if(!genreRepository.existsById(id))
			return new ResponseEntity<>("The genre not found with id :\" + id!", HttpStatus.NO_CONTENT);	 		
		return new ResponseEntity<>(genreRepository.getOne(id), HttpStatus.OK);
	}
	
	@GetMapping("genreName/{name}")
	public ResponseEntity<?> getGenresByName(@PathVariable("name") String name){
		if(genreRepository.findByNameContainingIgnoreCase(name)==null)
			return new ResponseEntity<>("The genre not found with name :\" + name!", HttpStatus.NO_CONTENT);	
		return new ResponseEntity<>(genreRepository.findByNameContainingIgnoreCase(name), HttpStatus.OK);
	}
	
	@PostMapping("genre")
	public ResponseEntity<?> insertGenre(@RequestBody Genre genre) {
		if(!genreRepository.existsById(genre.getGenreId())) {
			genreRepository.save(genre);
			return new ResponseEntity<>("The genre is successfully added!", HttpStatus.OK);
		}
		return new ResponseEntity<>("The genre isn't successfully added!", HttpStatus.CONFLICT);
	}
	
	@PutMapping("genre")
	public ResponseEntity<?> updateGenre(@RequestBody Genre genre) {
		if(!genreRepository.existsById(genre.getGenreId()))
			return new ResponseEntity<>("The genre isn't successfully updated!", HttpStatus.NO_CONTENT);
		genreRepository.save(genre);
		return new ResponseEntity<>("The genre is successfully updated!", HttpStatus.OK); 
	}
	
	
	@DeleteMapping("genre/{id}")
	public ResponseEntity<?> deleteGenre(@PathVariable ("id") Integer id){
		if(!genreRepository.existsById(id))
			return new ResponseEntity<>("The genre not found with id :\" + id!", HttpStatus.NO_CONTENT);	
		jdbcTemplate.execute("delete from book where genre = "+id);
		genreRepository.deleteById(id);
		return new ResponseEntity<>("The genre is successfully deleted!", HttpStatus.OK);
	}
}
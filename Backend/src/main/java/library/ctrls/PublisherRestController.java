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

import library.jpa.Publisher;
import library.repository.PublisherRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class PublisherRestController {
	
	@Autowired
	private PublisherRepository publisherRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("publisher")
	public Collection<Publisher> getPublishers() {
		return publisherRepository.findAll();
	}
	
	@GetMapping("publisher/{id}")
	public Publisher getPublisher(@PathVariable("id") Integer id) {
		return publisherRepository.getOne(id);
	}
	
	@GetMapping("publisherName/{name}")
	public Collection<Publisher> getPublishersByName(@PathVariable("name") String name){
		return publisherRepository.findByNameContainingIgnoreCase(name);
	}
	
	@PostMapping("publisher")
	public ResponseEntity<Publisher> insertPublisher(@RequestBody Publisher publisher) {
		if(!publisherRepository.existsById(publisher.getPublisherId())) {
			publisherRepository.save(publisher);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("publisher")
	public ResponseEntity<Publisher> updatePublisher(@RequestBody Publisher publisher) {
		if(!publisherRepository.existsById(publisher.getPublisherId()))
			return new ResponseEntity<Publisher>(HttpStatus.NO_CONTENT);
		publisherRepository.save(publisher);
		return new ResponseEntity<Publisher>(HttpStatus.OK);
	}
	
	@DeleteMapping("publisher/{id}")
	public ResponseEntity<Publisher> deletePublisher(@PathVariable ("id") Integer id) {
		if(!publisherRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		jdbcTemplate.execute("delete from book where publisher = "+id);
		publisherRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}

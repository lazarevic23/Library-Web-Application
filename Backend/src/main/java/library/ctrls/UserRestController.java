package library.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import library.jpa.User;
import library.repository.UserRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class UserRestController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("user")
	public Collection<User> getUsers() {
		return userRepository.findAll();
	}
	
	@GetMapping("user/{id}")
	public User getUser(@PathVariable("id") Long id) {
		return userRepository.getOne(id);
	}
	
	//@GetMapping("userEmail/{email}")
	//public User getUserByEmail(@PathVariable("email") String email){
		//return userRepository.findByEmail(email);
	//}
	
	
	@PostMapping("user")
	public ResponseEntity<User> insertUser(@RequestBody User user) {
		if(!userRepository.existsById(user.getId())) {
			userRepository.save(user);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@DeleteMapping("user/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable ("id") Long id) {
		if(!userRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		jdbcTemplate.execute("delete from reservation where user_id = "+id);
		userRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
}



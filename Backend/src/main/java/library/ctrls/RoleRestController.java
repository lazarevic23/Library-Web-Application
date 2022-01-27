package library.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import library.jpa.Role;
import library.repository.RoleRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class RoleRestController {

	@Autowired
	private RoleRepository roleRepository;
	
	@GetMapping("role")
	public Collection<Role> getRoles() {
		return roleRepository.findAll();
	}
	
	@GetMapping("role/{id}")
	public Role getRole(@PathVariable("id") Long id) {
		return roleRepository.getOne(id);
	}
	
//	@PostMapping("role")
//	public ResponseEntity<Role> insertRole(@RequestBody Role role) {
//		if(!roleRepository.existsById(role.getId())) {
//			roleRepository.save(role);
//			return new ResponseEntity<>(HttpStatus.OK);
//		}
//		return new ResponseEntity<>(HttpStatus.CONFLICT);
//	}
}

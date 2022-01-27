package library.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import library.jpa.Book;
import library.jpa.Reservation;
import library.jpa.User;
import library.repository.BookRepository;
import library.repository.UserRepository;
import library.repository.ReservationRepository;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class ReservationRestController {

	@Autowired
	private ReservationRepository reservationRepository;
	
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping("reservation")
	public Collection<Reservation> getReservations() {
		return reservationRepository.findAll();
	}
	
	@GetMapping("reservation/{id}")
	public Reservation getReservation(@PathVariable("id") Integer id) {
		return reservationRepository.getOne(id);
	}
	
	@GetMapping("reservationBook/{book}")
	public Collection<Reservation> getReservationsByBookId(@PathVariable("book") int book) {
		Book b = bookRepository.getOne(book);
		return reservationRepository.findByBook(b);
	}
	
	@GetMapping("reservation/user/{user}")
	public Collection<Reservation> getReservationsByClientId(@PathVariable("user") Long user){
		User u = userRepository.getOne(user);
		return reservationRepository.findByUser(u);
	}
	
	@PostMapping("reservation")
	public ResponseEntity<Reservation> insertReservation(@RequestBody Reservation reservation) {
		if(!reservationRepository.existsById(reservation.getReservationId())) {
			reservationRepository.save(reservation);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("reservation")
	public ResponseEntity<Reservation> updateReservation(@RequestBody Reservation reservation) {
		if(!reservationRepository.existsById(reservation.getReservationId()))
			return new ResponseEntity<Reservation>(HttpStatus.NO_CONTENT);
		reservationRepository.save(reservation);
		return new ResponseEntity<Reservation>(HttpStatus.OK);
	}
	
	@DeleteMapping("reservation/{id}")
	public ResponseEntity<Reservation> deleteReservation(@PathVariable ("id") Integer id) {
		if(!reservationRepository.existsById(id))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		reservationRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}

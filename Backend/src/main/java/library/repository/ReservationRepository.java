package library.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import library.jpa.Book;
import library.jpa.User;
import library.jpa.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{

	Collection<Reservation> findByBook(Book b);
	
	Collection<Reservation> findByUser(User c);
}

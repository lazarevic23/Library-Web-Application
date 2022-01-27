package library.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import library.jpa.Author;

public interface AuthorRepository extends JpaRepository<Author, Integer>{
	
	Collection<Author> findByForenameContainingIgnoreCase(String forename);
	
	Collection<Author> findBySurnameContainingIgnoreCase(String surname);

}

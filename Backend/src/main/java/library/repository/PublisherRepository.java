package library.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import library.jpa.Publisher;

public interface PublisherRepository extends JpaRepository<Publisher, Integer>{

	Collection<Publisher> findByNameContainingIgnoreCase(String name);
}

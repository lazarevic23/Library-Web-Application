package library.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import library.jpa.Genre;

public interface GenreRepository extends JpaRepository<Genre, Integer>{

	Collection<Genre> findByNameContainingIgnoreCase(String name);
}

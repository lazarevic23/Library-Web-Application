package library.jpa;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the genre database table.
 * 
 */
@Entity
@NamedQuery(name="Genre.findAll", query="SELECT g FROM Genre g")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) 
public class Genre implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="GENRE_GENREID_GENERATOR", sequenceName="GENRE_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="GENRE_GENREID_GENERATOR")
	@Column(name="genre_id")
	private Integer genreId;

	private String description;

	private String name;
	
	private String image;

	//bi-directional many-to-one association to Book
	@JsonIgnore
	@OneToMany(mappedBy="genre")
	private List<Book> books;

	public Genre() {
	}

	public Integer getGenreId() {
		return this.genreId;
	}

	public void setGenreId(Integer genreId) {
		this.genreId = genreId;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public List<Book> getBooks() {
		return this.books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}

	public Book addBook(Book book) {
		getBooks().add(book);
		book.setGenre(this);

		return book;
	}

	public Book removeBook(Book book) {
		getBooks().remove(book);
		book.setGenre(null);

		return book;
	}

}
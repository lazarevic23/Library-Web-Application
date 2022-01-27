package library.jpa;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


@Entity
@NamedQuery(name="Book.findAll", query="SELECT b FROM Book b")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) 
public class Book implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="BOOK_BOOKID_GENERATOR", sequenceName="BOOK_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="BOOK_BOOKID_GENERATOR")
	@Column(name="book_id")
	private Integer bookId;

	private String description;

	@Column(name="number_of_pages")
	private Integer numberOfPages;

	private Integer quantity;

	private String status;

	private String title;
	
	private String image;

	//bi-directional many-to-one association to Author
	@ManyToOne
	@JoinColumn(name="author")
	private Author author;

	//bi-directional many-to-one association to Genre
	@ManyToOne
	@JoinColumn(name="genre")
	private Genre genre;

	//bi-directional many-to-one association to Publisher
	@ManyToOne
	@JoinColumn(name="publisher")
	private Publisher publisher;

	//bi-directional many-to-one association to Reservation
	@JsonIgnore
	@OneToMany(mappedBy="book")
	private List<Reservation> reservations;

	public Book() {
	}

	public Integer getBookId() {
		return this.bookId;
	}

	public void setBookId(Integer bookId) {
		this.bookId = bookId;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getNumberOfPages() {
		return this.numberOfPages;
	}

	public void setNumberOfPages(Integer numberOfPages) {
		this.numberOfPages = numberOfPages;
	}

	public Integer getQuantity() {
		return this.quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Author getAuthor() {
		return this.author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public Genre getGenre() {
		return this.genre;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}

	public Publisher getPublisher() {
		return this.publisher;
	}

	public void setPublisher(Publisher publisher) {
		this.publisher = publisher;
	}

	public List<Reservation> getReservations() {
		return this.reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}

	public Reservation addReservation(Reservation reservation) {
		getReservations().add(reservation);
		reservation.setBook(this);

		return reservation;
	}

	public Reservation removeReservation(Reservation reservation) {
		getReservations().remove(reservation);
		reservation.setBook(null);

		return reservation;
	}


}
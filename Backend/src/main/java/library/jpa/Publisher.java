package library.jpa;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the publisher database table.
 * 
 */
@Entity
@NamedQuery(name="Publisher.findAll", query="SELECT p FROM Publisher p")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) 
public class Publisher implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="PUBLISHER_PUBLISHERID_GENERATOR", sequenceName="PUBLISHER_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PUBLISHER_PUBLISHERID_GENERATOR")
	@Column(name="publisher_id")
	private Integer publisherId;

	private String address;

	private String city;

	private String contact;

	private String country;

	private String name;

	private String pib;

	//bi-directional many-to-one association to Book
	@JsonIgnore
	@OneToMany(mappedBy="publisher")
	private List<Book> books;

	public Publisher() {
	}

	public Integer getPublisherId() {
		return this.publisherId;
	}

	public void setPublisherId(Integer publisherId) {
		this.publisherId = publisherId;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getContact() {
		return this.contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPib() {
		return this.pib;
	}

	public void setPib(String pib) {
		this.pib = pib;
	}

	public List<Book> getBooks() {
		return this.books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}

	public Book addBook(Book book) {
		getBooks().add(book);
		book.setPublisher(this);

		return book;
	}

	public Book removeBook(Book book) {
		getBooks().remove(book);
		book.setPublisher(null);

		return book;
	}

}
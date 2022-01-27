package library.jpa;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the author database table.
 * 
 */
@Entity
@NamedQuery(name="Author.findAll", query="SELECT a FROM Author a")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) 
public class Author implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="AUTHOR_AUTHORID_GENERATOR", sequenceName="AUTHOR_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="AUTHOR_AUTHORID_GENERATOR")
	@Column(name="author_id")
	private Integer authorId;

	@Temporal(TemporalType.DATE)
	@Column(name="date_of_birth")
	private Date dateOfBirth;

	private String forename;

	private String surname;

	//bi-directional many-to-one association to Book
	@JsonIgnore
	@OneToMany(mappedBy="author")
	private List<Book> books;

	public Author() {
	}

	public Integer getAuthorId() {
		return this.authorId;
	}

	public void setAuthorId(Integer authorId) {
		this.authorId = authorId;
	}

	public Date getDateOfBirth() {
		return this.dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getForename() {
		return this.forename;
	}

	public void setForename(String forename) {
		this.forename = forename;
	}

	public String getSurname() {
		return this.surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public List<Book> getBooks() {
		return this.books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}

	public Book addBook(Book book) {
		getBooks().add(book);
		book.setAuthor(this);

		return book;
	}

	public Book removeBook(Book book) {
		getBooks().remove(book);
		book.setAuthor(null);

		return book;
	}

}
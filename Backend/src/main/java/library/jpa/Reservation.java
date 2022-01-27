package library.jpa;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;


/**
 * The persistent class for the reservation database table.
 * 
 */
@Entity
@NamedQuery(name="Reservation.findAll", query="SELECT r FROM Reservation r")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" }) 
public class Reservation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="RESERVATION_RESERVATIONID_GENERATOR", sequenceName="RESERVATION_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="RESERVATION_RESERVATIONID_GENERATOR")
	@Column(name="reservation_id")
	private Integer reservationId;

	@Temporal(TemporalType.DATE)
	@Column(name="date_of_reservation")
	private Date dateOfReservation;

	@Temporal(TemporalType.DATE)
	@Column(name="expiry_date")
	private Date expiryDate;

	//bi-directional many-to-one association to Book
	@ManyToOne
	@JoinColumn(name="book")
	private Book book;

	//bi-directional many-to-one association to Client
	//@ManyToOne
	//@JoinColumn(name="client")
	//private Client client;
	
	@ManyToOne
	//@JoinColumn(name="users")
	private User user;

	public Reservation() {
	}

	public Integer getReservationId() {
		return this.reservationId;
	}

	public void setReservationId(Integer reservationId) {
		this.reservationId = reservationId;
	}

	public Date getDateOfReservation() {
		return this.dateOfReservation;
	}

	public void setDateOfReservation(Date dateOfReservation) {
		this.dateOfReservation = dateOfReservation;
	}

	public Date getExpiryDate() {
		return this.expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public Book getBook() {
		return this.book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	//public Client getClient() {
		//return this.client;
	//}

	//public void setClient(Client client) {
		//this.client = client;
	//}
	
	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
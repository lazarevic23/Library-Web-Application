import React, { Component } from 'react';

import ReservationService from '../services/ReservationService';
import AuthService from '../services/auth.service';

import {Card, Table, ButtonGroup, InputGroup, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faList,faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import  Navbar from '../Navbar';


class UserReservations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reservations: [],
            currentPage : 1,
            reservationsPerPage : 5,
        }
        this.deleteReservation = this.deleteReservation.bind(this);
    }

    componentDidMount(){
        const user = AuthService.getCurrentUser();
        ReservationService.getReservationsByUser(user.id).then((res) => {
            this.setState({ reservations: res.data});
        });
    }

    deleteReservation(reservationId){
        ReservationService.deleteReservation(reservationId).then( res => {
            this.setState({reservations: this.state.reservations.filter(reservation => reservation.reservationId !== reservationId)});
            alert("You have successfully deleted your reservation!");
        });
    }

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.reservations.length / this.state.reservationsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.reservations.length / this.state.reservationsPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.reservations.length / this.state.reservationsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    render() {
        const {reservations, currentPage, reservationsPerPage} = this.state;
        const lastIndex = currentPage * reservationsPerPage;
        const firstIndex = lastIndex - reservationsPerPage;
        const currentReservations = reservations.slice(firstIndex, lastIndex);
        const totalPages = Math.floor(reservations.length / reservationsPerPage)+1;    

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        return (
            <div>
                <Navbar/>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Reservation Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList} /> My Reservations  </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Book Title</th>
                                  <th>Author</th>
                                  <th>Date Of Reservation</th>
                                  <th>Expiry Date</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                    this.state.reservations.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="6">No Reservations Available.</td>
                                    </tr> :
                                    currentReservations.map((reservation, index) => (
                                    <tr key={index}>
                                        <td>{reservation.book.title}</td>
                                        <td>{reservation.book.author.forename+ ' ' +reservation.book.author.surname}</td>
                                        <td>{reservation.dateOfReservation}</td>
                                        <td>{reservation.expiryDate}</td>
                                        <td>
                                            <ButtonGroup>  
                                                <Button size="sm" variant="outline-danger" onClick={ () => this.deleteReservation(reservation.reservationId)} ><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>   
                                        </td>

                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                                        onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer>
                </Card>
            </div>
            );
    }
}

export default UserReservations




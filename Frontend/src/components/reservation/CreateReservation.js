import React from 'react';
import BookService from '../services/BookService';

import AllUserServce from '../services/AllUserServce';
import AuthService from '../services/auth.service';
import ReservationService from '../services/ReservationService';

import {Card, Form, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo} from '@fortawesome/free-solid-svg-icons';


class CreateReservation extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            reservationId: '1234',
            bookId: this.props.match.params.bookId,
            dateOfReservation:new Date().toISOString().split("T")[0],
            expiryDate:'2021-09-25',
            book: '',
            user: '',
        }
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        BookService.getBookById(this.state.bookId).then((response)=> {
            this.setState({book: response.data})
            console.log(this.state.book);
        });

        let loggerUser = AuthService.getCurrentUser();
        let userId = loggerUser.id;
        AllUserServce.getUserById(userId).then((res) => {
            let user = res.data;
            this.setState({user:user});
        });
    }

     confirm = (e) => {
        e.preventDefault();
        let reservation = {reservationId:this.state.reservationId, 
            dateOfReservation: this.state.dateOfReservation, 
            expiryDate: this.state.expiryDate, book: this.state.book, user: this.state.user};
        console.log('user => ' + JSON.stringify(this.state.user));
        //console.log('userId => ' + JSON.stringify(this.state.userId));
        ReservationService.createReservation(reservation).then(res =>{
            alert("You have successfully reserved the book!");
            this.props.history.push(`/list-userReservations/${this.state.bookId}`);
        }); 

    }

    cancel = () =>{
        return this.props.history.push('/list-book');
        //return this.props.history.push({
            //pathname: this.props.location.pathname});
    }

    render () {
        return (
            <div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                 <h4>Details of reservation:</h4>
                </Card.Header>
                <Form onReset={this.cancel} onSubmit={ this.confirm} id="bookFormId">
                    <Card.Body>   
                        <p> Book Title: {this.state.book.title} </p> 
                        <p> Date Of Reservation: {this.state.dateOfReservation} </p>   
                        <p> Expiry Date: {this.state.expiryDate} </p>  
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit" >
                            <FontAwesomeIcon icon={faSave} /> Reserve
                        </Button>{' '}
                        <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Cancel
                        </Button>{' '}
                    </Card.Footer>               
                </Form>
            </Card>
        </div>
        );
    }
}

export default CreateReservation







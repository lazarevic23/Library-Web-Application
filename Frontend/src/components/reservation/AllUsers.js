import React from 'react';

import AllUserService from '../services/AllUserServce'

import {Card, Table, ButtonGroup, InputGroup, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import Navbar from '../Navbar';


class AllUsers extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users:[],
            currentPage: 1,
            usersPerPage: 6,
            search: "",    
        }
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        AllUserService.getUsers().then((res) => {
            this.setState({users: res.data});
        });
    }

    updateSearch(event) {
        this.setState({search:event.target.value.substr(0,20)});
    }

    deleteUser(id) {
        AllUserService.deleteUser(id).then( res=> {
            alert("The user was successfully deleted!");
            this.setState({users: this.state.users.filter(user => user.id !== id)});
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
        if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.users.length / this.state.usersPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    render () {
        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#",
            textAlign: "center",
            fontWeight: "bold"
        };

        const {users, currentPage, usersPerPage} = this.state;
          const lastIndex = currentPage*usersPerPage;
          const firstIndex = lastIndex - usersPerPage;
          const currentUsers= users.slice(firstIndex,lastIndex);
          const totalPages = Math.floor(users.length / usersPerPage)+1;

          
        return (
            <div>
            <Navbar/>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Reservation Deleted Successfully."} type = {"danger"}/>
            </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> All Users </Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                          {
                                currentUsers.length === 0 ?
                                <tr align="center">
                                  <td colSpan="6">No Users.</td>
                                </tr> :
                                currentUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button size="sm" variant="outline-danger" onClick={ () => this.deleteUser(user.id)} /* onClick={this.deleteGenre.bind(this, genre.genre_id)} */ ><FontAwesomeIcon icon={faTrash} /></Button>
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
        )
    }
}

export default AllUsers;


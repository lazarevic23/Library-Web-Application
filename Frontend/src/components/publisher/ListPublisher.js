import React, { Component } from 'react';

import PublisherService from '../services/PublisherService';
import {Card, Table, ButtonGroup, InputGroup, Form, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faPlusSquare, faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import  Navbar from '../Navbar';


class ListPublisher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            publishers: [],
            currentPage : 1,
            booksPerPage : 6,
            search: ""
        }
        this.addPublisher = this.addPublisher.bind(this);
        this.editPublisher = this.editPublisher.bind(this);
        this.deletePublisher = this.deletePublisher.bind(this); 
    }

    componentDidMount(){
        PublisherService.getPublishers().then((res) => {
            this.setState({ publishers: res.data});
        });
    }

    deletePublisher(publisherId){
        PublisherService.deletePublisher(publisherId).then( res => {
            this.setState({publishers: this.state.publishers.filter(publisher => publisher.publisherId !== publisherId)});
        });
    }

    editPublisher(publisherId){
        this.props.history.push(`/update-publisher/${publisherId}`);
    }

     addPublisher(){
        this.props.history.push('/add-publisher');
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
        if(this.state.currentPage < Math.ceil(this.state.publishers.length / this.state.booksPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.publishers.length / this.state.booksPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.publishers.length / this.state.booksPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    updateSearch(event) {
        this.setState({search:event.target.value.substr(0,20)});
    }

    render() {
        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        const {publishers, currentPage, booksPerPage} = this.state;

        let filteredBooks = publishers.filter(
            (publisher) => {
                return publisher.name.toLowerCase().indexOf(
                    this.state.search.toLowerCase()) !== -1;
            }
          )
        
        const lastIndex = currentPage * booksPerPage;
        const firstIndex = lastIndex - booksPerPage;
        const currentBooks = filteredBooks.slice(firstIndex, lastIndex);
        const totalPages = Math.floor(publishers.length / booksPerPage)+1;

        return (
            <div>
                <Navbar/>
                <Form inline> 
                    <FormControl type="text" placeholder="Type Publisher Name..."  className="mr-sm-1" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                    <Button size="sm" variant="outline-dark" className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faSearch} /></Button>    
                </Form>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Publisher Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList} /> Publisher List <Button size="sm" variant="outline" onClick={this.addPublisher}  className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faPlusSquare} /></Button> </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>PIB</th>
                                  <th>Address</th>
                                  <th>City</th>
                                  <th>Country</th>
                                  <th>Contact</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                    currentBooks.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="6">No Publishers Available.</td>
                                    </tr> :
                                    currentBooks.map((publisher, index) => (
                                    <tr key={index}>                                       
                                        <td>{publisher.name}</td>
                                        <td>{publisher.pib}</td>
                                        <td>{publisher.address}</td>
                                        <td>{publisher.city}</td>
                                        <td>{publisher.country}</td>
                                        <td>{publisher.contact}</td>
                                        <td>
                                            <ButtonGroup>                                              
                                                <Button size="sm" variant="outline" onClick = { () => this.editPublisher(publisher.publisherId)}  className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>
                                                <Button size="sm" variant="outline-danger" onClick={ () => this.deletePublisher(publisher.publisherId)} ><FontAwesomeIcon icon={faTrash} /></Button>                                  
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                     <Card.Footer >                  
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

export default ListPublisher




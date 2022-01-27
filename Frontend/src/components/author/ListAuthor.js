import React, { Component } from 'react';
import AuthorService from '../services/AuthorService';
import {Card, Table, ButtonGroup, InputGroup, Form, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faPlusSquare, faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import  Navbar from '../Navbar';

class ListAuthor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authors: [],
            currentPage : 1,
            booksPerPage : 6,
            search: ""
        }
        this.addAuthor = this.addAuthor.bind(this);
        this.editAuthor = this.editAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);   
    }

    componentDidMount(){
        AuthorService.getAuthors().then((res) => {
            this.setState({ authors: res.data});
        });
    }

    deleteAuthor(authorId){
        AuthorService.deleteAuthor(authorId).then( res => {
            alert("The author was successfully deleted!");
            this.setState({authors: this.state.authors.filter(author => author.authorId !== authorId)});
        });
    }

    editAuthor(authorId){
        this.props.history.push(`/update-author/${authorId}`);
    }

     addAuthor(){
        this.props.history.push('/add-author');
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
        if(this.state.currentPage < Math.ceil(this.state.authors.length / this.state.booksPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.authors.length / this.state.booksPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.authors.length / this.state.booksPerPage)) {
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

        const {authors, currentPage, booksPerPage} = this.state;

        let filteredBooks = authors.filter(
            (author) => {
                return author.forename.toLowerCase().indexOf(
                    this.state.search.toLowerCase()) !== -1;
            }
          )
        
        const lastIndex = currentPage * booksPerPage;
        const firstIndex = lastIndex - booksPerPage;
        const currentBooks = filteredBooks.slice(firstIndex, lastIndex);
        const totalPages = Math.floor(authors.length / booksPerPage)+1;

        return (
            <div>
                <Navbar/>
                <Form inline> 
                    <FormControl type="text" placeholder="Type Author Forename..."  className="mr-sm-1" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                    <Button size="sm" variant="outline-dark" className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faSearch} /></Button>         
                </Form>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Author Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList} /> Author List <Button size="sm" variant="outline" onClick={this.addAuthor}  className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faPlusSquare} /></Button> </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Forename</th>
                                  <th>Surname</th>
                                  <th>Date Of Birth</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                              {
                                    currentBooks.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="6">No Authors Available.</td>
                                    </tr> :
                                    currentBooks.map((author, index) => (
                                    <tr key={index}>
                                        
                                        <td>{author.forename}</td>
                                        <td>{author.surname}</td>
                                        <td>{author.dateOfBirth}</td>
                                        <td>
                                            <ButtonGroup>      
                                                <Button size="sm" variant="outline" onClick = { () => this.editAuthor(author.authorId)}  className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>
                                                <Button size="sm" variant="outline-danger" onClick={ () => this.deleteAuthor(author.authorId)} ><FontAwesomeIcon icon={faTrash} /></Button>
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

export default ListAuthor




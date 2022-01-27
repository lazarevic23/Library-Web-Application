import React, { Component } from 'react';

import BookService from '../services/BookService';
import AuthService from '../services/auth.service';

import {Card, InputGroup, FormControl, Button, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faPlusSquare, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import  Navbar from '../Navbar';


class ListBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            user: '',
            bookOne:'',
            currentPage : 1,
            booksPerPage : 6,
            search: "",
            currentUser: undefined,
            showModeratorBoard: false,
            showAdminBoard: false,
        }
        this.addBook = this.addBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.addReservation = this.addReservation.bind(this);
    }

    componentDidMount(){
        BookService.getBooks().then((res) => {
            this.setState({ books: res.data});
        });

        const user = AuthService.getCurrentUser();
        if(user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    addReservation(bookId){
        this.props.history.push(`/reserve-book/${bookId}`);   
    }

    deleteBook(bookId){
        BookService.deleteBook(bookId).then( res => {
            alert("The book was successfully deleted!");
            this.setState({books: this.state.books.filter(book => book.bookId !== bookId)});
        });
    }

    editBook(bookId){
        this.props.history.push(`/update-book/${bookId}`);
    }

    addBook(){
        this.props.history.push('/add-book');
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
        if(this.state.currentPage < Math.ceil(this.state.books.length / this.state.booksPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.books.length / this.state.booksPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.books.length / this.state.booksPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    updateSearch(event) {
        this.setState({search:event.target.value.substr(0,20)});
    }

    render() {
        const {currentUser, books, currentPage, booksPerPage} = this.state;

        let filteredBooks = books.filter(
            (book) => {
                return book.title.toLowerCase().indexOf(
                    this.state.search.toLowerCase()) !== -1;
            }
          )

        const lastIndex = currentPage * booksPerPage;
        const firstIndex = lastIndex - booksPerPage;
        const currentBooks = filteredBooks.slice(firstIndex, lastIndex);
        const totalPages = Math.floor(books.length / booksPerPage)+1;

        const sortBooks = (currentBooks, ascending) => {
            return currentBooks.sort((bookA, bookB) => {
              if (ascending) {
                return bookA.publisher > bookB.publisher ? 1 : -1;
              } else {
                return bookA.publisher < bookB.publisher ? 1 : -1;
              }
            }); 
          };

        const queryParams = new URLSearchParams(this.props.location.search);
        const isSortingAscending = queryParams.get('sort') === 'asc';
        const sortedBooks = sortBooks(currentBooks, isSortingAscending);

        const changeSortingHandler = () => {
            this.props.history.push({
              pathname: this.props.location.pathname,
              search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
            });
          };

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        const renderCard = (sortedBooks, index) => {
            return (
                <Card className="card border-primary bg-dark mb-3 text-center text-white" style={{"maxWidth": "25rem","marginLeft":"30px "}} key={index}  >
                  <div class="card-header bg-transparent "><h4>{sortedBooks.title}</h4></div>
                  <img className="card-img-top" src={sortedBooks.image} alt="Card image cap" style= {{"width":"200px", "height":"250px"}}/>
                <div className="card-body" >
                   <div style= {{ fontStyle: "italic"}} className="card-title">{sortedBooks.description}</div>
                   <div className="card-title">Genre:{" " +sortedBooks.genre.name}</div>
                   <div className="card-title">Author:{" " +sortedBooks.author.forename+ ' '+sortedBooks.author.surname}</div>
                   <div className="card-title">Publisher:{" " +sortedBooks.publisher.name}</div>
                   <div className="card-title">Number of Pages:{" " +sortedBooks.numberOfPages}</div>
                  <div className="card-title">Status:{" " +sortedBooks.status}</div>
                   <div className="card-title">Quantity:{" " +sortedBooks.quantity} </div>         
                  
                <div class="card-footer bg-transparent border-primary">
                  
                   {currentUser &&  (currentUser.roles[0] === "ROLE_MODERATOR" || currentUser.roles[1] === "ROLE_MODERATOR" ) && (
                     <div>
                       <Button size="sm" variant="outline" onClick = { () => this.editBook(sortedBooks.bookId)}  className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Button> 
                        <Button size="sm" variant="outline-danger" onClick={ () => this.deleteBook(sortedBooks.bookId)} ><FontAwesomeIcon icon={faTrash} /></Button>
                    </div>
                     )}    

                    {currentUser && (currentUser.roles[0] === "ROLE_ADMIN" || currentUser.roles[0] === "ROLE_MODERATOR" || currentUser.roles[0] === "ROLE_USER" ) && (
                        <button style={{marginLeft: "10px"}} onClick={() =>  this.addReservation(sortedBooks.bookId)}/* {this.viewBooks} */ className="btn btn-outline-primary"> Reserve </button>
                    )}
                </div>

                </div>
              </Card>
            );
            };

        return (
        <div>
            <Navbar/>
            <Form inline> 
            <div className={"sorting"} style={{ marginLeft: "30px", marginTop: "20px" , text: "white"}}> 
            <button onClick={changeSortingHandler}>
                Sort {this.isSortingAscending ? 'Descending' : 'Ascending'} 
            </button>
            </div>
                <FormControl  type="text" placeholder="Type Book Title..." style={{marginLeft: "10px" ,  marginTop: "-20px"}} className="mr-sm-0" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                <Button size="sm" variant="outline-dark" style={{marginLeft: "0px" ,  marginTop: "-20px"}} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faSearch} /></Button>
            </Form>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Book Deleted Successfully."} type = {"danger"}/>
            </div>
            
            <h1 className="text-center"  style={{ marginTop: "-30px" ,marginBottom: "-10px", text: "white"}} > All Books </h1>
                
            {currentUser &&  (currentUser.roles[0] === "ROLE_MODERATOR" || currentUser.roles[1] === "ROLE_MODERATOR" ) && (
                <div className="row" >
                    <Button className="btn btn-info" style={{marginLeft: "50px" , marginBottom: "10px", marginTop: "0px"}} onClick={this.addBook}> <FontAwesomeIcon icon={faPlusSquare} /> Add </Button>
                </div>
            )}
                <div style={{ marginLeft: "0px", marginRight: "10px", marginTop: "-40px" ,marginBottom: "0px"}} className=" card-columns grid ">
                        {sortedBooks.length === 0 ?
                            <div style={{ "float":"right", fontStyle: "italic"}}>
                                No Available Books!
                            </div> :
                    sortedBooks.map(renderCard)}
               </div>
               <Card.Footer className="page-footer font-small blue pt-4" >
                            <div style={{ "float":"left", fontStyle: "italic"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button className={"bg-dark"} type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button className={"bg-dark"} type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                                        onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button className={"bg-dark"} type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button className={"bg-dark"} type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>       
                       </Card.Footer> 

        </div>

            );
    }
}

export default ListBook




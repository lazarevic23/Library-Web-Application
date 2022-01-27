import React from 'react';

import BookService from '../services/BookService';
import AuthorService from '../services/AuthorService';
import GenreService from '../services/GenreService';
import PublisherService from'../services/PublisherService';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';


class CreateBook extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            bookId: this.props.match.params.bookId,
            title: '',
            image:'',
            description:'',
            numberOfPages: '',
            status: '',
            quantity: '',
            genre: '',
            author: '',
            publisher: '',
            allAuthors: [],
            allGenres: [],
            allPublisher: []
        }
        this.changeBookIdHandler = this.changeBookIdHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeNumberOfPagesHandler = this.changeNumberOfPagesHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
        //this.changeGenreHandler = this.changeGenreHandler.bind(this);
        //this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        //this.changePublisherHandler = this.changePublisherHandler.bind(this);
        this.saveBook = this.saveBook.bind(this);
    }

    componentDidMount(){
        AuthorService.getAuthors().then((response)=> {
            this.setState({allAuthors: response.data})

        });
        GenreService.getGenres().then((response)=> {
            this.setState({allGenres: response.data})

        });
        PublisherService.getPublishers().then((response)=> {
            this.setState({allPublisher: response.data})

        });
    }

    saveBook = (e) => {
        e.preventDefault();
        let book = {bookId:this.state.bookId, title: this.state.title, genre: this.state.genre, author: this.state.author, publisher: this.state.publisher, quantity: this.state.quantity, numberOfPages: this.state.numberOfPages, status: this.state.status,  description: this.state.description, image: this.state.image};
        console.log('book => ' + JSON.stringify(book));
        console.log('bookId => ' + JSON.stringify(this.state.bookId));
        BookService.createBook(book).then(res =>{
            this.props.history.push('/list-book');
            alert("The book was successfully added!");
        }); 

    }

    changeAuthorHandler=(event) => {
        let a =(event.target.value);
        AuthorService.getAuthorById(a).then((response)=> {
            this.setState({author: response.data})
       })
       console.log(this.state.author)
     }

    changeGenreHandler=(event) => {
        let g =(event.target.value);
        GenreService.getGenreById(g).then((response)=> {
            this.setState({genre: response.data})
       })
       console.log(this.state.genre)
     }

    changePublisherHandler=(event) => {
        let p =(event.target.value);
        PublisherService.getPublisherById(p).then((response)=> {
            this.setState({publisher: response.data})
       })
       console.log(this.state.publisher)
     }
 
    changeBookIdHandler= (event) => {
        this.setState({bookId: event.target.value});
    }

    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeNumberOfPagesHandler= (event) => {
        this.setState({numberOfPages: event.target.value});
    }

    changeStatusHandler= (event) => {
        this.setState({status: event.target.value});
    }

    changeQuantityHandler= (event) => {
        this.setState({quantity: event.target.value});
    }

    changeImageHandler= (event) => {
        this.setState({image: event.target.value});
    }

    initialState = {
        bookId: this.props.match.params.bookId, title:'', image: '', description:'', numberOfPages:'', status:'', quantity:'', genre:'', author:'', publisher:''
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    bookList = () => {
        return this.props.history.push("/list-book");
    };

    render () {
        let optionsAuthor = this.state.allAuthors;
        let optionsGenre = this.state.allGenres;
        let optionsPublisher = this.state.allPublisher;
        return (
            <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Book Updated Successfully." : "Genre Saved Successfully."} type = {"success"}/>
            </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={ faPlusSquare} /> { "Add New Book"}
                </Card.Header>
                <Form onReset={this.resetBook} onSubmit={ this.saveBook} id="bookFormId"> 
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridBookId">
                                <Form.Label>Book ID</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="bookId"
                                    value={this.state.bookId} onChange={this.changeBookIdHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Book ID" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="title"
                                    value={this.state.title} onChange={this.changeTitleHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Book Title" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridGenre">
                            <label> Genre </label>
                            <select className="form-control" id="vrsta"  onChange={this.changeGenreHandler}>
                                {optionsGenre.map((option, index) => 
                                    <option  key = {index} value={option.genreId}  defaultValue={index === 0}> {option.name}
                                    </option>
                                    )}
                            </select>      
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridAuthor">
                          <label> Author </label>
                            <select className="form-control" id="vrsta"  onChange={this.changeAuthorHandler}>
                                {optionsAuthor.map((option, index) => 
                                    <option  key = {index} value={option.authorId}  defaultValue={index === 0}> {option.forename + " " +option.surname}
                                    </option>
                                    )}
                            </select>
                        </Form.Group>   
                            <Form.Group as={Col} controlId="formPublisher">
                            <label> Publisher </label>
                            <select className="form-control" id="vrsta"  onChange={this.changePublisherHandler}>
                                {optionsPublisher.map((option, index) => 
                                    <option  key = {index} value={option.publisherId}  defaultValue={index === 0}> {option.name}
                                    </option>
                                    )}
                            </select>              
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="quantity"
                                    value={this.state.quantity} onChange={this.changeQuantityHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Book Quantity" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridNumberOfPages">
                                <Form.Label>Number of pages</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="numberOfPages"
                                    value={this.state.numberOfPages} onChange={this.changeNumberOfPagesHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Book Number Of Pages" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" defaultValue="available" className={"bg-dark text-white"} >
                                    <option>available</option>
                                    <option>unavailable</option>
                                </Form.Control>
                            </Form.Group>
                            {/* <Form.Group as={Col} controlId="formGridStatus" >
                                <label> Status: </label>
                            <select className="form-control" id="vrsta" type="test" name="status" value={this.state.status} onChange={this.changeStatusHandler}>
                                <p>available</p>
                                <option>available</option> 
                                    <option>unavailable</option>
                            </select>

                            <Form.Control required autoComplete="off"
                                    type="test" name="status"
                                    value={this.state.status} onChange={this.changeStatusHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Status" />
                            </Form.Group> */}
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="description"
                                    value={this.state.description} onChange={this.changeDescriptionHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Book Description" />
                            </Form.Group> 
                            <Form.Group as={Col} controlId="formGridImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="image"
                                    value={this.state.image} onChange={this.changeImageHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Genre Image" />
                            </Form.Group>                        
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> {"Save"}
                        </Button>{' '}
                        <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                        </Button>{' '}
                        <Button size="sm" variant="info" type="button" onClick={this.bookList.bind()}>
                            <FontAwesomeIcon icon={faList} /> Book List
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
        );
    }
}

export default CreateBook







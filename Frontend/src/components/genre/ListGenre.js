import React, { Component } from 'react';

import GenreService from '../services/GenreService';
import AuthService from '../services/auth.service';

import {Card, InputGroup, Form, FormControl, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faPlusSquare, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import  Navbar from '../Navbar';


class ListGenre extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genres: [],
            currentPage : 1,
            booksPerPage : 6,
            search: "",
            currentUser: undefined,
        }
        this.addGenre = this.addGenre.bind(this);
        this.editGenre = this.editGenre.bind(this);
        this.deleteGenre = this.deleteGenre.bind(this);
        this.viewBooks = this.viewBooks.bind(this);
    }

    componentDidMount(){
        GenreService.getGenres().then((res) => {
            this.setState({ genres: res.data});
        });

        const user = AuthService.getCurrentUser();
        if(user) {
            this.setState({
                currentUser: user,
            })
        }
    }

    deleteGenre(genreId){
        GenreService.deleteGenre(genreId).then( res => {
            alert("The genre was successfully deleted!");
            this.setState({genres: this.state.genres.filter(genre => genre.genreId !== genreId)});
        });
    }

     viewBooks(genreId){
        this.props.history.push(`/list-genre-books/${genreId}`);
    }  

    editGenre(genreId){
        this.props.history.push(`/update-genre/${genreId}`);
    }

     addGenre(){
        this.props.history.push('/add-genre');
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
        if(this.state.currentPage < Math.ceil(this.state.genres.length / this.state.booksPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.genres.length / this.state.booksPerPage)
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.genres.length / this.state.booksPerPage)) {
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

        const {currentUser, genres, currentPage, booksPerPage} = this.state;

        let filteredBooks = genres.filter(
            (genre) => {
                return genre.name.toLowerCase().indexOf(
                    this.state.search.toLowerCase()) !== -1;
            }
          )
        
        const lastIndex = currentPage * booksPerPage;
        const firstIndex = lastIndex - booksPerPage;
        const currentBooks = filteredBooks.slice(firstIndex, lastIndex);
        const totalPages = Math.floor(genres.length / booksPerPage)+1;

        const renderCard = (genres, index) => {
            return (    
                <Card className="card border-primary bg-dark mb-3 text-center text-white" style={{"maxWidth": "25rem","marginLeft":"30px "}} key={index}  >
                  <div class="card-header bg-transparent "><h4>{genres.name}</h4></div>
                  <img className="card-img-top" src={genres.image} alt="Card image cap" style= {{"width":"250px", "height":"200px"}}/>
                <div className="card-body" >
                   <div style= {{ fontStyle: "italic"}} className="card-title">{genres.description}</div>
                   
                   
                   <div class="card-footer bg-transparent ">
                   {currentUser &&  (currentUser.roles[0] === "ROLE_MODERATOR" || currentUser.roles[1] === "ROLE_MODERATOR" ) && (
                     <div>
                        <Button size="sm" variant="outline" onClick = { () => this.editGenre(genres.genreId)}  className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Button> 
                        <Button size="sm" variant="outline-danger" onClick={ () => this.deleteGenre(genres.genreId)} ><FontAwesomeIcon icon={faTrash} /></Button>
                    </div>
                        )}
                        <button style={{marginLeft: "10px"}} onClick={() =>  this.viewBooks(genres.genreId)} className="btn btn-outline-primary"> View Books </button>                    
                    </div>
                </div>
              </Card>     
            );
            };


        return (
            <div>
            <Navbar/>
            <Form inline>
                <FormControl  type="text" placeholder="Type Genre Name..." style={{marginLeft: "35px" ,  marginTop: "20px"}} className="mr-sm-0" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                <Button size="sm" variant="outline-dark" style={{marginLeft: "0px" ,  marginTop: "20px"}} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faSearch} /></Button>
            </Form>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Genre Deleted Successfully."} type = {"danger"}/>
            </div>
            
            <h1 className="text-center"  style={{ marginTop: "0px" ,marginBottom: "-10px", text: "white"}} > All Genres </h1>
            
            {currentUser &&  (currentUser.roles[0] === "ROLE_MODERATOR" || currentUser.roles[1] === "ROLE_MODERATOR" ) && (
                <div className="row" >
                    <Button className="btn btn-info" style={{marginLeft: "50px" , marginBottom: "10px", marginTop: "0px"}} onClick={this.addGenre}> <FontAwesomeIcon icon={faPlusSquare} /> Add </Button>
                </div>
            )}
                <div style={{ marginLeft: "0px", marginRight: "10px", marginTop: "-40px" ,marginBottom: "0px"}} className=" card-columns grid ">
                        {currentBooks.length === 0 ?
                            <div style={{ "float":"right", fontStyle: "italic"}}>
                                No Available Genres!
                            </div> :
                    currentBooks.map(renderCard)}
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

export default ListGenre




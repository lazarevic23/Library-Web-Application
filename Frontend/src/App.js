import  {React, Component} from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import ListBook from './components/book/ListBook';
import CreateBook from './components/book/CreateBook';
import UpdateBook from './components/book/UpdateBook';

import ListGenre from './components/genre/ListGenre';
import ListGenreBooks from './components/genre/ListGenreBooks';
import CreateGenre from './components/genre/CreateGenre';
import UpdateGenre from './components/genre/UpdateGenre';

import ListAuthor from './components/author/ListAuthor';
import UpdateAuthor from  './components/author/UpdateAuthor';
import CreateAuthor from  './components/author/CreateAuthor';

import ListPublisher from './components/publisher/ListPublisher';
import UpdatePublisher from './components/publisher/UpdatePublisher';
import CreatePublisher from './components/publisher/CreatePublisher';

import AllReservations from './components/reservation/AllReservations';
import CreateReservation from './components/reservation/CreateReservation';
import AllUsers from './components/reservation/AllUsers';
import UserReservations from './components/reservation/UserReservations';

import AuthService from './components/services/auth.service';
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Main from './components/landing/Main';


  class App extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
      this.state = {
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
      };
    }
  
    componentDidMount() {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        this.setState({
          currentUser: user,
          showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
          showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        });
      }
    }
  
    logOut() {
      AuthService.logout();
    }
  
    render() {
      const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
      const marginTop = {
        marginTop:"20px"
      };

  return (
    <Router>
                    <Switch>
                        <Route path="/list-book" exact component={ListBook}/>      
                        <Route path="/add-book" exact component={CreateBook}/> 
                        <Route path="/update-book" exact component={UpdateBook}/>
                        <Route path="/update-book/:bookId" exact component={UpdateBook}/>
                        
                        <Route path="/list-genre" component = {ListGenre}/>
                        <Route path="/list-genre-books/:genreId" component = {ListGenreBooks}/>
                        <Route path="/add-genre" exact component={CreateGenre}/> 
                        <Route path="/update-genre" exact component={UpdateGenre}/> 
                        <Route path="/update-genre/:genreId" exact component={UpdateGenre}/>

                        <Route path="/list-author" component = {ListAuthor}/>
                        <Route path="/add-author" exact component={CreateAuthor}/> 
                        <Route path="/update-author" exact component={UpdateAuthor}/> 
                        <Route path="/update-author/:authorId" exact component={UpdateAuthor}/> 

                        <Route path="/list-publisher" component = {ListPublisher}/>
                        <Route path="/add-publisher" exact component={CreatePublisher}/>
                        <Route path="/update-publisher" exact component={UpdatePublisher}/> 
                        <Route path="/update-publisher/:publisherId" exact component={UpdatePublisher}/> 
                      
                        <Route path="/all-reservations" exact component={AllReservations}/> 
                        <Route path="/reserve-book/:bookId" exact component={CreateReservation}/>  
                        <Route path="/all-users" exact component={AllUsers}/>   
                        <Route path="/list-userReservations/:id" exact component={UserReservations}/>                              

                        <Route exact path={["/", "/home"]}component={Main} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />           
                    </Switch>
    </Router>
  );
}
  }
 
export default App;

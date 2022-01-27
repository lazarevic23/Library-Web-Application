import React from 'react';
import {useHistory} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AuthService from "./services/auth.service";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import {Navbar, Nav} from 'react-bootstrap';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    color: "#fff",
    fontSize: "2.3rem",
    marginRight: theme.spacing(2),
  }
}));

  export default function ButtonAppBar() {
    const classes = useStyles();
    const history = useHistory();
    const currentUser = AuthService.getCurrentUser();

    const logoutHandler = () => {
      AuthService.logout();
      history.push("/login")
     }

  return (
    <Navbar bg="dark" variant="dark" >
      <Nav className={classes.root}> 
          <Typography variant="h6" className={classes.title} >
           < LocalLibraryRoundedIcon className={classes.icon} onClick={() => history.push('/')}/> 
          </Typography>  
          {currentUser &&  (currentUser.roles[0] === "ROLE_MODERATOR" || currentUser.roles[1] === "ROLE_MODERATOR" ) && (  
            <h4 style={{marginRight :"10px"}} className="text-white" onClick={() => history.push('/all-users')}> Users </h4>
           /*<GroupIcon className={classes.icon} onClick={() => history.push('/all-users')}/> */
            )}  
          {currentUser &&  (currentUser.roles[0] === "ROLE_MODERATOR" || currentUser.roles[1] === "ROLE_MODERATOR" ) && (  
           <h4 style={{marginRight :"10px"}} className="text-white" onClick={() => history.push('/list-author')}> Authors </h4>
            )} 
            {currentUser &&  (currentUser.roles[0] === "ROLE_MODERATOR" || currentUser.roles[1] === "ROLE_MODERATOR" ) && (  
           <h4 style={{marginRight :"10px"}} className="text-white" onClick={() => history.push('/list-publisher')}>Publishers</h4>
            )} 
          {currentUser &&  (currentUser.roles[0] === "ROLE_MODERATOR" || currentUser.roles[1] === "ROLE_MODERATOR" ) && (  
           <h4 style={{marginRight :"10px"}} className="text-white" onClick={() => history.push('/all-reservations')}>Reservations</h4>
           )}  
          {<h4 className="text-white">Genres</h4>}
           < LibraryBooksRoundedIcon className={classes.icon} onClick={() => history.push('/list-genre')}/> 
           {<h4 className="text-white">Books</h4>}
           < MenuBookRoundedIcon edge="start" className={classes.icon} onClick={() => history.push('/list-book')}/> 
           
           {currentUser ? (
             <div>
           < AccountCircleOutlinedIcon edge="start" className={classes.icon}  onClick={() => history.push('/profile')}/> 
           < ExitToAppOutlinedIcon edge="start" className={classes.icon}  onClick={logoutHandler}/> 
           </div>
           ) : (
           <  PermIdentityIcon edge="start" className={classes.icon}  onClick={() => history.push('/login')}/> 
           )}
    </Nav>
    </Navbar>
  );
}
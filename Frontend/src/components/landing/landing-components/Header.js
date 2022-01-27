import React from "react";
import { Link } from "react-scroll";
import { useHistory } from "react-router-dom";

import AuthService from '../../services/auth.service';

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import LocalLibraryRoundedIcon from '@material-ui/icons/LocalLibraryRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import GroupIcon from '@material-ui/icons/Group';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "none",
    fontFamily: "Pattaya",
  },
  icon: {
    color: "#fff",
    fontSize: "2.5rem",
  },
  appbarTitle: {
    flexGrow: "1",
  },
  appbarWrapper: {
    width: "80%",
    margin: "0 auto",
  },
  colorText: {
    color: "#b3b3ff",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Pattaya",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "Pattaya",
    fontSize: "4rem",
  },
  subtitle: {
    color: "#fff",
    fontFamily: "Pattaya",
    fontSize: "2rem",
  },
  container: {
    textAlign: "center",
  },
  goDownIcon: {
    color: "#fff",
    fontSize: "4rem",
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = AuthService.getCurrentUser();

  const logOut = () => {
    AuthService.logout();
    history.push("/login")
  }

  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
        {
            <IconButton onClick={() => history.push('/')} >
              <LocalLibraryRoundedIcon className={classes.icon} />
            </IconButton>
          }
        
          <h1 className={classes.appbarTitle}>
            Library <span className={classes.colorText}></span>
          </h1>

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
           < LibraryBooksRoundedIcon style={{marginRight :"10px"}} className={classes.icon} onClick={() => history.push('/list-genre')}/> 
           {<h4 className="text-white">Books</h4>}
           < MenuBookRoundedIcon style={{marginRight :"10px"}} edge="start" className={classes.icon} onClick={() => history.push('/list-book')}/> 
           
           {currentUser ? (
             <div>
           < AccountCircleOutlinedIcon edge="start" className={classes.icon}  onClick={() => history.push('/profile')}/> 
           < ExitToAppOutlinedIcon style={{marginRight :"10px"}} edge="start" className={classes.icon}  onClick={logOut}/> 
           </div>
           ) : (
           <  PermIdentityIcon style={{marginRight :"10px"}} edge="start" className={classes.icon}  onClick={() => history.push('/login')}/> 
           )}
        </Toolbar>
      </AppBar>
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome!
          </h1>
          <h2  className={classes.subtitle} >
          "Good friends, good books, and a sleepy conscience: this is the ideal life."
          </h2>
          <h2  className={classes.subtitle} >
          -Mark Twain
          </h2>
          <Link to="content" smooth={true}>
            <IconButton>
              <ArrowDropDownIcon className={classes.goDownIcon} />
            </IconButton>
          </Link>
        </div>
    </div>
  );
}

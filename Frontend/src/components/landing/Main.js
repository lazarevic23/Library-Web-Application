
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Header from './landing-components/Header'
import ContentCard from './landing-components/ContentCard';
import UserService from '../../components/services/user.service';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + 'https://images.unsplash.com/photo-1568667256549-094345857637?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGlicmFyeSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }
}));

const Main = () => {
  const [content, setContent] = useState("");
  const classes = useStyles();

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className = {classes.root}>
    <CssBaseline/>
    <Header/>
    <ContentCard/>
    </div>
  );
};

export default Main;
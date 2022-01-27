import React from 'react';

import GenreService from '../services/GenreService';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';


class CreateGenre extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            genreId: this.props.match.params.genreId,
            name: '',
            description: '',
            image: ''
        }
        this.changeGenreIdHandler = this.changeGenreIdHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeImageHandler = this.changeImageHandler.bind(this);
        this.saveGenre = this.saveGenre.bind(this);
    }

    saveGenre = (e) => {
        e.preventDefault();
        let genre = {genreId:this.state.genreId, name: this.state.name, description: this.state.description, image: this.state.image};
        console.log('genre => ' + JSON.stringify(genre));
        console.log('genreId => ' + JSON.stringify(this.state.genreId));
        GenreService.createGenre(genre).then(res =>{
            if(res.data != null) {
                this.setState({"show":true});
                //this.setState({"show":true, "method":"post"});
                console.log('uspesno');
                //setTimeout(() => this.setState({"show":false}), 5000);
            } else {
                this.setState({"show":false});
            }
            this.props.history.push('/list-genre');
            alert("The genre was successfully added!");
        });
        
    }

    changeGenreIdHandler= (event) => {
        this.setState({genreId: event.target.value});
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeImageHandler= (event) => {
        this.setState({image: event.target.value});
    }

    initialState = {
        genreId: this.props.match.params.genreId, name:'', description:'', image:''
    };

    resetGenre = () => {
        this.setState(() => this.initialState);
    };

    genreList = () => {
        return this.props.history.push("/list-genre");
    };

    render () {
        return (
            <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Genre Saved Successfully."} type = {"success"}/>
            </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faPlusSquare} /> { "Add New Genre"}
                </Card.Header>
                <Form onReset={this.resetGenre} onSubmit={ this.saveGenre} id="genreFormId"> 
                    <Card.Body>
                    <Form.Row>
                            <Form.Group as={Col} controlId="formGridGenreId">
                                <Form.Label>Genre ID</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="genreId"
                                    value={this.state.genreId} onChange={this.changeGenreIdHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Genre ID" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="name"
                                    value={this.state.name} onChange={this.changeNameHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Genre Name" />
                            </Form.Group>
                        </Form.Row> 
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="description"
                                    value={this.state.description} onChange={this.changeDescriptionHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Genre Description" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
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
                        <Button size="sm" variant="info" type="button" onClick={this.genreList.bind()}>
                            <FontAwesomeIcon icon={faList} /> Genre List
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
        );
    }
}

export default CreateGenre




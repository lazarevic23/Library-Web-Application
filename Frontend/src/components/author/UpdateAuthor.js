import React from 'react';

import AuthorService from '../services/AuthorService';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';


class UpdateAuthor extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            authorId: this.props.match.params.authorId,
            forename: '',
            surname: '',
            dateOfBirth: ''
        }
        this.changeAuthorIdHandler = this.changeAuthorIdHandler.bind(this);
        this.changeForenameHandler = this.changeForenameHandler.bind(this);
        this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
        this.changeDateOfBirthHandler = this.changeDateOfBirthHandler.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
    }

    componentDidMount(){
        AuthorService.getAuthorById(this.state.authorId).then( (res) =>{
            let author = res.data;
            this.setState({
                authorId: author.authorId,
                forename: author.forename,
                surname : author.surname,
                dateOfBirth: author.dateOfBirth
                });
            });
    }
    
    updateAuthor = (e) => {
        e.preventDefault();
        let author = {authorId:this.state.authorId, forename: this.state.forename, surname: this.state.surname, dateOfBirth: this.state.dateOfBirth};
        console.log('author => ' + JSON.stringify(author));
        console.log('authorId => ' + JSON.stringify(this.state.authorId));
        AuthorService.updateAuthor(author).then( res => {
            this.props.history.push('/list-author');
            alert("The author was successfully updated!");
        });
    } 
    
    changeAuthorIdHandler= (event) => {
        this.setState({authorId: event.target.value});
    }

    changeForenameHandler= (event) => {
        this.setState({forename: event.target.value});
    }

    changeSurnameHandler= (event) => {
        this.setState({surname: event.target.value});
    }

    changeDateOfBirthHandler= (event) => {
        this.setState({dateOfBirth: event.target.value});
    }

    initialState = {
        authorId: this.props.match.params.authorId, forename:'', surname:'', dateOfBirth:''
    };

    resetAuthor = () => {
        this.setState(() => this.initialState);
    };

    authorList = () => {
        return this.props.history.push("/list-author");
    };

    render () {
        return (
            <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Author Updated Successfully." : "Author Saved Successfully."} type = {"success"}/>
            </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faEdit} /> {"Update Author"}
                </Card.Header>
                <Form onReset={this.resetAuthor} onSubmit={this.updateAuthor} id="authorFormId"> 
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridForename">
                                <Form.Label>Forename</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="forename"
                                    value={this.state.forename} onChange={this.changeForenameHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Author Forename" />
                            </Form.Group>
                        </Form.Row> 
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridSurname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="surname"
                                    value={this.state.surname} onChange={this.changeSurnameHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Author Surname" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridDateOfBirth">
                                <Form.Label> Date Of Birth</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="dateOfBirth"
                                    value={this.state.dateOfBirth} onChange={this.changeDateOfBirthHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Author Date Of Birth" />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> {"Update"}
                        </Button>{' '}
                        <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                        </Button>{' '}
                        <Button size="sm" variant="info" type="button" onClick={this.authorList.bind()}>
                            <FontAwesomeIcon icon={faList} /> Author List
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
        );
    }
}

export default UpdateAuthor




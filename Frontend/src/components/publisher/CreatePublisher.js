import React from 'react';

import PublisherService from '../services/PublisherService';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faUndo, faList, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';


class CreatePublisher extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            publisherId: this.props.match.params.publisherId,
            name: '',
            pib: '',
            address: '',
            city: '',
            country: '',
            contact: ''
        }
        this.changePublisherIdHandler = this.changePublisherIdHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePIBHandler = this.changePIBHandler.bind(this); 
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeCountryHandler = this.changeCountryHandler.bind(this);
        this.changeContactHandler = this.changeContactHandler.bind(this);
        this.savePublisher = this.savePublisher.bind(this);
    }

    savePublisher = (e) => {
        e.preventDefault();
        let publisher = {publisherId:this.state.publisherId, name: this.state.name, pib: this.state.pib, address: this.state.address, city: this.state.city, country: this.state.country, contact: this.state.contact};
        console.log('publisher => ' + JSON.stringify(publisher));
        console.log('publisherId => ' + JSON.stringify(this.state.publisherId));
        PublisherService.createPublisher(publisher).then( res => {
            this.props.history.push('/list-publisher');
            alert("The publisher was successfully added!");
        });
    } 
    
    changePublisherIdHandler= (event) => {
        this.setState({publisherId: event.target.value});
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changePIBHandler= (event) => {
        this.setState({pib: event.target.value});
    }

    changeAddressHandler= (event) => {
        this.setState({address: event.target.value});
    }

    changeCityHandler= (event) => {
        this.setState({city: event.target.value});
    }

    changeCountryHandler= (event) => {
        this.setState({country: event.target.value});
    }

    changeContactHandler= (event) => {
        this.setState({contact: event.target.value});
    }

    initialState = {
        publisherId: this.props.match.params.publisherId, name: '', pib: '', address: '',  city: '', country: '', contact: ''};

    resetPublisher = () => {
        this.setState(() => this.initialState);
    };

    publisherList = () => {
        return this.props.history.push("/list-publisher");
    };

    render () {
        return (
            <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Publisher Saved Successfully."} type = {"success"}/>
            </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faPlusSquare} /> { "Add New Publisher"}
                </Card.Header>
                <Form onReset={this.resetPublisher} onSubmit={ this.savePublisher} id="publisherFormId"> 
                    <Card.Body>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridPublisherId">
                                <Form.Label>Publisher ID</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="publisherId"
                                    value={this.state.publisherId} onChange={this.changePublisherIdHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Publisher ID" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="name"
                                    value={this.state.name} onChange={this.changeNameHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Publisher Name" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPIB">
                                <Form.Label>PIB</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="pib"
                                    value={this.state.pib} onChange={this.changePIBHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Publisher PIB" />
                            </Form.Group>
                        </Form.Row> 
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="address"
                                    value={this.state.address} onChange={this.changeAddressHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Publisher Address" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="city"
                                    value={this.state.city} onChange={this.changeCityHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Publisher City" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCountry">
                                <Form.Label> Country</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="country"
                                    value={this.state.country} onChange={this.changeCountryHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Publisher Country" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridContact">
                                <Form.Label>Contact</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="test" name="contact"
                                    value={this.state.contact} onChange={this.changeContactHandler}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Publisher Contact" />
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
                        <Button size="sm" variant="info" type="button" onClick={this.publisherList.bind()}>
                            <FontAwesomeIcon icon={faList} /> Publisher List
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
        );
    }
}

export default CreatePublisher




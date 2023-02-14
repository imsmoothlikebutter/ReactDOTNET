import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

export default class NavBar extends Component{
  render() {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/">Clean Bright Company</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/manufacturer">Manufacturer</Nav.Link>
                <Nav.Link as={Link} to="/restock">Restock Request</Nav.Link>
                <Nav.Link as={Link} to="/shippingagent">Shipping Agent</Nav.Link>
                <Nav.Link as={Link} to="/customerrequests">Refund/Exchanges</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
  }
}

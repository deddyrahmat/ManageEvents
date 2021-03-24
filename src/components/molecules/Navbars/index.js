import React, { Fragment } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import {
    useLocation,
    Link
} from "react-router-dom";

import './Navbars.css';

const Navbars = () => {
    let location = useLocation();

    return (
        <Fragment>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to={'/'}>ManageEvent</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <Nav.Link as={Link} to={'/'} className={location.pathname == '/' ? "nav-active" : null}>Home</Nav.Link>
                        <Nav.Link as={Link} to={'/add-event'} className={location.pathname == '/add-event' ? "nav-active" : null}>Add Event</Nav.Link>
                        <Nav.Link as={Link} to={'/list-event'} className={location.pathname == '/list-event' ? "nav-active" : null} >Dashboard</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Navbars

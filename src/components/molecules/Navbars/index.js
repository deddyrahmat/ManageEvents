import React, { Fragment } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import {
    useRouteMatch,
    useHistory,
    Link
} from "react-router-dom";


const Navbars = () => {
    return (
        <Fragment>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to={'/'}>FrontEnd</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <Nav.Link as={Link} to={'/'}>Home</Nav.Link>
                        <Nav.Link as={Link} to={'/add-event'}>Add Event</Nav.Link>
                        <Nav.Link as={Link} to={'/list-event'}>Dashboard</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default Navbars

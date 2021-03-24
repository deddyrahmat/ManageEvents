import React, { Fragment, useState,useEffect } from 'react';
import { Breadcrumb, Col, Container, Row, Table, Form } from 'react-bootstrap';
import Moment from 'react-moment';

// config
import {API} from '../../../configs';
import { Loading } from '../../atoms';

const ListEvent = () => {

    const [events, setEvents] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const loadEvents = async () => {
        try {
            const response = await API('/events');

            if (response.status == 200) {
                setEvents(response.data.data.event);
                setIsLoading(false)
            }
        } catch (err) {
            console.log("Your System : ",err);
        }
    }

    useEffect(() => {
        loadEvents();
    }, [])
    
    // =============================================================
    // fitur search all Event
    // =============================================================
    const [filteredEvent, setFilterEvent] = useState([]);
    const [keyword, setKeyword] = useState('');

    const handleSearch = (e) => {
        setKeyword(e.target.value)
    }

    useEffect(() => {
        setFilterEvent(
        events.filter((event) =>
            event.title.toLowerCase().includes(keyword.toLowerCase()) 
            || event.location.toLowerCase().includes(keyword.toLowerCase()) 
            || event.dateEvent.toLowerCase().includes(keyword.toLowerCase()) 
            || event.participant.toLowerCase().includes(keyword.toLowerCase()) 
        )
        );
    }, [keyword, events]);
    // =============================================================
    // fitur search all Event
    // =============================================================

    const [currentPage, setCurrentPage] = useState(1);
    const [eventPerPage, setEventPerPage] = useState(5);

    const indexOfLastEvent = currentPage * eventPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventPerPage;

    useEffect(() => {
        setFilterEvent(events.slice(indexOfFirstEvent, indexOfLastEvent))        
    }, [indexOfFirstEvent, indexOfLastEvent,events])

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(events.length / eventPerPage); i++) {
        pageNumbers.push(i);
    }

    // console.log("curee",currentEvent)

    return isLoading ? (<Loading />) : (
        <Fragment>
            <Container className="mt-3 mb-5">
                <Breadcrumb>
                    <Breadcrumb.Item active>Dashboard Event</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md="3">
                        <Form.Group controlId="participant">
                            <Form.Control type="text" onChange={handleSearch} name="search" placeholder="Search ..." />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md='12'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Participant</th>
                                <th>Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredEvent.length > 0 ? (
                                        filteredEvent.map(event => (
                                            <tr key={event.id}>
                                                <td>{event.title}</td>
                                                <td>{event.location}</td>
                                                <td><Moment format='DD MMM YYYY'>{event.dateEvent}</Moment></td>
                                                <td>{event.participant}</td>
                                                <td>{event.note}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-danger text-center font-weight-bold">Data Not Found</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <nav>
                            <ul>
                                {pageNumbers.map((number) => (
                                <li key={number} onClick={() => paginate(number)} >
                                    {number}
                                </li>
                                ))}
                            </ul>
                            </nav>
                    </Col>
                </Row>
            </Container>
            
        </Fragment>
    )
}

export default ListEvent

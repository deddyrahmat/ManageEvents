import React, { Fragment, useState,useEffect } from 'react';
import { Breadcrumb, Col, Container, Row, Table } from 'react-bootstrap';
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

    let no = 1;

    return isLoading ? (<Loading />) : (
        <Fragment>
            <Container className="mt-3 mb-5">
                <Breadcrumb>
                    <Breadcrumb.Item active>Dashboard Event</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md='12'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Participant</th>
                                <th>Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    events.length > 0 ? (
                                        events.map(event => (
                                            <tr key={event.id}>
                                                <td>{no++}</td>
                                                <td>{event.title}</td>
                                                <td>{event.location}</td>
                                                <td><Moment format='DD MMM YYYY'>{event.dateEvent}</Moment></td>
                                                <td>{event.participant}</td>
                                                <td>{event.note}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-danger">Data Not Found</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            
        </Fragment>
    )
}

export default ListEvent

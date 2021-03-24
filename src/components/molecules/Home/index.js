import React, { Fragment, useState,useEffect } from 'react';
import { Breadcrumb, Card, Col, Container, Row } from 'react-bootstrap';
import Moment from 'react-moment';

// styling
import './Home.css';


// config
import {API, PICTURE} from '../../../configs';
import { Loading } from '../../atoms';
import userEvent from '@testing-library/user-event';

const Home = () => {
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
    }, []);


    return isLoading ? (<Loading />) : (
        <Fragment>
            <Container className="mt-3 mb-5">
                <Breadcrumb>
                    <Breadcrumb.Item active>Home</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    {
                        events.length > 0 ? (
                            events.map(event => (
                                <Col md='4' key={event.id} className="mb-3" >
                                    <Card className="border-card">
                                        <Card.Img variant="top" src={PICTURE+event.picture} />
                                        <Card.Body>
                                            <Card.Text className="d-flex justifi-content-center align-items-center">
                                                <img src={'/assets/location.png'} alt="avatra" className="location" />
                                                <span className="font-weight-bold text-uppercase">{event.location}</span>
                                            </Card.Text>   
                                            <Card.Title>{event.title}</Card.Title>
                                            <Card.Text>
                                                <Moment format='DD MMM YYYY'>{event.dateEvent}</Moment>
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Body className="border-top d-flex">
                                            {
                                                event.participant.split(',').map((user,index) => (
                                                    <div key={index} className="mr-1">
                                                        <img src={'/assets/avatar.jpg'} alt="avatar" className="avatar" />
                                                        <span className="name-praticipant">{user}</span>
                                                    </div>
                                                ))
                                            }
                                        </Card.Body>
                                        <Card.Footer>
                                            <span className="font-weight-bold">Note :</span>
                                            <p>{event.note}</p>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))
                        ): (<h3>Data Not Found</h3>)
                        
                    }
                    
                </Row>
            </Container>
        </Fragment>
    )
}

export default Home

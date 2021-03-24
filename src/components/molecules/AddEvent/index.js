import React, { Fragment, useState } from 'react'
import { Breadcrumb, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import {
    useHistory,
} from "react-router-dom";

// config
import {API} from '../../../configs';
import { Loading } from '../../atoms';

const AddEvent = () => {

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [picture, setPicture] = useState({ preview: "", raw: "" });

    const [event, setEvent] = useState({
        title : "",
        location : "",
        participant : "",
        dateEvent : "",
        note : ""
    });

    // state modal image
    const [imageModal, setImageModal] = useState(false);
    const handleCloseImage = () => setImageModal(false);
    const handleShowModalImage = () => setImageModal(true);
    // state modal image

    const handleChangeEvent = (e) => {
        setEvent({...event,  [e.target.name] : e.target.value})
    }

    const handlePictureEvent = (e) => {
        if (e.target.files.length) {
            setPicture({
                preview : URL.createObjectURL(e.target.files[0]),
                raw : e.target.files[0]
            })
        }

        console.log("pic", picture);
        console.log(" e.target.files image",  e.target.files[0].type);
    }

    const { 
        title,
        location,
        participant,
        dateEvent,
        note
    } = event;

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {

            setIsLoading(true);

            const body = new FormData();

            body.append("title", title);
            body.append("location", location);
            body.append("participant", participant);
            body.append("dateEvent", dateEvent);
            body.append("note", note);

            if (picture.raw) {
                body.append("picture", picture.raw);
            }else{
                return console.log("upload failed");
            }

            console.log("body event", body);

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };

            const response = await API.post('/event', body, config);

            console.log("response event ", response);
            if (response.status == 200) {
                setIsLoading(false);
                history.push('/list-event')
            }

        } catch (err) {
            console.log("Your System ", err);
        }
    }

    console.log("event",event);

    return (
        <Fragment>
            <Container className="mt-3 mb-5">
                <Breadcrumb>
                    <Breadcrumb.Item active>Add Event</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md="12">
                        <Form onSubmit={handleOnSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" onChange={handleChangeEvent} name="title" placeholder="Enter Title" />
                            </Form.Group>

                            <Form.Group controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" onChange={handleChangeEvent} name="location" placeholder="Enter Location" />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Participant</Form.Label>
                                <Form.Control as="select" onChange={handleChangeEvent} name="participant">
                                <option>Choose Participant</option>
                                <option value="Nanda">Nanda</option>
                                <option value="Budi">Budi</option>
                                <option value="Ari">Ari</option>
                                <option value="Dinda">Dinda</option>
                                <option value="Aska">Aska</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" onChange={handleChangeEvent} name="dateEvent" placeholder="Enter Date" />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Note</Form.Label>
                                <Form.Control as="textarea" onChange={handleChangeEvent} name="note" rows={3} />
                            </Form.Group>

                            <Form>
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" onChange={handlePictureEvent} name="picture" label="Upload Picture" />
                                </Form.Group>

                                {
                                    picture.preview && (
                                        <img src={picture.preview} alt="Book" width="50px" height="50px" className="text-center ml-3 mt-2" style={{cursor:"pointer"}} onClick={handleShowModalImage} onChange={handlePictureEvent}></img>
                                    )
                                }
                            </Form>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            </Form>
                    </Col>
                </Row>
            </Container>

            <Modal size="lg" show={imageModal} onHide={handleCloseImage} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <img src={picture.preview} alt="attach file" className="text-center img-fluid" />
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default AddEvent

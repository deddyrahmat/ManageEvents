import React, { Fragment, useState } from 'react';
import { Breadcrumb, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import {
    Redirect,
} from "react-router-dom";

import { useFormik } from 'formik';
import * as Yup from "yup";

// config
import {API} from '../../../configs';
// import { Loading } from '../../atoms';

const AddEvent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [picture, setPicture] = useState({ preview: "", raw: "" });

    const [event, setEvent] = useState({
        title : "",
        location : "",
        participant : "",
        dateEvent : "",
        note : ""
    });

    // modal Event Success
    const [modalEvent, setModalEvent] = useState(false);    
    const handleCloseModalEvent = () => setModalEvent(false);
    const handleShowModalEvent = () => setModalEvent(true);
    // modal Event Success

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

    // const handleOnSubmit = async (e) => {
    //     e.preventDefault();

    //     try {

    //         setIsLoading(true);

    //         const body = new FormData();

    //         body.append("title", title);
    //         body.append("location", location);
    //         body.append("participant", participant);
    //         body.append("dateEvent", dateEvent);
    //         body.append("note", note);

    //         if (picture.raw) {
    //             body.append("picture", picture.raw);
    //         }else{
    //             return console.log("upload failed");
    //         }

    //         console.log("body event", body);

    //         const config = {
    //             headers: {
    //                 "content-type": "multipart/form-data",
    //             },
    //         };

    //         const response = await API.post('/event', body, config);

    //         console.log("response event ", response);
    //         if (response.status == 200) {
    //             setIsLoading(false);
    //             handleShowModalEvent();
    //         }

    //     } catch (err) {
    //         console.log("Your System ", err);
    //     }
    // }

    const formik = useFormik({
        initialValues: {
        title: "",
        location: "",
        participant: "",
        dateEvent: "",
        note: "",
        },
        
        validationSchema: Yup.object({
        title: Yup.string()
            .min(2, "Mininum 2 characters")
            // .max(15, "Maximum 15 characters")
            .required("Required!"),
        location: Yup.string()
            .min(2, "Mininum 2 characters")
            // .max(15, "Maximum 15 characters")
            .required("Required!"),
        participant: Yup.string()
            .min(2, "Mininum 2 characters")
            // .max(15, "Maximum 15 characters")
            .required("Required!"),
        dateEvent: Yup.date()
            .required("Required!"),
        note: Yup.string()
            .min(2, "Mininum 2 characters")
            .required("Required!"),
        }),
        onSubmit: async (values) => {

        console.log("coba title",values.title)
        console.log("data values", values)

            try {

                setIsLoading(true);

                const body = new FormData();

                body.append("title", values.title);
                body.append("location", values.location);
                body.append("participant", values.participant);
                body.append("dateEvent", values.dateEvent);
                body.append("note", values.note);

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
                    handleShowModalEvent();
                }

            } catch (err) {
                console.log("Your System ", err);
            }

        }
    });

    console.log("event",event);

    return (
        <Fragment>
            <Container className="mt-3 mb-5">
                <Breadcrumb>
                    <Breadcrumb.Item active>Add Event</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md="12">
                        {/* <Form onSubmit={handleOnSubmit}> */}
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={formik.values.title} onChange={formik.handleChange} name="title" placeholder="Enter Title" />

                                {formik.errors.title && formik.touched.title && (
                                    <p className="text-danger">{formik.errors.title}</p>
                                )}
                            </Form.Group>

                            <Form.Group controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" value={formik.values.location} onChange={formik.handleChange} name="location" placeholder="Enter Location" />
                                {formik.errors.location && formik.touched.location && (
                                    <p className="text-danger">{formik.errors.location}</p>
                                )}
                            </Form.Group>
                            
                            <Form.Group controlId="participant">
                                <Form.Label>Participant</Form.Label>
                                <Form.Control type="text" value={formik.values.participant} onChange={formik.handleChange} name="participant" placeholder="Enter participant" />
                                {formik.errors.participant && formik.touched.participant && (
                                    <p className="text-danger">{formik.errors.participant}</p>
                                )}
                            </Form.Group>

                            {/* <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Participant</Form.Label>
                                <Form.Control as="select" onChange={handleChangeEvent} name="participant">
                                <option>Choose Participant</option>
                                <option value="Nanda">Nanda</option>
                                <option value="Budi">Budi</option>
                                <option value="Ari">Ari</option>
                                <option value="Dinda">Dinda</option>
                                <option value="Aska">Aska</option>
                                </Form.Control>

                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group> */}

                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" value={formik.values.dateEvent} onChange={formik.handleChange} name="dateEvent" placeholder="Enter Date" />

                                {formik.errors.dateEvent && formik.touched.dateEvent && (
                                    <p className="text-danger">{formik.errors.dateEvent}</p>
                                )}
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Note</Form.Label>
                                <Form.Control as="textarea" value={formik.values.note} onChange={formik.handleChange} name="note" rows={3} />

                                {formik.errors.note && formik.touched.note && (
                                    <p className="text-danger">{formik.errors.note}</p>
                                )}
                            </Form.Group>

                            <Form>
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" onChange={handlePictureEvent} name="picture" label="Upload Picture" />
                                    <Form.Text className="text-muted">
                                        Max File Size 1 MB
                                    </Form.Text>
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


            <Modal size="lg" show={modalEvent} onHide={handleCloseModalEvent} className="d-flex justify-content-center align-items-center w-100">
                <Modal.Body >
                    <p style={{color:"#469F74", fontSize:"24px", fontWeight:"normal", margin:"auto", textAlign:"center"}}>Event Success Created</p>
                </Modal.Body>
                {
                    modalEvent == false ? (
                    <Redirect to='/list-event' />
                    ) : null
                }
            </Modal>

            
        </Fragment>
    )
}

export default AddEvent

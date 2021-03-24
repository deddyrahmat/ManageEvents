import React from 'react'
import { Container } from 'react-bootstrap';

import './Loading.css';

const Loading = (props) => {
    return (
        <Container className="d-flex justify-content-center align-items-center">
            <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Container>
    )
}

export default Loading

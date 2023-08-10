import React from 'react';
// import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <div className='bg-secondary mt-auto'>
            <Container className='p-3'>
                <p className='text-center text-white'>
                    Our courteous and efficient staff are on call 24-hours a day to serve ALL your supernatural elimination needs.
                </p>
                <Row>
                    <Col className='text-center'>
                        <p>Phone: (216)-BG5-2368</p>
                    </Col>
                    <Col className='text-center'>
                        <p>Fax: (216)-BG5-2368</p>
                    </Col>
                    <Col className='text-center'>
                        <p>Pager: 216242368</p>
                    </Col>
                    <Col className='text-center'>
                        <p>14 North Moore street
                        New York, New York, 10013
                        United States
                        </p>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default Footer;
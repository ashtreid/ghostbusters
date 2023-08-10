import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import AuthModals from '../AuthModals';
import Auth from '../../utils/auth';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Ghostbusters
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            {Auth.loggedIn() ? (
              <Nav className='ml-auto d-flex'>
                <Nav.Link as={Link} to='/paranormal'>
                  Ghost Sightings
                </Nav.Link>
                <Button variant='danger' onClick={logout}>Logout</Button>
              </Nav>
            ) : (
              <Nav className='ml-auto d-flex'>
                <Nav.Link as={Link} to='/paranormal'>
                  Ghost Sightings
                </Nav.Link>
                <Button onClick={() => setShowModal(true)}>Login/Sign Up</Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* set modal data up */}
      <AuthModals showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Header;
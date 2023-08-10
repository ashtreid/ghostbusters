import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import AuthModals from '../AuthModals';
import OffCanvas from '../OffCanvas';
import Auth from '../../utils/auth';
import bustin from '../../customIcons/bustin.png';

const Header = () => {
  const [showMyPins, setShowMyPins] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const isParanormalPage = location.pathname === '/paranormal';
  const [showPinBtn, setShowPinBtn] = useState(isParanormalPage);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  useEffect(() => {
    setShowPinBtn(isParanormalPage);
  }, [isParanormalPage]);

  const { loading, error, data } = useQuery(QUERY_ME);
  if (loading) return <p>Loading...</p>;
  if (error) return null;
  const user = data.me;

  return (
    <>
      <Navbar bg='dark' variant='dark' collapseOnSelect expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/' className="glow-text">
            GH<img
              src={bustin}
              alt="Logo"
              className="bustinLogo"
            />STBUSTERS
          </Navbar.Brand>

          <Navbar className='user-greeting ml-auto d-flex'>
              <p>We're ready to believe you, {user.username}!</p>
            </Navbar>

          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav' className='d-flex flex-row-reverse'>
            {Auth.loggedIn() ? (
              <Nav className='nav-header-link ml-auto d-flex'>
                <Nav.Link as={Link} onClick={() => setShowPinBtn(true)} to='/paranormal'>
                  Ghost Sightings
                </Nav.Link>
                {showPinBtn && (
                  <Nav.Link as={Link} show={showPinBtn} onClick={() => setShowMyPins(true)} className="nav-header-link me-2">
                    My Pins
                  </Nav.Link>
                )}
                <Button variant='danger' onClick={logout}>Logout</Button>
              </Nav>
            ) : (
              <Nav className='ml-auto d-flex'>
                <Nav.Link className='nav-header-link' as={Link} to='/paranormal'>
                  Ghost Sightings
                </Nav.Link>
                <Button onClick={() => setShowModal(true)}>Login/Sign Up</Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModals showModal={showModal} setShowModal={setShowModal} />
      <OffCanvas showMyPins={showMyPins} setShowMyPins={setShowMyPins} />
    </>
  );
};

export default Header;
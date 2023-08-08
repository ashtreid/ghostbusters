// TODO: Update offcanvas to render updated query fields like pinTitle, pinClassification, etc.

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import './style.css';

function OffCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const { loading, error, data } = useQuery(QUERY_ME); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.me;

  return (
    <>
      <Button variant="primary" onClick={toggleShow} className="me-2">
        My Pins
      </Button>
      <Offcanvas show={show} onHide={handleClose} scroll={false} backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.username}'s Pins</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {user && user.pins && user.pins.length > 0 ? (
            <div className="card-container"> 
              {user.pins.map((pin) => (
                <Card key={pin._id} className="my-2">
                  <Card.Body>
                    <Card.Title>{pin.pinText}</Card.Title>
                    <Card.Text>Author: {pin.pinAuthor}</Card.Text>
                    <Card.Text>Created At: {pin.createdAt}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No pins found.</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;

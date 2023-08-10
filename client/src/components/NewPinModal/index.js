//REACT MODAL BELOW (Moves the page around when clicked open)

import React from "react";
import { Modal, Form, Button } from 'react-bootstrap';

function FormModal({ openForm, onClose, onSubmit, formValues, setFormValues, position, coordinates }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
        onClose();
    };

    return (
        <div>
        <Modal show={openForm} onHide={onClose} backdrop={false}>
            <Modal.Header closeButton>
                <Modal.Title className='add-pin-title'>Add a Pin!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Pin Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formValues.title}
                            onChange={handleInputChange}
                            placeholder="Enter a title for this pin"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pin Text</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formValues.description}
                            onChange={handleInputChange}
                            placeholder="Describe your encounter"
                        />
                    </Form.Group>
                    <div className="mb-3">
                        <Form.Control type="hidden" name="lat" value={coordinates.lat} />
                        <Form.Control type="hidden" name="lng" value={coordinates.lng} />
                        <p><strong>Latitude:</strong> {coordinates.lat.toFixed(4)}</p>
                        <p><strong>Longitude:</strong> {coordinates.lng.toFixed(4)}</p>
                    </div>
                    <Button className='add-pin-btn' variant="primary" type="submit">Save Marker</Button>
                    <Button className='add-pin-btn cancel-btn' variant="secondary" onClick={onClose}>Cancel</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </div>
    );
}

export default FormModal;
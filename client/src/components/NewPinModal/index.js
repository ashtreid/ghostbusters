// REACT MODAL BELOW (Moves the page around when clicked open)

// import React from "react";
// import { Modal, Form, Button } from 'react-bootstrap';

// function FormModal({ openForm, onClose, onSubmit, formValues, setFormValues, position, coordinates }) {
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues((prevValues) => ({
//             ...prevValues,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(formValues);
//         onClose();
//     };

//     const modalStyles = {
//         position: 'absolute',
//         top: `${position.y + 150 }px`,
//         left: `${position.x - 480}px`,
//         // top: `${position.y - 90}px`,
//         // left: `${position.x + 30}px`,
//     };

//     return (
//         <div>
//         <Modal show={openForm} onHide={onClose} style={modalStyles} backdrop="static">
//             <Modal.Header closeButton>
//                 <Modal.Title>Add a Pin!</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group>
//                         <Form.Label>Pin Title</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="title"
//                             value={formValues.title}
//                             onChange={handleInputChange}
//                             placeholder="Enter a title for this pin"
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Pin Text</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="description"
//                             value={formValues.description}
//                             onChange={handleInputChange}
//                             placeholder="Describe your encounter"
//                         />
//                     </Form.Group>
//                     <div className="mb-3">
//                         <Form.Control type="hidden" name="lat" value={coordinates.lat} />
//                         <Form.Control type="hidden" name="lng" value={coordinates.lng} />
//                         <p><strong>Latitude:</strong> {coordinates.lat.toFixed(4)}</p>
//                         <p><strong>Longitude:</strong> {coordinates.lng.toFixed(4)}</p>
//                     </div>
//                     <Button variant="primary" type="submit">Save Marker</Button>
//                     <Button variant="secondary" onClick={onClose}>Cancel</Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//         </div>
//     );
// }

// export default FormModal;




// CUSTOM HTML FORM BELOW (Doesn't move the page around when clicked open but looks ugly)
 import React from "react";
 import Button from "react-bootstrap/Button"

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
         <div
             className={`modal pin-modal ${openForm ? 'is-active' : ''}`}
             style={{
                 position: 'absolute',
                 top: `${position.y - 90}px`, 
                 left: `${position.x + 30}px`,
             }}
             onClick={(e) => {
                 e.stopPropagation(); 
             }}
         >
             <div className="modal-card pin-modal-card" onClick={(e) => e.stopPropagation()}> 
                 <header className="modal-card-head pin-modal-card-head">
                     <p className="modal-card-title pin-modal-card-title">Add a Pin!</p>
                     <button className="delete pin-close" aria-label="close" onClick={onClose}></button>
                 </header>
                 <section className="modal-card-body pin-modal-card-body" background-color="red">
                     <form onSubmit={handleSubmit}>
                         <div className="field">
                             <label className="pin-label">Enter a Title</label>
                             <div className="control">
                                 <input
                                     className="pin-input"
                                     type="text"
                                     name="title"
                                     value={formValues.title}
                                     onChange={handleInputChange}
                                     placeholder="What's spooken you out?"
                                 />
                             </div>
                         </div>
                         <div className="field">
                             <label className="pin-label">What Happened?</label>
                             <div className="control">
                                 <input
                                     className="pin-input"
                                     type="text"
                                     name="description"
                                     value={formValues.description}
                                     onChange={handleInputChange}
                                     placeholder="Describe your encounter"
                                 />
                             </div>
                         </div>
                         <div className="mb-3">
                             <input type="hidden" name="lat" value={coordinates.lat} />
                             <input type="hidden" name="lng" value={coordinates.lng} />
                             <h6><strong>Latitude:</strong> {coordinates.lat.toFixed(4)}</h6>
                             <h6><strong>Longitude:</strong> {coordinates.lng.toFixed(4)}</h6>
                         </div>
                         <Button className="pin-button" type="submit">Save Marker</Button>
                         <Button className="pin-button" type="button" onClick={onClose}>Cancel</Button>
                     </form>
                 </section>
             </div>
         </div>
     );
    
 }

 export default FormModal;

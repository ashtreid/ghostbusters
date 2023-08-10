


import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import CommentsComponent from '../PinComments';

import { useMutation, useQuery } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import { QUERY_PINS } from '../../utils/queries';


function PinCard({ pin, commentsVisible, toggleComments }) {
    const [commentFormValue, setCommentForm] = useState('');
    const { loading, data, refetch } = useQuery(QUERY_PINS);
    useEffect(() => {
        if (!loading && data) {
            console.log("DATA.PINS:", data.pins);
        }
    }, [data, loading]);



    const [addComment] = useMutation(ADD_COMMENT);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addComment({
                variables: {
                    pinId: pin._id,
                    commentText: commentFormValue,
                },
            });
            console.log("data:", data);
            refetch();
            setCommentForm('');
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    };

    const handleCardClick = (e) => {
        // Prevent the click event from reaching the parent elements
        e.stopPropagation();

        // Call the toggleComments function
        toggleComments(pin._id);
    };

    const handleInputChange = (e) => {
        setCommentForm(e.target.value);
    };

    return (
        <Card >
            <Card.Body>
                <Card.Title>{pin.pinTitle}</Card.Title>
                <Card.Text>Coords: ({pin.pinLat.toFixed(4)},  {pin.pinLon.toFixed(4)})</Card.Text>
                <Card.Text>{pin.pinText}</Card.Text>
                <Card.Footer>By {pin.pinAuthor} on {pin.createdAt}</Card.Footer>
                <Card.Text onClick={handleCardClick}>
                    {!commentsVisible[pin._id] && (
                        <Card.Text >Click to view comments</Card.Text>
                    )}
                    {commentsVisible[pin._id] && (
                        <CommentsComponent comments={pin.comments} />
                    )}
                </Card.Text>
                <Form>
                    <Form.Group>
                        <Form.Label className="mb-0" htmlFor="comment"></Form.Label>
                        <Form.Control
                            className="input"
                            type="text"
                            name="text"
                            value={commentFormValue}
                            onChange={handleInputChange}
                            placeholder="Enter a comment!"
                        />
                    </Form.Group>
                    <div className="d-flex">
                        <Button type="button" className="btn" onClick={handleCommentSubmit}>Save</Button>
                        <Button className="delete-button">Delete</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default PinCard;

// import React, { useState } from 'react';
// import { Card, Form, Button } from 'react-bootstrap';
// import CommentsComponent from '../PinComments';

// import { useMutation } from '@apollo/client';
// import { ADD_COMMENT } from '../../utils/mutations';

// function PinCard({ pin, commentsVisible, toggleComments, updatePin }) {
//     const [commentFormValue, setCommentForm] = useState('');
//     const [addComment] = useMutation(ADD_COMMENT);

//     const handleCommentSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const { data } = await addComment({
//                 variables: {
//                     pinId: pin._id,
//                     commentText: commentFormValue,
//                 },
//             });

//             // Assuming that the data returned includes the updated pin object
//             // with the new comment added
//             updatePin(data.addComment);

//             setCommentForm('');
//         } catch (error) {
//             console.error('Error adding comment:', error);
//         }
//     };

//     const handleInputChange = (e) => {
//         setCommentForm(e.target.value);
//     };

//     return (
//         <Card onClick={() => toggleComments(pin._id)}>
//             <Card.Body>
//                 <Card.Title>{pin.pinTitle}</Card.Title>
//                 <Card.Text>Coords: ({pin.pinLat.toFixed(4)},  {pin.pinLon.toFixed(4)})</Card.Text>
//                 <Card.Text>{pin.pinText}</Card.Text>
//                 <Card.Footer>By {pin.pinAuthor} on {pin.createdAt}</Card.Footer>
//                 {!commentsVisible[pin._id] && (
//                     <Card.Text>Click to view comments</Card.Text>
//                 )}
//                 {commentsVisible[pin._id] && (
//                     <CommentsComponent comments={pin.comments} />
//                 )}
//                 {/* ... other card content ... */}
                
//                 <Form>
//                     <Form.Group>
//                         <Form.Label className="mb-0" htmlFor="comment"></Form.Label>
//                         <Form.Control
//                             className="input"
//                             type="text"
//                             name="text"
//                             value={commentFormValue}
//                             onChange={handleInputChange}
//                             placeholder="Enter a comment!"
//                         />
//                     </Form.Group>
//                     <div className="d-flex">
//                         <Button type="button" className="btn" onClick={handleCommentSubmit}>Save</Button>
//                         <Button className="delete-button">Delete</Button>
//                     </div>
//                 </Form>
//             </Card.Body>
//         </Card>
//     );
// }

// export default PinCard;
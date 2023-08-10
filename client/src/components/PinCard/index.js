import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import CommentsComponent from '../PinComments';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

function PinCard({ pin, commentsVisible, toggleComments }) {
    const [commentFormValue, setCommentForm] = useState('');
    const [addComment] = useMutation(ADD_COMMENT);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        console.log("commentText:", commentFormValue);

        try {
            const { data } = await addComment({
                variables: {
                    pinId: pin._id,
                    commentText: commentFormValue,
                },
            });
            console.log("data:", data);
            setCommentForm('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleInputChange = (e) => {
        setCommentForm(e.target.value);
    };

    return (
        <Card
            onClick={() => toggleComments(pin._id)}
        >
            <Card.Body>
                <Card.Title>{pin.pinTitle}</Card.Title>
                <Card.Text>Coords: ({pin.pinLat.toFixed(4)},  {pin.pinLon.toFixed(4)})</Card.Text>
                <Card.Text>{pin.pinText}</Card.Text>
                <Card.Footer>By {pin.pinAuthor} on {pin.createdAt}</Card.Footer>
                {!commentsVisible[pin._id] && (
                    <Card.Text>Click to view comments</Card.Text>
                )}
                {commentsVisible[pin._id] && (
                    <CommentsComponent comments={pin.comments} />
                )}
                <div className="popup-form">
                    <div className="form-group">
                        <label className="mb-0" htmlFor="comment"></label>
                        <input
                            className="input"
                            type="text"
                            name="text"
                            value={commentFormValue}
                            onChange={handleInputChange}
                            placeholder="Enter a comment!"
                        />
                    </div>
                    <div className="d-flex">
                        <button type="button" className="btn" onClick={handleCommentSubmit}>Save</button>
                        <button className="delete-button">Delete</button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default PinCard;



//     return (
//         <Card
//             onClick={() => toggleComments(pin._id)}
//         >
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
//                 <form className="popup-form" onSubmit={handleCommentSubmit}>
//                     <div className="form-group">
//                         <label className="mb-0" htmlFor="comment"></label>
//                         <textarea
//                             className="form-control comment"
//                             rows="4"
//                             value={commentForm}
//                             onChange={(e) => setCommentForm(e.target.value)}
//                         ></textarea>
//                     </div>
//                     <div className="d-flex">
//                         <button type="submit" className="btn">Save</button>
//                         <button className="delete-button">Delete</button>
//                     </div>
//                 </form>
//             </Card.Body>
//         </Card>
//     );
// }

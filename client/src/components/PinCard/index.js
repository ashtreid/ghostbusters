import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import CommentsComponent from '../PinComments';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

function PinCard({ pin, commentsVisible, toggleComments }) {
    const [commentText, setCommentText] = useState('');
    const [addComment] = useMutation(ADD_COMMENT);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addComment({
                variables: {
                    pinId: pin._id,
                    commentText: commentText,
                },
            });
            console.log("data:", data);

            // Assuming you get the updated pin object in response, you can update the pins state accordingly.
            // For example, you might want to refetch the pins or update the specific pin's comments.
            // Update the pins state using setPins or another appropriate method.

            // Clear the comment text after successful submission
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
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
                <form className="popup-form" onSubmit={handleCommentSubmit}>
                    <div className="form-group">
                        <label className="mb-0" htmlFor="comment"></label>
                        <textarea
                            className="form-control comment"
                            rows="4"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="d-flex">
                        <button type="submit" className="btn">Save</button>
                        <button className="delete-button">Delete</button>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
}

export default PinCard;
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
        e.stopPropagation();
        toggleComments(pin._id);
    };

    const handleInputChange = (e) => {
        setCommentForm(e.target.value);
    };

    return (
        <Card >
            <Card.Header style={{ textAlign: 'center' }}>Coords: ({pin.pinLat.toFixed(4)},  {pin.pinLon.toFixed(4)})</Card.Header>
            <Card.Body>
                <Card.Title><strong>{pin.pinTitle}</strong></Card.Title>
                <Card.Text>{pin.pinText}</Card.Text>
                <Card.Text style={{ fontSize: '10px', textAlign: 'center' }}>By <strong>{pin.pinAuthor}</strong> on {pin.createdAt}</Card.Text>

            </Card.Body>
            <Card.Footer onClick={handleCardClick} style={{ textAlign: 'center' }}>
                {!commentsVisible[pin._id] && (
                    <Card.Text style={{ textDecoration: 'underline' }}>Click to view comments</Card.Text>
                )}
                {commentsVisible[pin._id] && (
                    <CommentsComponent comments={pin.comments} />
                )}
            </Card.Footer>
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
                <div className="d-flex" style={{ justifyContent: 'center', width: '100%' }}>
                    <Button type="button" className="btn" onClick={handleCommentSubmit} style={{ width: '100%' }}>
                        Save Comment
                    </Button>
                </div>
            </Form>
        </Card>
    );
}

export default PinCard;


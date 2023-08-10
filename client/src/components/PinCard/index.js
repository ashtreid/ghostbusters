import React from 'react';
import { Card } from 'react-bootstrap';
import CommentsComponent from '../PinComments';

function PinCard({ pin, commentsVisible, toggleComments }) {
    return (
        <Card
            onClick={() => toggleComments(pin._id)}
        >
            <Card.Body>
                <Card.Title>{pin.pinTitle}</Card.Title>
                <Card.Text>Coords: ({pin.pinLat.toFixed(4)},  {pin.pinLon.toFixed(4)})</Card.Text>
                <Card.Text>{pin.pinText}</Card.Text>
                <Card.Footer>By {pin.pinAuthor}</Card.Footer>
                {!commentsVisible[pin._id] && (
                    <Card.Text>Click to view comments</Card.Text>
                )}
                {commentsVisible[pin._id] && (
                    <CommentsComponent comments={pin.comments} />
                )}
                <form className="popup-form">
                    <div className="form-group">
                        <label className="mb-0" htmlFor="comment"></label>
                        <textarea className="form-control comment" rows="4"></textarea>
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
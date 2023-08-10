import React from 'react';
import Card from 'react-bootstrap/Card';

function CommentsComponent({ comments }) {
    if (!comments || comments.length === 0) {
      return (
        <div>
          <hr />
          <Card className="my-2">
            <Card.Body>
              <Card.Text>This pin doesn't have any comments yet. Be the first to add one!</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
  
    return (
      <div>
        <hr />
        {comments.map((comment) => (
          <Card key={comment._id} className="my-2">
            <Card.Body>
              <Card.Title>{comment.commentText}</Card.Title>
              <Card.Text>{comment.commentAuthor}  ·  {comment.createdAt}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
}

export default CommentsComponent;
import React from 'react';
import Card from 'react-bootstrap/Card';

function CommentsComponent({ comments }) {
    if (!comments || comments.length === 0) {
      return (
        <div>
          {/* <Card className="my-2"> */}
            <Card.Body>
              <Card.Text>This pin doesn't have any comments yet. Be the first to add one!</Card.Text>
            </Card.Body>
          {/* </Card> */}
        </div>
      );
    }
  
    return (
      <div>
        {comments.map((comment) => (
          <Card key={comment._id} className="my-2">
            <Card.Body style={{ textAlign: 'left' }}>
              <Card.Text>{comment.commentText}</Card.Text>
              <Card.Text style={{ fontSize: '10px' }}>{comment.commentAuthor}  ·  {comment.createdAt}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
}

export default CommentsComponent;
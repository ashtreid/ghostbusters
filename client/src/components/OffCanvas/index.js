import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { Offcanvas, Card } from 'react-bootstrap';

function OffCanvas({ showMyPins, setShowMyPins }) {
  const [commentsVisible, setCommentsVisible] = useState({});

  const handleClose = () => setShowMyPins(false);

  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return null;

  const user = data.me;

  const toggleComments = (pinId) => {
    setCommentsVisible((prev) => ({ ...prev, [pinId]: !prev[pinId] }));
  };

  return (
    <>
      <Offcanvas show={showMyPins} onHide={handleClose} scroll={false} backdrop='static'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='offcanvas-title'>{user.username}'s Pins</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {user && user.pins && user.pins.length > 0 ? (
            <div className="card-container">
              {user.pins.map((pin) => (
                <Card
                  key={pin._id}
                  className="my-2"
                  onClick={() => toggleComments(pin._id)}
                >
                  <Card.Body>
                    <Card.Title>{pin.pinTitle}</Card.Title>
                    <Card.Text>{pin.pinText}</Card.Text>
                    <Card.Text>From {pin.createdAt}</Card.Text>
                    {!commentsVisible[pin._id] && (
                      <Card.Text>Click to view comments</Card.Text>
                    )}
                    {commentsVisible[pin._id] && (
                      <CommentsComponent comments={pin.comments} />
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>You haven't dropped any pins!</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function CommentsComponent({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <div>
        <hr />
        <Card className="my-2">
          <Card.Body>
            <Card.Text>This pin doesn't have any comments yet.</Card.Text>
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

export default OffCanvas;

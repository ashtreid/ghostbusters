// TODO: Update offcanvas to render updated query fields like pinTitle, pinClassification, etc.
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import './style.css';

function OffCanvas() {
  const [show, setShow] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState({});

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.me;
  console.log("comments", user.pins[0].comments)
  console.log("comments", user.username)

  const toggleComments = (pinId) => {
    setCommentsVisible((prev) => ({ ...prev, [pinId]: !prev[pinId] }));
  };

  return (
    <>
      <Button variant="primary" onClick={toggleShow} className="me-2">
        My Pins
      </Button>
      <Offcanvas show={show} onHide={handleClose} scroll={false} backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.username}'s Pins</Offcanvas.Title>
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
            <p>No pins found.</p>
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



// TODO: Delete later. This code will not display comments in the offcanvas.
// No comments on Card
// import { useState } from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_ME } from '../../utils/queries';

// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import Card from 'react-bootstrap/Card';
// import './style.css';

// function OffCanvas() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const toggleShow = () => setShow((s) => !s);

//   const { loading, error, data } = useQuery(QUERY_ME); 

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const user = data.me;

//   return (
//     <>
//       <Button variant="primary" onClick={toggleShow} className="me-2">
//         My Pins
//       </Button>
//       <Offcanvas show={show} onHide={handleClose} scroll={false} backdrop={true}>
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>{user.username}'s Pins</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           {user && user.pins && user.pins.length > 0 ? (
//             <div className="card-container"> 
//               {user.pins.map((pin) => (
//                 <Card key={pin._id} className="my-2">
//                   <Card.Body>
//                     <Card.Title>{pin.pinTitle}</Card.Title>
//                     <Card.Text>{pin.pinText}</Card.Text>
//                     <Card.Text>{pin.createdAt}</Card.Text>
//                   </Card.Body>
//                 </Card>
//               ))}
//             </div>
//           ) : (
//             <p>No pins found.</p>
//           )}
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// }

// export default OffCanvas;

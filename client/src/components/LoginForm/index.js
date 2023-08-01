// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;


// import React, { useState } from 'react';

// const LoginForm = ({ show, onClose }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//     })

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value })
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log(formData);
//         onClose();
//     }

//     if (!show) {
//         return null;
//     }

//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <span className="close" onClick={onClose}>
//                     &times;
//                 </span>
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default LoginForm;
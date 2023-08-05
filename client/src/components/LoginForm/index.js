// see SignupForm.js for comments
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // const [validated] = useState(false);
  const [login, { error, data }] = useMutation(LOGIN_USER)
//   const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setUserFormData({ 
      ...userFormData, 
      [name]: value, 
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);

    try {
      const { data } = await login({
        variables: { ...userFormData }
      });

      Auth.login(data.login.token);
    } catch (event) {
      console.error(event);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      {data ? (
        <p> 
          Success! You may now head{' '}
          <Link to='/'>back to the homepage.</Link>
        </p>
      ) : (
      <Form onSubmit={handleFormSubmit}>
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
      )}

      {error && (
        <div className='my-3 p-3 bg-danger text-white'>
          {error.message}
        </div>
      )}
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
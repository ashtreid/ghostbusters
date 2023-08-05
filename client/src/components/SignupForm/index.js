import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserFormData({
      ...userFormData,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Sign up form data:", userFormData);

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (event) {
      console.error(event);
    }
  };

  return (
    <>
      {data ? (
        <p>
          Success! Welcome to the Ghostbusters!
        </p>
      ) : (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your username'
              name='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
            <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Your email address'
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
            disabled={!(userFormData.username && userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submit
          </Button>
        </Form >
      )}

      {error && (
        <div className='my-3 p-3 bg-danger text-white'>
          {error.message}
        </div>
      )}
    </>
  );
};

export default SignupForm;
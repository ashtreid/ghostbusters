import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token {
        _id
        username
      }
    }
  }
`;

export const ADD_PIN = gql`
  mutation addPin($pinText: String!) {
    addPin(pinText: $pinText) {
      _id
      pinText
      pinAuthor
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($pinId: ID!, $commentText: String!) {
    addComment(pintId: $pinId, commentText: $commentText) {
      _id
      pinText
      pinAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

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
      token 
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PIN = gql`
  mutation addPin($pinLat: Float!, $pinLon: Float!, $pinTitle: String! $pinText: String!) {
    addPin(pinLat: $pinLat, pinLon: $pinLon, pinTitle: $pinTitle, pinText: $pinText) {
      _id
      pinLat
      pinLon
      pinTitle
      pinText
      pinAuthor
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($pinId: ID!, $commentText: String!) {
    addComment(pinId: $pinId, commentText: $commentText) {
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const REMOVE_PIN = gql`
  mutation removePin($pinId: ID!) {
    removePin(pinId: $pinId) {
      _id
      pinLat
      pinLon
      pinAuthor
      createdAt
    }
  }
`;


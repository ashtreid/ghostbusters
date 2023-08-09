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
// //pinLat, pinLon, pinClassification, pinTitle, pinText
// export const ADD_PIN = gql`
//   mutation addPin($pinLat: Float!, $pinLon: Float!, $pinClassification: String!, $pinTitle: String!, $pinText: String!) {
//     addPin(pinLat: $pinLat, pinLon: $pinLon, pinClassification: $pinClassification, pinTitle: $pinTitle, pinText: $pinText) {
//       _id
//       pinLat
//       pinLon
//       pinClassification
//       pinTitle
//       pinText
//       pinAuthor
//       createdAt
//     }
//   }
// `;

//pinLat, pinLon, pinClassification, pinTitle, pinText
export const ADD_PIN = gql`
  mutation addPin($pinLat: Float!, $pinLon: Float!, $pinTitle: String!) {
    addPin(pinLat: $pinLat, pinLon: $pinLon, pinTitle: $pinTitle) {
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
    addComment(pintId: $pinId, commentText: $commentText) {
      _id
      pinText
      pinAuthor
      createdAt
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

// export const REMOVE_PIN = gql`
//   mutation removePin($pinId: ID!) {
//     removePin(pinId: $pinId) {
//       _id
//       pinLat
//       pinLon
//       pinAuthor
//       createdAt
//     }
//   }
// `;

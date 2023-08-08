import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      pins {
        _id
        pinText
        createdAt
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      pins {
        _id
        pinText
        createdAt
      }
    }
  }
`;

// export const QUERY_PINS = gql`
// query getPins {
//   users {
//     pins {
//       _id
//       pinText
//       pinAuthor
//       createdAt
//     }
//   }
// }
// `;

// export const QUERY_PINS = gql`
//   query getPins($username: String) {
//     pins(username: $username) {
//       _id
//       pinLat
//       pinLon
//       pinTitle
//       pinAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         commentAuthor
//       }
//     }
//   }
// `;


export const QUERY_PINS = gql`
  query getPins {
    pins {
      _id
      pinLat
      pinLon
      pinTitle
      pinAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

export const QUERY_SINGLE_PIN = gql`
  query getSinglepin($pinId: ID!) {
    pin(pinId: $pinId) {
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      pins {
        _id
        pinTitle
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
  }
`;

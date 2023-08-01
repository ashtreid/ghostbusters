const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    pins: [Pin]!
  }

  type Pin {
    _id: ID
    pinLat: Float
    pinLon: Float
    pinClassification: String
    pinTitle: String
    pinText: String
    pinAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    # pins(username: String): [Pin]
    pins(pinClassification: String): [Pin]
    pin(pinId: ID!): Pin
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    # TODO: addPin will need some tweaks for location (lat, lon) to work with the map
    addPin(pinLat: Float!, pinLon: Float!, pinClassification: String!, pinTitle: String!, pinText: String!): Pin

    removePin(pinId: ID!): Pin
    addComment(pinId: ID!, commentText: String!): Pin
    removeComment(pinId: ID!, commentId: ID!): Pin
  }
`;

module.exports = typeDefs;

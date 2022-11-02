const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    Save: [Movie]
password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Movie {
_id:ID!
    movieId:  String
    
    title: String
      poster: String
overview: String
  }

  input InputMovie {
    id: String
    title: String
    overview: String
  
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(newMovie: InputMovie!): User
    removeMovie(movieId: ID!): User
  }
`;

module.exports = typeDefs;
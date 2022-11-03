const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    saveMovie: [Movie]
password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Movie {         
    filmID:Int
    
    title: String
      poster: String
overview: String
  }

  input savedtheMovie {
     id:ID!
    filmID:  Int
    
    title: String
      poster: String
overview: String
  
            }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(input: savedtheMovie!): User
    deleteMovie(filmID: ID!): User
  }
`;

module.exports = typeDefs;
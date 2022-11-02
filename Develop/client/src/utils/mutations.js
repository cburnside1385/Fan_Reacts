import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
        password
        Save {
          _id
          poster
          title
          overview
        }
      }
    }
  }
`;

export const SAVE_Movie = gql`
  mutation saveMovie($newMovie: InputMovie!) {
    saveMovie(newMovie: $newMovie) {
      _id
      username
      email
      Save {
        _id
        authors
        description
        title
        image
        link
      }
    }
  }
`;


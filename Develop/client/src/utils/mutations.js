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
        movieCount
        Save {
          authors
          movieId
          image
          link
          title
          description
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
        movieId
        authors
        description
        title
        image
        link
      }
    }
  }
`;


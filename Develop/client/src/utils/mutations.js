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
        
    
      }
    }
  }
`;

export const SAVE = gql`
  mutation saveMovie($input: savedtheMovie!) {
    saveMovie(input: $input) {
      _id
      username
      email
      saveMovie {
        # _id
        filmID
        overview
        title
        poster
      
      }
    }

  }

`;
export const Delete = gql`
  mutation deleteMovie($input: savedtheMovie!) {
    deleteMovie(input: $input) {
      _id
      username
      email
      saveMovie {
        # _id
        filmID
        overview
        title
        poster
      
      }
    }
  }

`;
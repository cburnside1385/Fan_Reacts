import { gql } from '@apollo/client';

export const PersonalProfile = gql`
  {
    me {
      _id
      username
      email
      
      Save {
        movieId
        overview
        title
        poster
      }
    }
  }
`;
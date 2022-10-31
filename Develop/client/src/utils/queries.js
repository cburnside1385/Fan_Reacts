import { gql } from '@apollo/client';

export const get_Me = gql`
  {
    me {
      _id
      username
      email
      bookCount
      Save {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
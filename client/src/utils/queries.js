import gql from "graphql-tag";

export const PersonalProfile = gql`
  {
    me{
      _id
      username
      email
      
      saveMovie{
    
        filmID
        overview
        title
        poster
      }
    }
  }
`;
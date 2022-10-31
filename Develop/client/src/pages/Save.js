import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { PersonalProfile } from '../utils/queries';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_Movie } from '../utils/mutations';

const Save = () => {
  const [userData, setUserData] = useState({});
    const [REMOVE_Movie, { error }] = useMutation(REMOVE_Movie);
  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;
    const { loading, data } = useQuery(PersonalProfile);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

          const response = await PersonalProfile(token);

        if (!response.ok) {
          throw new Error('Error!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);


  const handleDeleteMovies = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
        const { data } = await REMOVE_Movie({
            variables: { movieId },
        });

        removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.Save.length
            ? `Viewing ${userData.Save.length} saved ${userData.Save.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2>
        <CardColumns>
          {userData.Save.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                
                  <Card.Text>{movie.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteMovies(movie.movieId)}>
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Save;

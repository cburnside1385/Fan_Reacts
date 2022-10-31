import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { movieSave, search } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';


//const Searchmovies = () => {
//  // create state for holding our search field data
//  const [searchInput, setSearchInput] = useState('');
//    const [Moviesearch, movieapi] = useState([]);


//  // create state to hold saved bookId values
//  const [savedMovieIds, setsavedMovieIds] = useState(getSavedMovieIds());

//  // set up useEffect hook to save `savedMovieIds` list to localStorage on component unmount
//  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
//  useEffect(() => {
//    return () => saveMovieIds(savedMovieIds);
//  });

//  // create method to search for books and set state on form submit
  


//  return (
//      <>


//          <Container>
//              <h2>
//                  {Moviesearch.length
//                      ? `Viewing ${Moviesearch.length} results:`
//                      : 'Search for a movie to begin'}
//              </h2>
//              <CardColumns>
//                  {Moviesearch.map((movie) => {

//                      return (
//                          <Card key={movie.id} border='dark'>
//                              {movie.image ? (
//                                  <Card.Img src={movie.backdrop_path} alt={`The cover for ${movie.title}`} variant='top' />
//                              ) : null}
//                              <Card.Body>
//                                  <Card.Title>{movie.title}</Card.Title>
//                                  {/*<p className='small'>: {movie.authors}</p>*/}
//                                  <Card.Text>{movie.overview}</Card.Text>
//                                  {/*                    {Auth.loggedIn() && (*/}
//                                  {/*                      //<Button*/}
//                                  {/*                      //  disabled={savedBookIds?.some((savedBookId) => savedBookId === movie.bookId)}*/}
//                                  {/*                      //  className='btn-block btn-info'*/}
//                                  {/*                      //  onClick={() => handleSaveBook(movie.bookId)}>*/}
//                                  {/*                      //  {savedBookIds?.some((savedBookId) => savedBookId === movie.bookId)*/}
//                                  {/*                      //    ? 'This movie has already been saved!'*/}
//                                  {/*                      //    : 'Save this movie!'}*/}
//                                  {/*                      //</Button>*/}
//                                  {/*)}*/}
//                              </Card.Body>
//                          </Card>
//                      );
//                  })}
//              </CardColumns>
//          </Container>
//      </>
//  );
//};

//export default Searchmovies;

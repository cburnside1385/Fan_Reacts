import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import { search } from '../utils/API';
import { Navbar, Nav, Container, Modal, Tab, Form, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { SAVE } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";



const AppNavbar = () => {
 
  const [showModal, setShowModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [Moviesearch, movieapi] = useState([]);
    const [saved, setSaveId] = useState(getSavedMovieIds());
    const [save] = useMutation(SAVE);
    const searchFilms = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {

            const response = await search(searchInput);
           
           
            if (!response.ok) {
                throw new Error('something went wrong!');
            }
          
            const { results } = await response.json();
            
            const films = results.map((movie) => ({
                id: movie.id,
                filmID: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster: movie.poster_path,
            }));
          
            movieapi(films);
            setSearchInput('');
            
        } catch (err) {
            console.error(err);
        }
    };


    const saveIt = async (filmID) => {

        const savefilms = Moviesearch.find((movie) => movie.id === filmID);


        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await save({
                variables: { input: savefilms },
            });

            setSaveId([...saved, savefilms.id]);
        } catch (err) {
            console.error(err);
        }
    };
  return (
    <>
      <Navbar expand='lg'>
        <Container fluid>
          <Navbar as={Link} to='/'>
           FanReacts
          </Navbar>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
                          <Nav.Item>
                              <Form>

                                  <Form.Control
                                  name='searchInput'
                                  value={searchInput}
                                      onChange={(e) => setSearchInput(e.target.value) }
                                  type='text'
                                  size='lg'
                                  placeholder='Search for a movie'
                                            />
                         
                              </Form>
                              
                          </Nav.Item>
                          <Nav.Item>
                              <Form onSubmit={searchFilms}>
                                  <button className="btn btn-outline-success" id="searchbtn" type="submit">Search</button>
                              </Form>
                          </Nav.Item>
              {Auth.loggedIn() ? (
                <>
                  <Nav as={Link} to='/saved'>
                    Sav
                  </Nav>
                  <Nav onClick={Auth.logout}>Logout</Nav>
                </>
                          ) : (

                <Nav onClick={() => setShowModal(true)}>Login/Sign Up</Nav>

              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
             <Nav variant='pills'>     
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Create Account</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
          </Modal>
          <>


              
                 
                      <div className="form-row text-center">
                         
                      {Moviesearch.map((movie) => {
                         
                          return (
                              <div className="card">
                                  {Auth.loggedIn() && (
                                      <Button
                                          disabled={saved?.some(
                                              (savedmovieId) => savedmovieId === movie.id
                                          )}
                                          className="btn-block"
                                          onClick={() => saveIt(movie.id)}
                                      >
                                          {saved?.some(
                                              (savedmovieId) => savedmovieId === movie.id
                                          )
                                              ? <span className="saved">&#x2665;</span>
                                              : <span className="heart">&#x2665;</span>}
                                      </Button>



                                  )}
                                      <img className="img1" src={`https://image.tmdb.org/t/p/original/${movie.poster}`} />
                                  <center>
                                  
                                      <div className="img2">{movie.title}</div>
                                          </center>
                                    <div className="text">{movie.overview}</div>
                                  
                              </div>
                             
                          );
                      })}
                                 
                             
                  </div>
            
          </>
      </>

  );
};

export default AppNavbar;

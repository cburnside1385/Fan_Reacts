import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { start } from '../utils/API';


const Popular = () => {
    const [populars,popularmovieapi] = useState([]);
    const Popularfilms = async () => {
      


        try {
            const response = await start();


            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { results } = await response.json();

            const filmspopular = results.map((movie) => ({
                id: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster: movie.poster_path,
            }));

            popularmovieapi(filmspopular);
         

        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        Popularfilms();
    }, []);
    return (
        
      

            
            <>


                <Container className="sideScroll">

                    <div class="form-row text-center">

                    {populars.map((movie) => {

                            return (
                                <div className="card">

                                    <img className="img1" src={`https://image.tmdb.org/t/p/original/${movie.poster}`} />
                                    <center>
                                        <div className="img2">{movie.title}</div>
                                    </center>
                                    <div className="text">{movie.overview}</div>

                                </div>

                            );
                        })}


                    </div>
                </Container>
            </>
        

    );
};
export default Popular;

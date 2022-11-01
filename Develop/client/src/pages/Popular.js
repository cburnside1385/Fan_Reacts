import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { start } from '../utils/API';


const Popular = () => {
    const [populars, popularmovieapi] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
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
        
      

            
        <div className="container-fluid" >


            

                <div className="text-center scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">

                    {populars.map((movie) => {

                            return (
                                <><div className="card col-2">
                                    <div className={ (hover || rating) ? "saved heart" : "notsaved heart"}>&#x2665;</div>
                                    <img className="img1" src={`https://image.tmdb.org/t/p/original/${movie.poster}`} />
                                    <center>
                                        <div className="img2">{movie.title}</div>
                                    </center>
                                    <div className="text">{movie.overview}</div>

                                </div>
                                        <div className="star-rating">
                                            {[...Array(5)].map((star, index) => {
                                                index += 1;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={index}
                                                        className={index <= (hover || rating) ? "on" : "off"}
                                                        onClick={() => setRating(index)}
                                                        onMouseEnter={() => setHover(index)}
                                                        onMouseLeave={() => setHover(rating)}
                                                    >
                                                        <span className="star">&#9733;</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </>

                            );
                        })}


                    </div>
                
            </div>
        

    );
};
export default Popular;

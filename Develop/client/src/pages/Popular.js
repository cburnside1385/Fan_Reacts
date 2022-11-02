import React, { useState, useEffect } from 'react';
import {Button } from 'react-bootstrap';
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import Auth from '../utils/auth';
import { start, nowplaying, upcoming } from '../utils/API';
import { SAVE } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";


const Popular = () => {
    const [populars, popularmovieapi] = useState([]);
    const [upcomingmovies, upcomingmovieapi] = useState([]);
    const [nowplayingmovies, nowplayingmovieapi] = useState([]);
    const [saved, setSaveId] = useState(getSavedMovieIds());
    const [save] = useMutation(SAVE);
    useEffect(() => {
        return () => saveMovieIds(saved);
    });
    const Popularfilms = async () => {
      


        try {
            const response = await start();
            const response2 = await nowplaying();
            const response3 = await upcoming();

            if (!response.ok) {
                throw new Error('something went wrong!');
            }
            if (!response2.ok) {
                throw new Error('something went wrong!');
            }
            if (!response3.ok) {
                throw new Error('something went wrong!');
            }


            var { results } = await response.json();
            var { results } = await response2.json();
            var { results } = await response3.json();
            console.log(results)

            const filmspopular = results.map((movie) => ({
                id: movie.id,
                filmID: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster: movie.poster_path,
            }));

          

            const filmsnow = results.map((movie) => ({
                id: movie.id,
                filmID: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster: movie.poster_path,
            }));

            const filmsupc = results.map((movie) => ({
                id: movie.id,
                filmID: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster: movie.poster_path,
            }));


            popularmovieapi(filmspopular);
            nowplayingmovieapi(filmsnow);
            upcomingmovieapi(filmsupc);
         

        } catch (err) {
            console.error(err);
        }
    };

    const saveIt = async (filmID) => {

        const savefilms = populars.find((movie) => movie.id === filmID);

   
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
    useEffect(() => {
        Popularfilms();
    }, []);
    return (
        
      

            
        <div className="container-fluid" id="clear">


            

                <div className="text-center scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">

                {nowplayingmovies.map((movie) => {

                            return (
                                <><div className="card col-2">
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
                                            : <span className="heart">&#x2665;</span> }
                                        </Button>
                        


                                    )}
                                    <img className="img1" src={`https://image.tmdb.org/t/p/original/${movie.poster}`} />
                                    <center>
                                        <div className="img2">{movie.title}</div>
                                    </center>
                                    <div className="text">{movie.overview}</div>

                                </div>
                                  
                                    </>

                            );
                        })}


                    </div>
            <>
                <div className="text-center scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
                 
                    {upcomingmovies.map((movie) => {

                        return (
                            <><div className="card col-2">
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

                            </>

                        );
                    })}


                </div>
            </>

            <>
                <div className="text-center scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
                   
                    {populars.map((movie) => {

                        return (
                            <><div className="card col-2">
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

                            </>

                        );
                    })}


                </div>
            </>
            </div>
        

    );
};
export default Popular;

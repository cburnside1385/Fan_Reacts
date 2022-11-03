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
           

            if (!response.ok) {
                throw new Error('something went wrong!');
            }
       
            var { results } = await response.json();
     
            console.log(results)

            const filmspopular = results.map((movie) => ({
                id: movie.id,
                filmID: movie.id,
                title: movie.title,
                overview: movie.overview,
                poster: movie.poster_path,
            }));

          

           

            popularmovieapi(filmspopular);
          

        } catch (err) {
            console.error(err);
        }
    };

    const Upcomingfilms = async () => {



        try {
          
            const response2 = await upcoming();
     

            if (!response2.ok) {
                throw new Error('something went wrong!');
            }
        


        
            var { results } = await response2.json();
         
            console.log(results)

            const Upcomingfilms = results.map((movie) => ({
                id2: movie.id,
                filmID2: movie.id,
                title2: movie.title,
                overview2: movie.overview,
                poster2: movie.poster_path,
            }));



           


          
            upcomingmovieapi(Upcomingfilms);
         


        } catch (err) {
            console.error(err);
        }
    };

    const Nowfilms = async () => {



        try {

            const response3 = await nowplaying();


            if (!response3.ok) {
                throw new Error('something went wrong!');
            }




            var { results } = await response3.json();

            console.log(results)

            const Nowfilms = results.map((movie) => ({
                id3: movie.id,
                filmID3: movie.id,
                title3: movie.title,
                overview3: movie.overview,
                poster3: movie.poster_path,
            }));







            nowplayingmovieapi(Nowfilms);



        } catch (err) {
            console.error(err);
        }
    };
    const saveIt2 = async (filmID) => {

        const savefilms = nowplayingmovies.find((movie) => movie.id === filmID);
      
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

    const saveIt3 = async (filmID) => {

   
        const savefilms = upcomingmovies.find((movie) => movie.id === filmID);
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
        Upcomingfilms();
        Nowfilms();
    }, []);
    return (
        
      

            
        <div className="container-fluid" id="clear">


            
            <center><h3>Popular</h3></center>
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
                <center><h3>Upcoming</h3></center>
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
                                        onClick={() => saveIt3(movie.id)}
                                    >
                                        {saved?.some(
                                            (savedmovieId) => savedmovieId === movie.id
                                        )
                                            ? <span className="saved">&#x2665;</span>
                                            : <span className="heart">&#x2665;</span>}
                                    </Button>



                                )}
                                <img className="img1" src={`https://image.tmdb.org/t/p/original/${movie.poster2}`} />
                                <center>
                                    <div className="img2">{movie.title2}</div>
                                </center>
                                <div className="text">{movie.overview2}</div>

                            </div>

                            </>

                        );
                    })}


                </div>
            </>

            <>
                <center><h3>Now Playing</h3></center>
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
                                        onClick={() => saveIt2(movie.id)}
                                    >
                                        {saved?.some(
                                            (savedmovieId) => savedmovieId === movie.id
                                        )
                                            ? <span className="saved">&#x2665;</span>
                                            : <span className="heart">&#x2665;</span>}
                                    </Button>



                                )}
                                <img className="img1" src={`https://image.tmdb.org/t/p/original/${movie.poster3}`} />
                                <center>
                                    <div className="img2">{movie.title3}</div>
                                </center>
                                <div className="text">{movie.overview3}</div>

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

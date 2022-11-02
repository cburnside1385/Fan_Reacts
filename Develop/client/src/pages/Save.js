import React, { useState, useEffect } from 'react';


import { PersonalProfile } from '../utils/queries';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { Delete } from '../utils/mutations';
const Saved = () => {
    const { loading, data } = useQuery(PersonalProfile);
    const [deleteit] = useMutation(Delete);
    
    const userData = data?.me || [];
    console.log(userData)

  const DeleteMovie = async (id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
        await deleteit({
            variables: { id },
        });

        removeMovieId(id);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h2>Processing...</h2>;
  }

  return (
    <>
          <div className="form-row text-center">
                  {userData.saveMovie.map((movie) => {
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
     
    </>
  );
};

export default Saved;

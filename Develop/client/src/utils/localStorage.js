export const getSavedMovieIds = () => {
  const savedmovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : [];

  return savedmovieIds;
};

export const saveMovieIds = (moviearr) => {
    if (moviearr.length) {
        localStorage.setItem('saved_movies', JSON.stringify(moviearr));
  } else {
    localStorage.removeItem('saved_movies');
  }
};

export const removeMovieId = (filmId) => {
  const savedmovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : null;

  if (!savedmovieIds) {
    return false;
  }

    const updatedSavedMovieIds = savedmovieIds?.filter((savedMovieId) => savedMovieId !== filmId);
  localStorage.setItem('saved_movies', JSON.stringify(updatedSavedMovieIds));

  return true;
};

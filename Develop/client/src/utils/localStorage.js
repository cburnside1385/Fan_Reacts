export const getSavedMovieIds = () => {
  const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : [];

  return savedMovieIds;
};

export const saveMovieIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_movies', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_movies');
  }
};

export const removeMovieId = (bookId) => {
  const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : null;

  if (!savedMovieIds) {
    return false;
  }

  const updatedSavedMovieIds = savedMovieIds?.filter((savedMovieId) => savedMovieId !== bookId);
  localStorage.setItem('saved_movies', JSON.stringify(updatedSavedMovieIds));

  return true;
};

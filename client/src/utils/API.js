
export const start = () => {
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fe128699a494c43ade05a16dbd2a6fa&language=en-US&page=1`);
}
export const upcoming = () => {
    return fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=7fe128699a494c43ade05a16dbd2a6fa&language=en-US&page=1`);
}

export const nowplaying = () => {
    return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=7fe128699a494c43ade05a16dbd2a6fa&language=en-US&page=1`);
}
// search for a single movie title
export const search = (query) => {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=7fe128699a494c43ade05a16dbd2a6fa&language=en-US&query=${query}&page=1`)
}


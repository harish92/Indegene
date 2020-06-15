const apiKey = 'a8b0fb11';

export function fetchMovie(query, year){
    const resp = fetch(`http://www.omdbapi.com/?s=${query}&y=${year}&apikey=${apiKey}`)
        .then(response => {
            return response.json()
        })
    return resp;
}

export function fetchMovieDetails(imdbID){
    const resp = fetch(`http://www.omdbapi.com/?i=${imdbID}2&plot=full&apikey=${apiKey}`)
        .then(response => {
            return response.json()
        })
    return resp;
}

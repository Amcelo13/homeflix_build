const API_KEY = "37b0d1098174151668bfa41e531f829b"

const requests = {
     fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
     fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
     fetchToprated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
     fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
     fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
     fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
     fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
     fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`

};

//It will be like baseUrl/fetchHorrorMovies ...
export default requests
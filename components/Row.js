import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow = false}) {
  const [movies, setMovies] = useState([]);

  // A snippet which runs based on a specific condition
  useEffect(() => {
    // if [] run once when row loads, and don't run again
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  // console.table(movies);

  return (
    <div className="row">
      <h2> {title} </h2>
       
      <div className="row__posters">
      {movies.map((movie) => (

        // Adding conditionals to prevent any broken links
        ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && 
        (
          <img 
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          
            key={movie.id}
            src={`${base_url}${isLargeRow ? movie.poster_path:movie.backdrop_path}`}
            alt={movie.name}
            data-name={movie.name}
          />
      )
        ))}
        
      </div>
    </div>
  );
}

export default Row;
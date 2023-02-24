import axios from '../axios';
import React, { useEffect, useState } from 'react'
import './Banner.css'
import requests from '../Requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Banner() {
  const [movie, setMovie] = useState([]);  //empty array  

  useEffect(()=>{
    async function fetchData(){
      const request = await axios.get(requests.fetchNetflixOriginals)

      setMovie(   //fetching any of random movie from NetflixOriginals
        request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
      )

      return request;
    }

    fetchData()  //Calling the fetchData
  },[])
  // console.log(movie)
    function truncate(string ,n){    //function to truncate the long movie descr. 
            return string?.length > n?string.substr(0,n) + "..." :string 
    }
  return (
    <header className='banner'
    style= {{backgroundSize : "cover",
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
     
    }} >
        <div className='banner__contents'>
            <h1 className='banner_title'>
              {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <div className='banner__buttons'>
                <button className='banner__button'><FontAwesomeIcon icon="fa-solid fa-play"/>Play</button>
                <button className='banner__button'><FontAwesomeIcon icon="fa-solid fa-circle-info"/>Info</button>
            </div>

            <h1 className='banner__description'>{truncate(movie?.overview,150)}</h1>
        </div>

        <div className='banner--fadeBottom'/>

    </header>
  )
}

export default Banner
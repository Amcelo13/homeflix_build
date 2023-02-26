import requests from '../Requests'
import React from 'react'
import './HomeScreen.css'
import Nav from '../components/Nav'
import Banner from '../components/Banner'
import Row from '../components/Row'
export default function HomeScreen() {
 
  return (
    <div className='homeScreen'>
      {/* Navbar  */}
        <Nav/>
        
      {/* Banner */}
        <Banner/>

      {/* Rows */}
        <Row title={"Homeflix Originals"} fetchURL ={requests.fetchNetflixOriginals} isLargeRow/>        
        <Row title={"Trending Now"} fetchURL ={requests.fetchTrending} />        

        <Row title={"Top Rated"} fetchURL ={requests.fetchToprated} />
        <Row title={"Action Movies"} fetchURL ={requests.fetchActionMovies} />
        <Row title={"Comedy Movies"} fetchURL ={requests.fetchComedyMovies} />
        <Row title={"Horror Movies"} fetchURL ={requests.fetchHorrorMovies} />
        <Row title={"Romance Movies"} fetchURL ={requests.fetchRomanceMovies} />
        <Row title={"Documentaries"} fetchURL ={requests.fetchDocumentaries} />
      
    </div>
  )
}

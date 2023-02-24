import React,{useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";

import './Nav.css'
function Nav() {
const [show ,handleShow] = useState(false); //Declaring show state as false initially 
const navigate = useNavigate()

const profile_navigator =()=>{
  navigate('./profile')
}
const home_navigator = ()=>{
  navigate('/')
}

const transitionNavBar = () =>{
  if(window.scrollY > 370){
    handleShow(true)
  }else{
    handleShow(false)
  }
}
useEffect(()=>{
  window.addEventListener("scroll" ,transitionNavBar)
  return() => window.removeEventListener("scroll",transitionNavBar) 
} ,[])
  return (
    <div className={`nav ${show && 'nav__black'}`}>

      <div className='nav__content'>

      <img className='nav__logo' onClick={home_navigator}
      src='https://i.pinimg.com/originals/84/8f/37/848f379bb2d5062b3ea67b90b2ab7a43.png' alt=''/>
      
      <img className='nav__avatar' onClick={profile_navigator}
      src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt=''/>
      </div>
      

      
    </div>
  )
}

export default Nav
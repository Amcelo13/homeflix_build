import React from 'react'
import { useSelector } from 'react-redux'
import Nav from '../components/Nav'
import { selectUser } from '../features/userSlice'
import {auth} from './firebase'
import PlansScreen from './PlansScreen'
import './ProfileScreen.css'


function ProfileScreen() {
    const user = useSelector(selectUser)   //iMPORTING USER DETAILS Here from REDUX STORE

  return (
    <div className='profileScreen'>
        <Nav/>

            <div className='profileScreen__body'>
                   <h1>Edit Profile</h1>    

                   <div className='profileScreen__info'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" 
                    alt=""/>

                      <div className='profileScreen__details'>
                        <h2>{user.email}</h2>
                              <div className='profileScreen__plans'>
                                  <h3>Plans</h3>

                                  <PlansScreen/>
                                  
                                   <button onClick={()=> auth.signOut()}  //sign out from the screen
                                   className='profileScreen__signOut'>
                                   Sign Out</button>
                              </div>
                      </div>
                   </div>
            </div>
    </div>
  )
}

export default ProfileScreen
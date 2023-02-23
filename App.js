import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import {auth} from './screens/firebase'
import {useDispatch, useSelector} from 'react-redux'
import { logout, login, selectUser } from './features/userSlice';


function App() {
const user = useSelector(selectUser); //This is handled by Redux and will decide login/logout

const dispatch = useDispatch()

 // Adding state for staying logged in 
useEffect(()=>{ //it listens to state changed
  const unsubscribe = auth.onAuthStateChanged(userAuth=>{
    if (userAuth){  
      //if exists
      //Stay Logged In
      // console.log(userAuth) 
      dispatch(login({  // dispatching actions to store
        uid: userAuth.uid,
        email: userAuth.email
      }))
    }
    else{
      //Log out to Redux store dispatch
      dispatch(logout()) //defined in redux store
    }
  })
  return unsubscribe
},[])

  return (
    <div className="app">
     <BrowserRouter>
     {!user ? (<LoginScreen/>) :(  //of [no user login] then go to login screen else enter Homescreen
      <Routes>
        <Route exact path='/profile' element={<ProfileScreen/>}/>
        <Route exact path='/' element={<HomeScreen/>}/>
      </Routes>
     )}
        
     </BrowserRouter>
      
    </div>
  );
}

export default App;

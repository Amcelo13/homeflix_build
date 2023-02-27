import React, { useState } from 'react'
import './LoginScreen.css'
import SignupScreen from './SignupScreen'

function LoginScreen() {
  const [signIn, setsignIn] = useState(false)

  return (
    <div className='loginScreen'>

        <div className='loginScreen__background'>
            <img className='loginScreen__logo'
             src="https://i.pinimg.com/originals/84/8f/37/848f379bb2d5062b3ea67b90b2ab7a43.png" 
             alt=""/>

            <button onClick={()=> setsignIn(true)}
            className='loginScreen__button'>Sign In</button>

            <div className='loginScreen__gradient'/>
        </div>

        <div className='loginScreen__body'>
            {signIn ? (<SignupScreen/>)  :  (
            <>
            <h1>Unlimited Movies,TV and More.</h1>
            <h2>Watch from Home or Anywhere, Cancel at anytime</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership</h3>
             
            <div className='loginScreen__input'>
              <form>
                <input type="email" placeholder="Email Address" />
                 <button onClick={()=> setsignIn(true)}
                 className='loginScreen__getstarted'>GET STARTED &nbsp;&gt;</button>
              </form>
            </div>
            </>
            )}
           
        </div>

    </div>
  )
}

export default LoginScreen
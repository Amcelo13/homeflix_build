import './SignupScreen.css'
import React, { useRef } from 'react'
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

function SignInScreen() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const register= (e)=>{
    e.preventDefault()
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((authUser)=>{
          console.log(authUser)
    }).catch(err=>{
      alert(err.message)
    })
  }
  const signIn= (e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
    .then((authUser)=>{
      console.log(authUser)
    }).catch((err)=>{
      alert(err.message)
    })
  }
  return (
    <div className='signupScreen'>

      <form>
      <h1>Sign In</h1>
      <input type="email" placeholder='Email' ref={emailRef}/>
      <input type="password" placeholder='Password' ref={passwordRef}/>
      <button type="submit" onClick={signIn}>Sign In</button>

      <h4><span className='signupScreen__grey'>New to Homeflix? </span> 
       <span className='signupScreen__link' onClick={register}>Sign Up Now.</span></h4>
      </form>

    </div>
  )
}

export default SignInScreen
import React, { useState } from 'react'
import classes from './Signup.module.css'
import {AiOutlineFileImage} from 'react-icons/ai'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


const Signup = () => {
const [state, setState]=useState({})
const [photo, setPhoto]= useState({})
//const dispatch=useDispatch()
const navigate=useNavigate()
const handleState=(e)=>{
  setState(prev =>{
    return {...prev, [e.target.naem]: e.target.value}
  })
}
const handleSubmit =async(e)=>{
try{

}catch(error){

}
}

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder='Username...' onChange={handleState}/>
          <input type="email" name="email" placeholder='Email...' onChange={handleState}/>
          <label htmlFor='photo'>Upload Photo <AiOutlineFileImage/></label>
          <input id="photo" type="file" style={{display:'none'}} onChange={(e)=>setPhoto(e.target.files[0])}/>
          <input type="password" name="password" placeholder='password...' />
          <button type="submit"> Register</button>
          <p>Already have an account? 
            <Link to='/signin'>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup

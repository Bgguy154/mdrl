import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const LoginPage = () => {


const [loginData,setLogindata]=useState({
    username:'',
    password:''
})

//submit function 
const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:8000/login',loginData);
      console.log(response.data);
    }
    catch(error){
       console.error('Login error',error)
    }
    setLogindata({
        username:'',
        password:''
    })
}
const handleLoginChange = (e) =>{
    const {name,value}=e.target;
    setLogindata((prevData) =>({
        ...prevData,
        [name]:value
    }))
}
  return (
   <div>
    <h1>LoginPage</h1>
    <form onSubmit={handleLoginSubmit}>
        <input
        type='text'
        name='username'
        placeholder='Username'
        value={loginData.username}
        onChange={handleLoginChange}
        required
        />
        <input
        type='password'
        name='password'
        placeholder='Password'
        value={loginData.password}
        onChange={handleLoginChange}
        required
        />
        <button type='submit'>Login</button>
        <p>Not Registered Yet?
            <Link to ='/registration'>Register Here</Link>
        </p>
    </form>
    </div>
  )
}

export default LoginPage
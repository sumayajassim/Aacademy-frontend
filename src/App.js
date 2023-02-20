import React, {useEffect, useState} from 'react'
import './style.scss'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import Signup from './components/user/Signup'
import Signin from './components/user/Signin'
import Home from './components/Home'
import Navbar from './components/Navbar'
import axios from 'axios'
import jwt_decode from 'jwt-decode'


function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState()


  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(token != null){
      let userId = jwt_decode(token)
      if(userId){
        setIsAuth(true)
      }else if(!user){
        localStorage.removeItem("token")
        setIsAuth(false)
      }
    }
  },[])

  const registerHandler = (user) => {
    axios.post('http://localhost:4000/signup', user).then((res) =>{
      console.log(res)
    })
    console.log('registered!!')
  }


  const loginHandler = (user) => {
    try{
      axios.post('http://localhost:4000/login', user)
      .then((res) =>{
       if(res.data.token != null){
        localStorage.setItem('token', res.data.token)
        // let user = jwt_decode(res.data.token)
        setIsAuth(true)
       }
      })
    }catch(err){
      console.log(err);
    }
  }
  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={isAuth? <Home/> : <Signin loginHandler={loginHandler}/>}/>
          <Route path="/signup" element={<Signup registerHandler={registerHandler}/>}/>
          <Route path="/signin" element={<Signin loginHandler={loginHandler}/>}/>
        </Routes>
    </Router>
  )
}

export default App

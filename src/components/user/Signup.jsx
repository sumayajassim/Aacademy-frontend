import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [newUser, setNewUser] = useState({})
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate()

  const changeHandler = (e) => {
    const user = { ...newUser };
    user[e.target.name] = e.target.value;
    console.log(user);
    setNewUser(user);

    if(!user.name  || !user.email || !user.password){
      setDisabled(true)
    }else{
      setDisabled(false)
    } 
  }

  const submitHandler = (e) =>{
    e.preventDefault()
    props.registerHandler(newUser)
    navigate('/signin')
  }

  return (
    <div>
      <form className='form-container' onSubmit={submitHandler}>
        <input type="text" placeholder='name' name="name" onChange={changeHandler}/>
        <input type="email" placeholder='email' name="email" onChange={changeHandler}/>
        <input type="password" name="password" id="" onChange={changeHandler} />
        <button className="submit-button" disabled={disabled} type='submit'>Register!</button>
        <p className="signup-text">
                Already have an account? <a  href="/signin">Login</a>
        </p>
      </form>
    </div>
  )
}

export default Signup



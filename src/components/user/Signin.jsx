import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

function Signin(props) {
    const navigate = useNavigate()
    const [user,  setUser] = useState()
    const [disabled, setDisabled] = useState(true)

    const changeHandler = (e) => {
        const user_ = {...user}
        user_[e.target.name] = e.target.value;
        setUser(user_)
        if(user_.email  && user_.password ){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }

    const submitHandler = (e) => {
        console.log('login')
        e.preventDefault()
        props.loginHandler(user)
        navigate('/')
    }
  return (
    <div>
        <form className='form-container' onSubmit={submitHandler}>
            <input type="email" placeholder='email' name="email" onChange={changeHandler}/>
            <input type="password" name="password" id="" onChange={changeHandler} />
            <button className="submit-button" disabled={disabled} type='submit'>Login</button>
            <p className="signup-text">
                    Don't have an account? <a  href="/signup">Register</a>
            </p>
      </form>
    </div>
  )
}

export default Signin
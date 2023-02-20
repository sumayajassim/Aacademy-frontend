import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <Link to='/signup'>Signup</Link>&nbsp;&nbsp;
        <Link to='/signin'>Sign In</Link>
    </div>
  )
}

export default Navbar
import React from 'react'
import { Link } from 'react-router-dom'
import './Thankyou.css'

const Thankyou = () => {
  return (
      <div className="container">
        <h2>you have been registered to the class</h2>
        <h3>Thank you for using our system</h3>
        <div className="wrapper">
        <Link to='/' className="button2">Main page</Link>
        </div>
      </div>
  )
}

export default Thankyou
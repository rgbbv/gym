import React from 'react'
import { Link } from 'react-router-dom'

const Thankyou = () => {
  return (
    <div>
      <div className="container">
        <h2 className="center">you have been registered to the class</h2>
        <p>Thank you for using our system</p>
        <li><Link to='/'>Main page</Link></li>
      </div>
    </div>
  )
}

export default Thankyou
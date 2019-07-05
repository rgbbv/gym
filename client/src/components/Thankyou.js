import React from 'react'
import { Link } from 'react-router-dom'

const Thankyou = () => {
  return (
    <div>
      <div className="container">
        <h4 className="center">Thank you for using our system</h4>
        <li><Link to='/'>Main page</Link></li>
      </div>
    </div>
  )
}

export default Thankyou
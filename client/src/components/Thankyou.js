import React from 'react'
import { Link } from 'react-router-dom'
import './Thankyou.css'

const Thankyou = () => {
  return (
    <div className="jumbotron text-xs-center">
      <h1 className="display-3">Thank You!</h1>
      <p className="lead"><strong>We will notify you by email</strong> if a spot has opened up in the class.</p>
      <hr/>
      <p className="lead">
        <Link className="btn" to='/' role="button">Return to registration</Link>
      </p>
    </div>
  )
}

export default Thankyou
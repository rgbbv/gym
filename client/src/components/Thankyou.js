import React from 'react'
import { Link } from 'react-router-dom'
import './Thankyou.css'

const Thankyou = () => {
  return (
    <div className="jumbotron text-xs-center">
      <h1 className="display-3">Thank You!</h1>
      <p className="lead"><strong>Please check your email</strong> for further instructions on how to complete your account setup.</p>
      <hr/>
      <p className="lead">
        <Link className="btn" to='/' role="button">Continue to homepage</Link>
      </p>
    </div>
  )
}

export default Thankyou
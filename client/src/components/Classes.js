import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClasses, startLogin, finishedLogin, getPressed } from '../actions/classActions';
import Table from './Table'
import store from '../store'
import './Classes.css'

const request = require("request");

class Classes extends React.Component {
  state = { name: '', email: ''}

  componentWillMount() {
    this.props.getPressed()
    this.props.getClasses()
    this.props.startLogin()
  }


  onChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  onChangeName(event) {
    this.setState({name: event.target.value})
  }

  idGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

  login = () => {
    var name = this.state.name
    var email = this.state.email
    if (name.length === 0 || email.length === 0) {
      alert('please make sure you filled both fields before pressing login');
    }
    else if (!email.includes('@') || !email.split('@')[1].includes('.')) {
      alert('please enter a real email')
    }
    else {
      var userIdKey = 'currentUserId'
      var currentUserId = localStorage.getItem(userIdKey) || this.idGenerator()
      localStorage.setItem(userIdKey, currentUserId)
      request.post("http://localhost:3333/login",
      {form:{ id: currentUserId, name: name, email: email}},
      function(error, response, body) {
      if (error) { throw error }
      else {
      }
      })
      this.props.finishedLogin()
      this.setState({name: '', email: ''})
    }
  }

render() {
  var checkLogin = store.getState().classes.loggedIn
  if (!checkLogin) {
    return (
      <div class="welcomer">
        <h4>Welcome to the gym system</h4>
        
        <form class="form">
          <input type="text" placeholder="Username" onChange={this.onChangeName.bind(this)}
         value={this.state.name}/>
          <input type="email" placeholder="Email" onChange={this.onChangeEmail.bind(this)}
         value={this.state.email}/>
          <button onClick={this.login.bind(this)} type="submit" id="login-button">Login</button>
        </form>
      </div>
    )
  }
  while (store.getState().loading) {}
    return (
      <div>
        <header>
          <h1>Registration system</h1>
        </header>
        <Table table={this.props.classes} />
      </div>
    )
}
}


Classes.propTypes = {
  getPressed: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired,
  startLogin: PropTypes.func.isRequired,
  finishedLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  register: state.register,
  wait: state.wait,
  classes: state.classes,
  participants: state.participants,
});

export default connect(mapStateToProps, { getClasses, startLogin, finishedLogin, getPressed })(Classes);
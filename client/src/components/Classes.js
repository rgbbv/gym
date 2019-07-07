import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClasses, startLogin, finishedLogin } from '../actions/classActions';
import Table from './Table'
import store from '../store'

const request = require("request");

class Classes extends React.Component {
  state = { name: '', email: ''}
  componentWillMount() {
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

render() {
  var checkLogin = store.getState().classes.loggedIn
  if (!checkLogin) {
    return (
      <div>
        <h1>Welcome to the gym system</h1>
        <input type="text" placeholder="enter username" onChange={this.onChangeName.bind(this)}
         value={this.state.name}/>
        <input type="text" placeholder="enter email" onChange={this.onChangeEmail.bind(this)}
         value={this.state.email}/>
        <button onClick={this.login.bind(this)} type="submit">login</button>
      </div>
    )
  }
    return (
      <div>
        <h1>Registration system</h1>
        <Table table={this.props.classes} />
      </div>
    )
}
}


Classes.propTypes = {
  getClasses: PropTypes.func.isRequired,
  startLogin: PropTypes.func.isRequired,
  finishedLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  classes: state.classes,
  participants: state.participants
});

export default connect(mapStateToProps, { getClasses, startLogin, finishedLogin  })(Classes);
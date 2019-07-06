import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClasses, putId } from '../actions/classActions';
import Table from './Table'

const request = require("request");

class Classes extends Component {
  state = { loggedIn: false, name: '', email: ''}

  componentWillMount() {
    this.props.getClasses()
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
     if (error) { throw error
     }
     else {
       alert(response.body)
     }
    })
    this.setState({loggedIn: true, name: '', email: ''})
  }

render() {
  if (!this.state.loggedIn) {
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
        <h1>classes</h1>
        <Table table={this.props.classes} />
      </div>
    )
}
}


Classes.propTypes = {
  getClasses: PropTypes.func.isRequired,
  putId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  classes: state.classes,
  registered: state.registered
});

export default connect(mapStateToProps, { getClasses, putId })(Classes);
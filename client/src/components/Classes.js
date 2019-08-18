import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchClasses, fetchParticipants } from '../actions/registrationActions';
import { fetchInstructors } from '../actions/instructorsActions';
import { checkLogin, putId } from '../actions/loginActions'
import Table from './Table'
import './Classes.css'

class Classes extends React.Component {
  state = { name: '', email: ''}

  componentWillMount() {
    this.props.fetchParticipants()
    this.props.fetchClasses()
    this.props.checkLogin()
    this.props.fetchInstructors()
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
      this.props.putId();
      this.setState({name: '', email: ''})
    }
  }

render() {
  var checkLogin = this.props.login.loggedIn
  if (!checkLogin) {
    return (
      <div className="welcomer">
        <h4>Welcome to the gym system</h4>
        
        <form className="form">
          <input type="text" placeholder="Username" onChange={this.onChangeName.bind(this)}
         value={this.state.name}/>
          <input type="email" placeholder="Email" onChange={this.onChangeEmail.bind(this)}
         value={this.state.email}/>
          <button onClick={this.login.bind(this)} type="submit" id="login-button">Login</button>
        </form>
      </div>
    )
  }
    return (
      <div>
        <header>
          <h1>Registration system</h1>
        </header>
        <Table classes={this.props.classes} amountRegistered={this.props.amountRegistered}
        userRegistered={this.props.userRegistered} userWaiting={this.props.userWaiting} />
      </div>
    )
}
}


Classes.propTypes = {
  fetchParticipants: PropTypes.func.isRequired,
  fetchClasses: PropTypes.func.isRequired,
  checkLogin: PropTypes.func.isRequired,
  putId: PropTypes.func.isRequired,
  fetchInstructors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  classes: state.registration.classes,
  amountRegistered: state.registration.amountRegistered,
  instructors: state.instructors,
  login: state.login,
  userRegistered: state.registration.userRegistered,
  userWaiting: state.registration.userWaiting
});

export default connect(mapStateToProps, { fetchClasses, checkLogin, putId, fetchParticipants, fetchInstructors })(Classes);
import React from 'react'
import Login from './Login'
import './Home.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/loginActions'
import RegistrationPage from './RegistrationPage';

class Home extends React.Component {

  componentWillMount() {
    this.props.checkLogin()
  }

  render() {
    var isLoggedIn = this.props.login.loggedIn
    if (isLoggedIn) {
      return (
        <RegistrationPage />
      )
    }
    else {
      return (
        <div>
          <Login />
        </div>
      )
    }
  }
}

Home.propTypes = {
  checkLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  login: state.login,
});

export default connect(mapStateToProps, { checkLogin })(Home);
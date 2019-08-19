import React from 'react'
import './Home.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { putId } from '../actions/loginActions'

class Login extends React.Component {
    state = { name: '', email: ''}

    idGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

    onChangeEmail(event) {
        this.setState({email: event.target.value});
      }
    
      onChangeName(event) {
        this.setState({name: event.target.value})
      }    

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
      }
    }

    render () {
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
}

Login.propTypes = {
    putId: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    login: state.login,
  });
  
  export default connect(mapStateToProps, { putId })(Login);
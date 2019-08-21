import React from 'react'
import './Login.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { putId } from '../actions/loginActions'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { debug } from '../topology'

class Login extends React.Component {
    state = { name: '', email: '', debug: ''}
    

    idGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }
    
    onChangeName(event) {
        this.setState({name: event.target.value});
    }
    
    onChangedebug(event) {
      this.setState({debug: event.target.value});
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

    enter = () => {
      var id = this.state.debug
      this.props.putId(id);
    }

    render () {
        if (debug) {
          return (
            <div id="welcomer">
                <h1>Welcome to the gym system</h1>
                <form className="form">
                  <TextField id="outlined-debug" label="Debug" value={this.state.debug}
                    onChange={this.onChangedebug.bind(this)} margin="dense" variant="outlined" />
                <Button onClick={this.enter.bind(this)} variant="contained" color="primary"
                id='button'>enter</Button>
                </form>
            </div>
          )
        }
        return (
            <div id="welcomer">
                <h1>Welcome to the gym system</h1>
                <form className="form">
                  <TextField id="outlined-name" label="Username" value={this.state.name}
                    onChange={this.onChangeName.bind(this)} margin="dense" variant="outlined" />
                  <TextField id="outlined-email" label="Email" value={this.state.email}
                    onChange={this.onChangeEmail.bind(this)} margin="dense" variant="outlined" />
                <Button onClick={this.login.bind(this)} variant="contained" color="primary"
                id='button'>Login</Button>
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
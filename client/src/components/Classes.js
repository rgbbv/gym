import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchClasses, fetchParticipants } from '../actions/registrationActions';
import { fetchInstructors } from '../actions/instructorsActions';
import Table from './Table'
import './Classes.css'

class Classes extends React.Component {

  componentWillMount() {
    this.props.fetchParticipants()
    this.props.fetchClasses()
    this.props.fetchInstructors()
  }

  render() {
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

export default connect(mapStateToProps, { fetchClasses, fetchParticipants, fetchInstructors })(Classes);
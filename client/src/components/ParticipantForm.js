import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addParticipant } from '../actions/classActions';

class participantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      email: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const participant = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email
    };

    this.props.addParticipant(participant);
  }

  render() {
    return (
      <div>
        <h1>Add Participant</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>class id: </label>
            <br />
            <input
              type="text"
              name="classId"
              onChange={this.onChange}
              value={this.state.id}
            />
          </div>
          <br />
          <div>
            <label>Full name: </label>
            <br />
            <textarea
              name="PartName"
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>
          <br />
          <div>
            <label>Email: </label>
            <br />
            <input
              type="text"
              name="Email"
              onChange={this.onChange}
              value={this.state.email}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

participantForm.propTypes = {
  addParticipant: PropTypes.func.isRequired
};

export default connect(null, { addParticipant })(participantForm);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClasses } from '../actions/classActions';
import Table from './Table'

class Classes extends Component {
  componentWillMount() {
    this.props.getClasses();
  }

 /* componentWillReceiveProps(nextProps) {
    if (nextProps.newParticipant) {
      this.props.classes.push
    }
  }*/


render() {
    return (
      <div>
        <h1>classes</h1>
      </div>
    )
}
}


Classes.propTypes = {
  getClasses: PropTypes.func.isRequired,
  newParticipant: PropTypes.object
};

const mapStateToProps = state => ({
  classes: state.classes,
  newParticipant: state.participant
});

export default connect(mapStateToProps, { getClasses })(Classes);
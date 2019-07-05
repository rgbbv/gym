import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClasses } from '../actions/classActions';
import Table from './Table'

class Classes extends Component {

  componentWillMount() {
    this.props.getClasses()
  }



render() {
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
};

const mapStateToProps = state => ({
  classes: state.classes
});

export default connect(mapStateToProps, { getClasses })(Classes);
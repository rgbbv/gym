import React from 'react'
import ClassesTable from './ClassesTable'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClasses } from '../actions/classActions';
import store from '../store';

const componentWillMount = () => {
    store.dispatch(getClasses)
  }

const ClassesPage = () => {
    componentWillMount()
    return (
        <div>
          <div className="App">
            <header className="My Gym">
              <ClassesTable />
            </header>
          </div>
        </div>
      )
}

ClassesPage.propTypes = {
    getClasses: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = state => ({
    classes: state.classes,
  });
  
export default connect(mapStateToProps, { getClasses })(ClassesPage);
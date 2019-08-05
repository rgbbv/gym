import React from 'react'
import {omit} from 'lodash'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClasses } from '../actions/classActions';
import store from '../store';

class ClassesTable extends React.Component {

 renderTableHeader() {
    console.log(store.getState())
    var classes = store.getState().classes.classes
    if (classes.length === 0) return 'loading...'
    let header = Object.keys(omit(classes[0], ['id',  'maxNumOfParticipants', 'day', 'hour', 'instructor']))
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }
 
 renderTableData() {
    var classes = store.getState().classes.classes
    if (classes === null) return ''
    return classes.map((cell, index) => {
       const { id, name, description, price, duration } = cell //destructuring
         return (
            <tr key={id}>
               <td>{name}</td>
               <td>{description}</td>
               <td>{price}</td>
               <td>{duration}</td>
            </tr>
         )
     })
 }

render() {

    return (
       <div>
          <table id='classes'>
             <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
             </tbody>
          </table>
       </div>
    )
 }
}

ClassesTable.propTypes = {
    getClasses: PropTypes.func.isRequired,
  };

const mapStateToProps = state => ({
    classes: state.classes,
});

export default connect(mapStateToProps, { getClasses })(ClassesTable);
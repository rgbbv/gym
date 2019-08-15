import React from 'react'
import {omit} from 'lodash'
import store from '../store';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInstructors } from '../actions/classActions';

class InstructorsTable extends React.Component {

   componentWillMount() {
      if(!store.getState().classes.instructors) {
         this.props.getInstructors()
      }
    }

 renderTableHeader() {
    var instructors = store.getState().classes.instructors
    let header = Object.keys(omit(instructors[0], ['id']))
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }
 
 renderTableData() {
    var instructors = store.getState().classes.instructors
    if (instructors === null) return ''
    return instructors.map((cell, index) => {
       const { id, name, background } = cell //destructuring
         return (
            <tr key={id}>
               <td>{name}</td>
               <td>{background}</td>
            </tr>
         )
     })
 }

render() {
    while (store.getState().classes.loading_instructors) {}
    console.log(store.getState())
    return (
       <div>
          <table id='instructors'>
             <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
             </tbody>
          </table>
       </div>
    )
 }
}

InstructorsTable.propTypes = {
   getInstructors: PropTypes.func.isRequired,
 };
 
const mapStateToProps = state => ({
   instructors: state.instructors,
 });
 
export default connect(mapStateToProps, { getInstructors })(InstructorsTable);
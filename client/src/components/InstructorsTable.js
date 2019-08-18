import React from 'react'
import {omit} from 'lodash'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchInstructors } from '../actions/instructorsActions';

class InstructorsTable extends React.Component {

   componentWillMount() {
      this.props.fetchInstructors()
    }

 renderTableHeader() {
    var instructors = this.props.instructors
    let header = Object.keys(omit(instructors[0], ['id']))
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }
 
 renderTableData() {
    var instructors = this.props.instructors
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

InstructorsTable.propTypes = {
   fetchInstructors: PropTypes.func.isRequired,
   instructors: PropTypes.array.isRequired
 };
 
const mapStateToProps = state => ({
   instructors: state.instructors.instructors,
 });
 
export default connect(mapStateToProps, { fetchInstructors })(InstructorsTable);
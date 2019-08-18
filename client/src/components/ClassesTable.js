import React from 'react'
import {omit} from 'lodash'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchClasses } from '../actions/registrationActions';

class ClassesTable extends React.Component {

   componentWillMount() {
      this.props.fetchClasses()
   }

 renderTableHeader() {
    var classes = this.props.classes
    let header = Object.keys(omit(classes[0], ['id',  'maxNumOfParticipants', 'day', 'hour', 'instructor']))
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }
 
 renderTableData() {
    var classes = this.props.classes
    if (classes === null) return ''
    return classes.map((cell, index) => {
       const { id, name, description, price, duration } = cell //destructuring
         return (
            <tr key={id}>
               <td>{name}</td>
               <td>{description}</td>
               <td>{duration}</td>
               <td>{price}</td>
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
   fetchClasses: PropTypes.func.isRequired,
   classes: PropTypes.array.isRequired,
 };
 
const mapStateToProps = state => ({
   classes: state.registration.classes,
 });
 
export default connect(mapStateToProps, { fetchClasses })(ClassesTable);
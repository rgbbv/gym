import React from 'react'
import {omit} from 'lodash'
import store from '../store';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getClasses } from '../actions/classActions';

class ClassesTable extends React.Component {

   componentWillMount() {
      if(!store.getState().classes.classes) {
         this.props.getClasses()
      }
    }


 renderTableHeader() {
    var classes = store.getState().classes.classes
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
               <td>{duration}</td>
               <td>{price}</td>
            </tr>
         )
     })
 }

render() {
    while (store.getState().classes.loading_classes) {}
    console.log(store.getState())
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
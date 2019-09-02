import React from 'react'
import { omit, includes, map, find } from 'lodash'
import { register, addToWaitingList, leaveWaitingList,
   unregister, fetchParticipants, fetchClasses } from '../actions/registrationActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import './RegistrationTable.css'
import moment from 'moment'
import RegistrationTableItem from './RegistrationTableItem'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class RegistrationTable extends React.Component {
   state = { showFullWeek: true }

 renderTableHeader() {
    let header = Object.keys(omit(this.props.classes[0], ['id', 'description',
    'duration', 'maxNumOfParticipants']))
    header.push('date')
    header.push('spots left')
    header.push(' ')
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

changeButton = (showFullWeek) => {
  this.setState( {showFullWeek: !showFullWeek})
  showFullWeek ? this.props.fetchClasses(moment().day()) : this.props.fetchClasses() 

}

isFullAfterUnregister = (unregistered, courseId) => {
  return unregistered.courseId === courseId ?  unregistered.isFull : false
}

isCourseIdIncluded = (courseList, courseId) => {
  return includes(map(courseList, 'courseId'), courseId.toString())
}

amountRegisteredToClass = (amountRegistered, courseId) => {
  return find(amountRegistered, ['courseId', courseId.toString()]).count
} 

getDate = (day, hour) => {
  var classDate = moment().day(day)
  classDate.set('hours', hour.substring(0,2))
  classDate.set('minutes', hour.substring(3,5))
  return moment().endOf('day').isAfter(classDate) ? classDate.add(7, 'day') : classDate
}

 sortClasses(aClass, bClass) {
   const aDate = this.getDate(aClass.day, aClass.hour)
   const bDate = this.getDate(bClass.day, bClass.hour)
   var dif = aDate.isAfter(bDate) ? 1: -1
   return dif
 }

 renderTableData() {
    var classes = this.props.classes
    const sortedClasses = classes.sort((a, b) => this.sortClasses(a,b)) 
    return sortedClasses.map((cell, index) => {
         return (this.renderTableCell(cell))
     })
 }

 renderTableCell(cell) {
   const courseId = cell.id
   const alreadyRegistered = this.isCourseIdIncluded(this.props.userRegistered, courseId)
   const alreadyWaiting = this.isCourseIdIncluded(this.props.userWaiting, courseId)
   const amountRegistered = this.amountRegisteredToClass(this.props.amountRegistered, courseId)
   const isFullAfterUnregister = this.isFullAfterUnregister(this.props.unregistered, courseId)
   return (
      <RegistrationTableItem class={cell} key={courseId}
       alreadyRegistered={alreadyRegistered} alreadyWaiting={alreadyWaiting}
       amountRegistered={amountRegistered} isFullAfterUnregister={isFullAfterUnregister} />
   )
 }

 render() {
    return (
      <div>
       <div className='view'>
        <Grid item>
          <ButtonGroup variant="contained" size="medium" aria-label="small contained button group">
            <Button disabled={this.state.showFullWeek}
             onClick={this.changeButton.bind(this, this.state.showFullWeek)}>full week</Button>
            <Button disabled={!this.state.showFullWeek}
             onClick={this.changeButton.bind(this, this.state.showFullWeek)}>until the weekend</Button>
          </ButtonGroup>
        </Grid>
       </div>
        <div>
          <table id='classes'>
             <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
             </tbody>
          </table>
        </div>
      </div>
    )
 }
}

RegistrationTable.propTypes = {
   register: PropTypes.func.isRequired,
   addToWaitingList: PropTypes.func.isRequired,
   unregister: PropTypes.func.isRequired,
   fetchParticipants: PropTypes.func.isRequired,
   leaveWaitingList: PropTypes.func.isRequired,
 };

 const mapStateToProps = state => ({
  userRegistered: state.registration.userRegistered,
  userWaiting: state.registration.userWaiting,
  classes: state.registration.classes,
  amountRegistered: state.registration.amountRegistered,
  unregistered: state.registration.unregistered
});

 
 export default connect(mapStateToProps,
   { register, addToWaitingList, leaveWaitingList,
     unregister, fetchParticipants, fetchClasses })(withRouter(RegistrationTable));
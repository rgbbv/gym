import React from 'react'
import {omit, sortBy } from 'lodash'
import { addParticipant } from '../actions/classActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import './Table.css'
import store from '../store';
import moment from 'moment'

const request = require("request");

class Table extends React.Component {
   state = { email: [], register: [], wait: [] }


 register = (courseId) => {
   var userIdKey = 'currentUserId'
   var currentId = localStorage.getItem(userIdKey)
   this.props.addParticipant(currentId, courseId, this.props.history)
 }

 

 waitingRegister = (courseId) => {
  var userIdKey = 'currentUserId'
  var currentId = localStorage.getItem(userIdKey)
  request.post("http://localhost:3333/enterWaitingList",
    {form:{ participantId: currentId, courseId: courseId}},
    function(error, response, body) {
    if (error) {
      alert('currently we are unable to add you to the waiting list. please try later')
    }
    else {
      alert(response.body)
    }
  })
  this.setState({email: ''})
  window.location.reload();
 }


 renderTableHeader() {
    if (this.props.table.classes.length === 0) return 'loading...'
    let header = Object.keys(omit(this.props.table.classes[0], ['id', 'description',
    'duration', 'maxNumOfParticipants']))
    header.push('date')
    header.push('spots left')
    header.push(' ')
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

registered = (id) => {
 return this.props.table.participants.reduce((acc, cur) =>  acc += cur.courseId === id.toString() ? cur.count : 0 , 0)
}

getDate = (day) => {
  var classDay = moment().day(day);
  if (moment(classDay).isAfter()) {
    return classDay.format("DD/MM/YY")
  }
  return classDay.add(7, 'day').format("DD/MM/YY")
}

dayMaker = (day) => {
  switch(day) {
    case '0':
      return 'Sunday'
    case '1':
      return 'Monday'
    case '2':
      return 'Tuesday'
    case '3':
      return 'Wednesday'
    case '4':
      return 'Thursday'
    case '5':
      return 'Friday'
    case '6':
      return 'Saturday'
    default:
      return 'error'
  }
}

isRegistered = (courseId, freeSpace) => {
    while (!store.getState().classes.ready_pressed ) {}
    var alreadyRegistered = this.props.table.register.reduce((acc,cur) => acc||(cur.courseId === courseId.toString()), false)
    var alreadyWaiting = this.props.table.wait.reduce((acc,cur) => acc||(cur.courseId === courseId.toString()), false)
    if (!alreadyRegistered && !alreadyWaiting) {
      if (freeSpace) {
        return <button className="button" onClick={this.register.bind(this, courseId)}
        type="submit">register</button>
      }
      else {
        return <button className="button"
        onClick={this.waitingRegister.bind(this, courseId)}
        type="submit">enter waiting list</button>
      }
    }
   return alreadyRegistered ? 'Already registered' : 'Already on the waiting list'
  }

 compareClasses(aClass, bClass) {
   var aDate = this.getDate(this.dayMaker(aClass.day))
   var bDate = this.getDate(this.dayMaker(bClass.day))
   var aSplit = aDate.split('/');
   var bSplit = bDate.split('/');
   var dif = aSplit[2] - bSplit[2]
   if (dif !== 0) return dif
   dif = aSplit[1] - bSplit[1]
   if (dif !== 0) return dif
   dif = aSplit[0] - bSplit[0]
   if (dif !== 0) return dif
   return aClass.hour - bClass.hour
 }

 renderTableData() {
    if (this.props.table === null) return ''
    var classes = this.props.table.classes
    let sortedClasses = classes.sort((a, b) => this.compareClasses(a,b)) 
    return sortedClasses.map((cell, index) => {
       const { id, name, price, maxNumOfParticipants,
         instructor, day, hour } = cell //destructuring
         var currentlyRegistered = this.registered(id)
         var alreadyPressed = store.getState().pressed
         var freeSpace = maxNumOfParticipants-currentlyRegistered
         return (
            <tr key={id}>
               <td>{name}</td>
               <td>{instructor}</td>
               <td>{price}</td>
               <td>{hour.substring(0,5)}</td>
               <td>{this.dayMaker(day)}</td>
               <td>{this.getDate(this.dayMaker(day))}</td>
               <td>{maxNumOfParticipants-currentlyRegistered+'/'+maxNumOfParticipants}</td>
               <td id='regisButton'>{this.isRegistered(id, freeSpace, alreadyPressed)}</td>
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

Table.propTypes = {
   addParticipant: PropTypes.func.isRequired
 };

 
 export default connect(null, { addParticipant })(withRouter(Table));
import React from 'react'
import { omit } from 'lodash'
import { addParticipant, addToWaitingList } from '../actions/registrationActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import './Table.css'
import moment from 'moment'

class Table extends React.Component {
   state = { email: [], register: [], wait: [] }


 register = (courseId) => {
   this.props.addParticipant(courseId, this.props.history)
 }

 

 addToWaitingList = (courseId) => {
   this.props.addToWaitingList(courseId)
   this.setState({email: ''})
 }


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

registered = (id) => {
 return this.props.amountRegistered.reduce((acc, cur) =>  acc += cur.courseId === id.toString() ? cur.count : 0 , 0)
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
    var alreadyRegistered = this.props.userRegistered.reduce((acc,cur) =>
     acc||(cur.courseId === courseId.toString()), false)
    var alreadyWaiting = this.props.userWaiting.reduce((acc,cur) =>
     acc||(cur.courseId === courseId.toString()), false)
    if (!alreadyRegistered && !alreadyWaiting) {
      if (freeSpace) {
        return <button className="button" onClick={this.register.bind(this, courseId)}
        type="submit">register</button>
      }
      else {
        return <button className="button"
        onClick={this.addToWaitingList.bind(this, courseId)}
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
    var classes = this.props.classes
    let sortedClasses = classes.sort((a, b) => this.compareClasses(a,b)) 
    return sortedClasses.map((cell, index) => {
       const { id, name, price, maxNumOfParticipants,
         instructor, day, hour } = cell //destructuring
         var currentlyRegistered = this.registered(id)
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
               <td id='regisButton'>{this.isRegistered(id, freeSpace)}</td>
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
   addParticipant: PropTypes.func.isRequired,
   addToWaitingList: PropTypes.func.isRequired,
 };

 
 export default connect(null, { addParticipant, addToWaitingList })(withRouter(Table));
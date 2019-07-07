import React from 'react'
import {omit} from 'lodash'
import { addParticipant } from '../actions/classActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"

const request = require("request");

class Table extends React.Component {
   state = { email: [] }

 register = (courseId) => {
   var userIdKey = 'currentUserId'
   var currentId = localStorage.getItem(userIdKey)
   this.props.addParticipant(currentId, courseId, this.props.history)
 }

 

 waitingRegister = (courseId) => {
    var participantId = this.props.table.id
    var email = this.state.email
    request.post("http://localhost:3333/waiting",
     {form:{ participantId: participantId, courseId: courseId, email: email}},
     function(error, response, body) {
     if (error) {
       alert('currently we are unable to add you to the waiting list. please try later')
     }
     else {
       alert(response.body)
     }
   })
   this.setState({email: ''})
 }


 renderTableHeader() {
    if (this.props.table.classes.length === 0) return 'loading...'
    let header = Object.keys(omit(this.props.table.classes[0], ['id', 'maxNumOfParticipants']))
    header.push('spots left')
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

registered = (id) => {
 return this.props.table.participants.reduce((acc, cur) =>  acc += cur.courseId === id ? cur.count : 0 , 0)
}

dayMaker = (day) => {
  switch(day) {
    case 1:
      return 'Monday'
    case 2:
      return 'Tuesday'
    case 3:
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday'
    default:
      return 'Sunday'
  }
}
 renderTableData() {
    if (this.props.table === null) return ''
    return this.props.table.classes.map((cell, index) => {
       const { id, name, description, price, duration, maxNumOfParticipants,
         instructor, day, hour } = cell //destructuring
         var currentlyRegistered = this.registered(id)
       if (maxNumOfParticipants-currentlyRegistered) {
         return (
            <tr key={id}>
               <td>{name}</td>
               <td>{description}</td>
               <td>{instructor}</td>
               <td>{price}</td>
               <td>{duration}</td>
               <td>{this.dayMaker(day)}</td>
               <td>{hour.substring(0,5  )}</td>
               <td>{maxNumOfParticipants-currentlyRegistered+'/'+maxNumOfParticipants}</td>
               <button onClick={this.register.bind(this, id)} type="submit">register</button>
            </tr>
         )
       }
       return (
            <tr key={id}>
               <td>{name}</td>
               <td>{description}</td>
               <td>{instructor}</td>
               <td>{price}</td>
               <td>{duration}</td>
               <td>{day}</td>
               <td>{hour.substring(0,5  )}</td>
             <td>{maxNumOfParticipants-currentlyRegistered+'/'+maxNumOfParticipants}</td>
             <button onClick={this.waitingRegister.bind(this, id)} type="submit">enter waiting list</button>
          </tr>
       )
    })
 }
 render() {

    return (
       <div>
          <h1 id='title'>Classes</h1>
          <table id='Gym'>
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
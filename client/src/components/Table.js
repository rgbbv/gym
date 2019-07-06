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
   var participantId = this.props.table.id
   this.props.addParticipant(participantId, courseId, this.props.history)
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
    let header = Object.keys(omit(this.props.table.classes[0], ['id', 'maxParticipants', 'currentlyRegistered']))
    header.push('spots left')
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

 onChange(event) {
   this.setState({email: event.target.value});
 }


 renderTableData() {
    if (this.props.table === null) return ''
    return this.props.table.classes.map((cell, index) => {
       const { id, title, day, hour, duration, maxParticipants, currentlyRegistered } = cell //destructuring
       if (maxParticipants-currentlyRegistered) {
         return (
            <tr key={id}>
               <td>{title}</td>
               <td>{day}</td>
               <td>{hour}</td>
               <td>{duration}</td>
               <td>{maxParticipants-currentlyRegistered+'/'+maxParticipants}</td>
               <button onClick={this.register.bind(this, id)} type="submit">register</button>
            </tr>
         )
       }
       return (
          <tr key={id}>
             <td>{title}</td>
             <td>{day}</td>
             <td>{hour}</td>
             <td>{duration}</td>
             <td>{maxParticipants-currentlyRegistered+'/'+maxParticipants}</td>
             <button onClick={this.waitingRegister.bind(this, id)} type="submit">enter waiting list</button>
             <input type="text" placeholder="enter email" onChange={this.onChange.bind(this)} value={this.state.email}
            />
          </tr>
       )
    })
 }
 render() {

    return (
       <div>
          <h1 id='title'>React Dynamic Table</h1>
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
   joinWaitingList: PropTypes.func.isRequired
 };

 
 export default connect(null, { addParticipant })(withRouter(Table));
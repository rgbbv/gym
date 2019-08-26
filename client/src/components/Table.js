import React from 'react'
import { omit } from 'lodash'
import { register, addToWaitingList, leaveWaitingList,
   unregister, fetchParticipants, fetchClasses } from '../actions/registrationActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import './Table.css'
import moment from 'moment'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

var tealTheme = createMuiTheme({ palette: { primary: { main: '#26a69a'} } })

class Table extends React.Component {
   state = { showFullWeek: true }

 register = (courseId) => {
   this.props.register(courseId, this.props.history)
 } 

 addToWaitingList = (courseId) => {
   this.props.addToWaitingList(courseId)
 }

 unregister = (courseId) => {
   this.props.unregister(courseId)
 }

 leaveWaitingList = (courseId) => {
   this.props.leaveWaitingList(courseId)
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

changeButton = (showFullWeek) => {
  this.setState( {showFullWeek: !showFullWeek})
  showFullWeek ? this.props.fetchClasses(moment().day()) : this.props.fetchClasses() 

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
      var isFull = false
      var unregistered = this.props.unregistered
      if (unregistered){
        isFull = (unregistered.courseId === courseId) ? unregistered.isFull : false
      }
      if (freeSpace && !isFull) {
        return <ThemeProvider theme={tealTheme}>
                 <Button variant="contained" color="primary" size='small'
        onClick={this.register.bind(this, courseId)}
        >register</Button>
                </ThemeProvider>
      }
      else {
        return <ThemeProvider theme={tealTheme}>
        <Button variant="contained" color="primary" size='small'
        onClick={this.addToWaitingList.bind(this, courseId)}
        >enter waiting list</Button>
               </ThemeProvider>
      }
    }
   if (!alreadyRegistered) {
    return <Button variant="contained" size='small'
    onClick={this.leaveWaitingList.bind(this, courseId)}>leave waiting list</Button>
   }
   else {
      return <Button variant="contained" size='small'
      onClick={this.unregister.bind(this, courseId)}>cancel registration</Button>
   }
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

Table.propTypes = {
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
     unregister, fetchParticipants, fetchClasses })(withRouter(Table));
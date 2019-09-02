import React from 'react'
import Button from '@material-ui/core/Button';
import { register, addToWaitingList, leaveWaitingList,
    unregister, fetchParticipants, fetchClasses } from '../actions/registrationActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import moment from 'moment'
import { withRouter } from "react-router-dom"

var tealTheme = createMuiTheme({ palette: { primary: { main: '#26a69a' } } })

class RegistrationTableItem extends React.Component {


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

    getDate = (day) => {
        var classDay = moment().day(day)
        return moment(classDay).isAfter() ? classDay.format("DD/MM/YY") : classDay.add(7, 'day').format("DD/MM/YY")
    }

    dayMaker = (day) => {
        switch (day) {
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

    classStates = {
        AVAILABLE: 'available',
        REGISTERED: 'registered',
        FULL: 'full',
        REGISTERED_TO_WL: 'registered_to_wl'
    }

    getClassState = (hasFreeSpots) => {
        const alreadyRegistered = this.props.alreadyRegistered
        const alreadyWaiting = this.props.alreadyWaiting

        if (alreadyRegistered) {
            return this.classStates.REGISTERED
        }

        if (alreadyWaiting) {
            return this.classStates.REGISTERED_TO_WL
        }

        return hasFreeSpots ? this.classStates.AVAILABLE : this.classStates.FULL
    }

    getUnregisteredButton = (onClick, text) =>
        <Button variant="contained" size='small' onClick={onClick}>{text}</Button>

    getRegisterButton = (onClick, text) =>
        <ThemeProvider theme={tealTheme}>
            <Button variant="contained" color="primary" size='small' onClick={onClick}>{text}</Button>
        </ThemeProvider>

    getRelevantButton = (freeSpotsInClass) => {
        const courseId = this.props.class.id
        const isFullAfterUnregister = this.props.isFullAfterUnregister
        const hasFreeSpots = !isFullAfterUnregister && !!freeSpotsInClass
        const classState = this.getClassState(hasFreeSpots)

        switch (classState) {
            case this.classStates.REGISTERED:
                return this.getUnregisteredButton(this.unregister.bind(this, courseId), 'cancel registration')
            case this.classStates.REGISTERED_TO_WL:
                return this.getUnregisteredButton(this.leaveWaitingList.bind(this, courseId), 'leave waiting list')
            case this.classStates.FULL:
                return this.getRegisterButton(this.addToWaitingList.bind(this, courseId), 'enter waiting list')
            case this.classStates.AVAILABLE:
                return this.getRegisterButton(this.register.bind(this, courseId), 'register')
            default:
                return <Button>error</Button>
        }
    }

    renderTableData() {
        const singleClass = this.props.class
        const { id, name, price, maxNumOfParticipants, instructor, day, hour } = singleClass //destructuring
        const currentlyRegistered = this.props.amountRegistered
        const freeSpotsInClass = maxNumOfParticipants - currentlyRegistered
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{instructor}</td>
                <td>{price}</td>
                <td>{hour.substring(0, 5)}</td>
                <td>{this.dayMaker(day)}</td>
                <td>{this.getDate(this.dayMaker(day))}</td>
                <td>{freeSpotsInClass + '/' + maxNumOfParticipants}</td>
                <td id='regisButton'>{this.getRelevantButton(freeSpotsInClass)}</td>
            </tr>
        )
    }

    render() {
        return (this.renderTableData())
    }
}

RegistrationTableItem.propTypes = {
    register: PropTypes.func.isRequired,
    addToWaitingList: PropTypes.func.isRequired,
    unregister: PropTypes.func.isRequired,
    leaveWaitingList: PropTypes.func.isRequired,
};


export default connect(null, {register, addToWaitingList,
     leaveWaitingList, unregister })(withRouter(RegistrationTableItem));
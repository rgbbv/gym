import React from 'react'
import { loadPartialConfig } from '@babel/core';
import store from '../store';
import {omit} from 'lodash'


class Table extends React.Component {


 renderTableHeader() {
    if (this.props.table.classes.length === 0) return 'loading...'
    let header = Object.keys(omit(this.props.table.classes[0], ['id', 'maxParticipants', 'currentlyRegistered']))
    header.push('spots left')
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

 renderTableData() {
   console.log(this.props)
    if (this.props.table === null) return ''
    return this.props.table.classes.map((cell, index) => {
       const { id, title, day, hour, duration, maxParticipants, currentlyRegistered } = cell //destructuring
       return (
          <tr key={id}>
             <td>{title}</td>
             <td>{day}</td>
             <td>{hour}</td>
             <td>{duration}</td>
             <td>{maxParticipants-currentlyRegistered+'/'+maxParticipants}</td>
          </tr>
       )
    })
 }

 render() {
    return (
       <div>
          <h1 id='title'>React Dynamic Table</h1>
          <table id='students'>
             <tbody>
                <tr>{this.renderTableHeader()}</tr>
                {this.renderTableData()}
             </tbody>
          </table>
       </div>
    )
 }
}

export default Table 
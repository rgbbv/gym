import React from 'react'

class Table extends React.Component {
  constructor(props) {
    super(props)
 }

 renderTableHeader() {
    console.log(this.state)
    let header = Object.keys(this.state.classes[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

 renderTableData() {
    const arr = []
    this.props.Table.forEach((cell) => arr.concat(cell))
    return arr.map((cell, index) => {
       const { id, title, day, hour, duration } = cell //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{title}</td>
             <td>{day}</td>
             <td>{hour}</td>
             <td>{duration}</td>
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
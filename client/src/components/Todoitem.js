import React, { Component } from 'react'
import propTypes from 'prop-types';
 
export class Todoitem extends Component {
    render() {
        return (
            <div>
             <p>
                <input type="checkbox" onChange={this.props.button.bind(this)} /> {' '}
                </p>
            </div>
        )
    }
}

Todoitem.propTypes = {

}

const btnStyle = {
    background: '#bf0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius:'50%',
    cursor: 'Pointer',
    float: 'right'
}

export default Todoitem

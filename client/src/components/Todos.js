import React from 'react';
import Todoitem from './Todoitem';
import propTypes from 'prop-types';

class Todos extends React.Component {
    render() {
        return this.props.Todos.map((todo)=> (
           <Todoitem button={this.props.markComplete} />
        ));
    }
}

Todos.propTypes = {
    Todos: propTypes.array.isRequired
}

export default Todos;

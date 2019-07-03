import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Redux, { createStore } from 'redux';

const store = createStore((state, action) => {state = action.payload});

ReactDOM.render(<App />, document.getElementById('root'))

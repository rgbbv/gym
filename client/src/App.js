import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import Classes from './components/Classes';
import ParticipantForm from './components/ParticipantForm';
import store from './store';
import { putId } from './actions/classActions';

//const request = require("request");

class App extends React.Component {
  componentWillMount() {
    store.dispatch(putId)
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="My Gym">
            <Classes />
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;


 
import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import Classes from './components/Classes';
import ParticipantForm from './components/ParticipantForm';

import store from './store';

//const request = require("request");

class App extends React.Component {


/*button = () => {
  request("http://localhost:3333/classes", function(error, response, body) {
    if (error) {
        // Print the error if one occurred 
        console.log('something went wrong on the request', error);
    } 
    else {
     // this.store.dispatch(this.changeClasses(body));
     console.log(body)
    }
  })
}*/

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="My Gym">
            <ParticipantForm />
            <hr />
            <Classes />
          </header>
        </div>
      </Provider>
    );
  }
}


export default App;
 
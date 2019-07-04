import React from 'react'
import Todoitem from './components/Todoitem'
import Header from './components/layout/Header'
import Table from './components/Table'
import './App.css'
import { Provider } from 'react-redux'

const request = require("request");
const store = createStore(() => [], {}, applyMiddleware());

class App extends React.Component {
  state = {
    classes: []
  }

button = () => {
  request("http://localhost:3333/classes", function(error, response, body) {
    if (error) {
        // Print the error if one occurred 
        console.log('something went wrong on the request', error);
    } 
    else {
     // this.store.dispatch(this.changeClasses(body));
     console.log(body)
    }
  stateChanger(body)
  })
}

stateChanger = (body) => {
  this.setState(body)
}
changeClasses = (newClasses) => {
  return {
    payload: newClasses
  }
}

  render() {
    return (
      <Provider store = {store}>
        <div className="App">
          <div className="container">
            <Header />
              <React.Fragment>
                  store.
                  <Todoitem button={this.button} />
              </React.Fragment>
             />
          </div>
        </div>
      </Provider>
    );
  }
}


export default App;
 
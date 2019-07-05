import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store';
import { putId } from './actions/classActions';
import { Route } from 'react-router'
import Home from './components/Home'
import Thankyou from './components/Thankyou'

//const request = require("request");

class App extends React.Component {
  componentWillMount() {
    store.dispatch(putId)
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <switch>
            <Route path='/' exact component={Home}/>
            <Route path='/Thankyou' component={Thankyou} />
          </switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;


 
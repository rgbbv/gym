import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import store from './store';
import { putId } from './actions/classActions';
import { Route } from 'react-router'
import Home from './components/Home'
import Thankyou from './components/Thankyou'

class App extends React.Component {
  componentWillMount() {
    store.dispatch(putId)
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/Thankyou' component={Thankyou} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;


 
import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import store from './store';
import { putId, startLogin, getClasses } from './actions/classActions';
import { Route } from 'react-router'
import Home from './components/Home'
import Thankyou from './components/Thankyou'
import NavbarPage from './components/NavbarPage';
import ClassesPage from './components/ClassesPage';

class App extends React.Component {
  
  componentWillMount() {
    store.dispatch(putId)
    store.dispatch(startLogin)
    store.dispatch(getClasses)
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <NavbarPage />
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/Thankyou' component={Thankyou} />
            <Route path='/Classes' component={ClassesPage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;


 
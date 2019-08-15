import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch } from 'react-router-dom'
import store from './store';
import { Route } from 'react-router'
import Home from './components/Home'
import Thankyou from './components/Thankyou'
import NavbarPage from './components/NavbarPage';
import ClassesPage from './components/ClassesPage';
import InstructorsPage from './components/InstructorsPage';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <NavbarPage />
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/Thankyou' component={Thankyou} />
            <Route path='/Classes' component={ClassesPage} />
            <Route path='/Instructors' component={InstructorsPage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;


 
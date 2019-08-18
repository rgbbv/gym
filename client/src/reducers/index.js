import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import instructorsReducer from './instructorsReducer';
import loginReducer from './loginReducer'

export default combineReducers({
  registration: registrationReducer,
  instructors: instructorsReducer,
  login: loginReducer
});
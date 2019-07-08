import { GET_CLASSES, ADD_PARTICIPANT, START_LOGIN, GET_PRESSED,
   FINISHED_LOGIN, PUT_ID, FAILED_REGISTER, REGISTER_COMPLETE } from '../actions/types';


const initialState = {
  classes: [],
  participant: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,
        classes: action.payload.rows,
        participants: action.payload.rowsNum
      };
    case ADD_PARTICIPANT:
      return {
        ...state,
        accepted: false
      };
    case PUT_ID:
      return {
        ...state,
        id: action.payload,
        accepted: true
      }
    case FAILED_REGISTER:
      return {
        ...state,
        registered: false,
        accepted: true

      }
    case REGISTER_COMPLETE:
      return {
        ...state,
        registered: true,
        classes: state.classes.map( cur=> classAdder(action.payload,cur)),
        push: action.push
      }
    case START_LOGIN:
      return {
        ...state,
        loggedIn: action.payload
      }
    case FINISHED_LOGIN:
      return {
        ...state,
        loggedIn: true
      }
    case GET_PRESSED:
      return {
        ...state,
        register: action.payload.register,
        wait: action.payload.wait,
      }
    default:
      return state;
  }
}

const classAdder = (id, cur) => {
  if (cur.id === id) cur.currentlyRegistered++
  return cur
}
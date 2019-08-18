import { GET_CLASSES, ADD_PARTICIPANT, GET_PRESSED,
  FAILED_REGISTER, REGISTER_COMPLETE } from '../actions/types';


const initialState = {
  classes: [],
  amountRegistered: [],
  userRegistered: [],
  userWaiting: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,
        classes: action.payload.rows,
        amountRegistered: action.payload.rowsNum,
      };
    case ADD_PARTICIPANT:
      return {
        ...state,
        accepted: false
      };
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
    case GET_PRESSED:
      return {
        ...state,
        userRegistered: action.payload.registered,
        userWaiting: action.payload.waiting,
      }
    default:
      return state;
  }
}

const classAdder = (id, cur) => {
  if (cur.id === id) cur.currentlyRegistered++
  return cur
}
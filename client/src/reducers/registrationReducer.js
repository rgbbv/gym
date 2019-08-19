import { FETCH_CLASSES, REGISTER, FETCH_PARTICIPANTS, REGISTER_COMPLETE } from '../actions/types';


const initialState = {
  classes: [],
  amountRegistered: [],
  userRegistered: [],
  userWaiting: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLASSES:
      return {
        ...state,
        classes: action.payload.rows,
        amountRegistered: action.payload.rowsNum,
      };
    case REGISTER:
      return {
        ...state,
      };
    case REGISTER_COMPLETE:
      return {
        ...state,
        classes: state.classes.map( cur=> classAdder(action.payload,cur)),
        push: action.push
      }
    case FETCH_PARTICIPANTS:
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
import { FETCH_CLASSES, FETCH_PARTICIPANTS, UNREGISTER, REGISTER,
   LEAVE_WAITING_LIST, ADD_TO_WAITING_LIST } from '../actions/types';
import { remove, set } from 'lodash'

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
        amountRegistered: state.amountRegistered.map( cur=> classAdder(action.payload,cur)),
        userRegistered: state.userRegistered.concat(action.payload)
      }
    case FETCH_PARTICIPANTS:
      return {
        ...state,
        userRegistered: action.payload.registered,
        userWaiting: action.payload.waiting,
      }
    case ADD_TO_WAITING_LIST:
      return {
        ...state,
        userWaiting: state.userWaiting.concat(action.payload)
      }
    case LEAVE_WAITING_LIST:
      return {
        ...state,
        userWaiting: remove(state.userWaiting, cur => cur.courseId !== action.payload.courseId.toString())
      }
    case UNREGISTER:
      return {
        ...state,
        amountRegistered: state.amountRegistered.map( cur => classReducer(action.payload, cur)),
        userRegistered: remove(state.userRegistered, cur => cur.courseId !== action.payload.courseId.toString())
      }
    default:
      return state;
  }
}

const classAdder = (payload, cur) => {
 return cur.courseId === payload.courseId.toString() ? set(cur, 'count', cur.count+1) : cur
}

const classReducer = (payload, cur) => {
  return cur.courseId === payload.courseId.toString() ? set(cur, 'count', cur.count-1) : cur 
}
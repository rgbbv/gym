import { GET_CLASSES, ADD_PARTICIPANT, PUT_ID, FAILED_REGISTER, REGISTER_COMPLETE  } from '../actions/types';


const initialState = {
  classes: [],
  participant: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,
        classes: action.payload
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
        registered: true
      }
    default:
      return state;
  }
}
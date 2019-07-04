import { GET_CLASSES, NEW_PARTICIPANT } from '../actions/types';


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
    case NEW_PARTICIPANT:
      return {
        ...state,
        participant: action.payload
      };
    default:
      return state;
  }
}
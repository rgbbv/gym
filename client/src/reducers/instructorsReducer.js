import { GET_INSTRUCTORS } from '../actions/types';

const initialState = { instructors: [] };

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_INSTRUCTORS:
                return {
                  ...state,
                  instructors: action.payload
                }
        default:
            return state;
    }
}
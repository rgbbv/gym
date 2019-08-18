import { CHECK_LOGIN, FINISHED_LOGIN, PUT_ID } from '../actions/types';
 
 
 const initialState = {
   id: '',
   loggedIn: false
 };
 
 export default function(state = initialState, action) {
    switch (action.type) {
        case PUT_ID:
                return {
                  ...state,
                  id: action.payload,
                }
        case CHECK_LOGIN:
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
                id: action.payload.id
            }
        case FINISHED_LOGIN:
            return {
                ...state,
                loggedIn: true,
                id: action.payload
            }
        default:
            return state;
    }
}
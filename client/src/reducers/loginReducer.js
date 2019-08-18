import { CHECK_LOGIN, PUT_ID } from '../actions/types';
 
 
 const initialState = {
   id: '',
   loggedIn: false
 };
 
 export default function(state = initialState, action) {
    switch (action.type) {
        case PUT_ID:
                return {
                  ...state,
                  loggedIn: true,
                  id: action.payload,
                }
        case CHECK_LOGIN:
            return {
                ...state,
                loggedIn: action.payload.loggedIn,
                id: action.payload.id
            }
        default:
            return state;
    }
}
import { PUT_ID, CHECK_LOGIN } from './types';
import { requestAddress, userIdKey } from '../topology'; 

const request = require("request");

export const putId = (name, email, id) => dispatch => {
    if (id) {
      localStorage.setItem(userIdKey, id)
      dispatch({
        type: PUT_ID,
        payload: id
      })
    }
    else {
      const currentUserId = localStorage.getItem(userIdKey) || idGenerator()
      localStorage.setItem(userIdKey, currentUserId)
      request.post(requestAddress+"/login",
      {form:{ id: currentUserId, name: name, email: email}},
       function(error, response, body) {
        if (error) throw error
        else {
          dispatch({
            type: PUT_ID,
            payload: currentUserId 
          })
        }
      })
    }
}
  
  export const checkLogin = () => dispatch => {
    const loggedIn = localStorage.getItem(userIdKey) ? true : false
    const id = loggedIn ? localStorage.getItem(userIdKey) : ''
    dispatch({
      type: CHECK_LOGIN,
      payload: {loggedIn: loggedIn, id: id}
    })
  }

  const idGenerator = () => '_' + Math.random().toString(36).substr(2, 9)
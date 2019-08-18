import { PUT_ID, CHECK_LOGIN } from './types';

export const putId = () => dispatch => {
    const userIdKey = 'currentUserId'
    const currentUserId = localStorage.getItem(userIdKey) || idGenerator()
    localStorage.setItem(userIdKey, currentUserId)
    dispatch({
      type: PUT_ID,
      payload: currentUserId 
    })
  }
  
  export const checkLogin = () => dispatch => {
    const userIdKey = 'currentUserId'
    const loggedIn = localStorage.getItem(userIdKey) ? true : false
    const id = loggedIn ? localStorage.getItem(userIdKey) : ''
    dispatch({
      type: CHECK_LOGIN,
      payload: {loggedIn: loggedIn, id: id}
    })
  }

  const idGenerator = () => '_' + Math.random().toString(36).substr(2, 9)
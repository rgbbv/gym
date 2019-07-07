import { GET_CLASSES, PUT_ID, FAILED_REGISTER, START_LOGIN, FINISHED_LOGIN, REGISTER_COMPLETE } from './types';

const request = require("request");

export const putId = () => dispatch => {
  const userIdKey = 'currentUserId'
  const currentUserId = localStorage.getItem(userIdKey) || idGenerator()
  localStorage.setItem(userIdKey, currentUserId)
  dispatch({
    type: PUT_ID,
    payload: currentUserId 
  })
}

export const startLogin = () => dispatch => {
  dispatch({
    type: START_LOGIN
  })
}

export const finishedLogin = () => dispatch => {
  dispatch({
    type: FINISHED_LOGIN
  })
}

const idGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

export const getClasses = () => dispatch => {
    request("http://localhost:3333/classes", function(error, response, body) {
        if (error) {
            // Print the error if one occurred 
            console.log('something went wrong on the request', error);
        } 
        else {
            dispatch({
                type: GET_CLASSES,
                payload: JSON.parse(body)
              })
        }
      })
    };

export const addParticipant = (participantId, courseId, history) => dispatch => {
  request.post("http://localhost:3333/register", {form:{participantId: participantId, courseId: courseId}},
   function(error, response, body) {
    if (error) {
      dispatch({
        type: FAILED_REGISTER
      })
    }
    else {
      if (response.statusCode === 222) {
        alert(response.body)
        dispatch({
          type: FAILED_REGISTER
        })
      }
      else {
        history.push("/Thankyou")
        dispatch({
          type: REGISTER_COMPLETE,
          payload: courseId,
          
        })
      }
    }
  })
};
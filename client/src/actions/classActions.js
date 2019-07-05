import { GET_CLASSES, NEW_PARTICIPANT, FAILED_REGISTER, PUT_ID, REGISTER_COMPLETE } from './types';
import store from '../store'

const request = require("request");

export const failedRegister = () => dispatch => {
  dispatch({
    type: FAILED_REGISTER
  })
}

export const putId = () => dispatch => {
  const userIdKey = 'currentUserId'
  const currentUserId = localStorage.getItem(userIdKey) || idGenerator()
  localStorage.setItem(userIdKey, currentUserId)
  dispatch({
    type: PUT_ID,
    payload: currentUserId 
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
                payload: JSON.parse(body).classes
              })
        }
      })
    };

export const addParticipant = (participantId, courseId) => dispatch => {
  console.log('participantId: '+participantId)
  console.log('courseId: '+courseId)
  request.post("http://localhost:3333/register", {form:{participantId: participantId, courseId: courseId}},
   function(error, response, body) {
    if (error) {
      console.log(error)
      store.dispatch(failedRegister)
    }
    else {
      console.log(response.body)
      console.log(courseId)
      dispatch({
        type: REGISTER_COMPLETE,
        payload: courseId
      })
    }
  })
};
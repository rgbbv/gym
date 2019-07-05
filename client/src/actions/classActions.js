import { GET_CLASSES, FAILED_REGISTER, PUT_ID, REGISTER_COMPLETE } from './types';
import {push} from 'react-router-redux'

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

export const addParticipant = (participantId, courseId, history) => dispatch => {
  request.post("http://localhost:3333/register", {form:{participantId: participantId, courseId: courseId}},
   function(error, response, body) {
    if (error) {
      dispatch({
        type: FAILED_REGISTER
      })
    }
    else {
      if (response.statusCode === 404) {
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
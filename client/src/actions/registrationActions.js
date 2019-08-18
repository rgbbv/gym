import { GET_CLASSES, FAILED_REGISTER, GET_PRESSED, REGISTER_COMPLETE } from './types';

const request = require("request");

export const getPressed = () => dispatch => {
  const userIdKey = 'currentUserId'
  const currentUserId = localStorage.getItem(userIdKey)
  request.get("http://localhost:3333/getListed?participantId="+currentUserId, function(error, response, body) {
    if (error) throw error
    else {
      dispatch({
        type: GET_PRESSED,
        payload: JSON.parse(body)
      })
    }
  })
}

export const getClasses = () => dispatch => {
    request("http://localhost:3333/getClasses", function(error, response, body) {
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
  request.post("http://localhost:3333/toRegister", {form:{participantId: participantId, courseId: courseId}},
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
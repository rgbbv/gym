import { GET_CLASSES, FAILED_REGISTER, PUT_ID, REGISTER_COMPLETE, ENTERED_WAITINGLIST } from './types';

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

export const joinWaitingList = (participantId, courseId) => dispatch => {
  request.post("http://localhost:3333/waiting", {form:{ participantId: participantId, courseId: courseId}},
  function(error, response, body) {
    if (error) {
      alert('currently we are unable to add you to the waiting list. please try later')
    }
    else {
      alert(response.body)
      dispatch({
        type: ENTERED_WAITINGLIST,
        payload: {participantId: participantId, courseId: courseId}
      })
    }
  })
}

export const addParticipant = (participantId, courseId, history) => dispatch => {
  request.post("http://localhost:3333/register", {form:{participantId: participantId, courseId: courseId}},
   function(error, response, body) {
    if (error) {
      dispatch({
        type: FAILED_REGISTER
      })
    }
    else {
      if (response.statusCode === 200) {
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
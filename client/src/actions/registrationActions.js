import { FETCH_CLASSES, FETCH_PARTICIPANTS, REGISTER,
  LEAVE_WAITING_LIST, ADD_TO_WAITING_LIST, UNREGISTER} from './types';
import { requestAddress, userIdKey } from '../topology';

const request = require("request");

export const fetchParticipants = () => dispatch => {
  const currentUserId = localStorage.getItem(userIdKey)
  request.get(requestAddress+"/participants?participantId="+currentUserId, function(error, response, body) {
    if (error) throw error
    else {
      dispatch({
        type: FETCH_PARTICIPANTS,
        payload: JSON.parse(body)
      })
    }
  })
}

export const fetchClasses = (day) => dispatch => {
  var dayAdd = day === undefined ? '' : '?day='+day
  request(requestAddress+"/classes"+dayAdd, function(error, response, body) {
    if (error) throw error
    else {
      dispatch({
        type: FETCH_CLASSES,
        payload: JSON.parse(body)
      })
    }
  })
};

export const register = (courseId, history) => dispatch => {
  const currentUserId = localStorage.getItem(userIdKey)
  request.post(requestAddress+"/register",
   {form:{participantId: currentUserId, courseId: courseId}},
   function(error, response, body) {
    if (error) throw error
      else {
        history.push("/Thankyou")
        dispatch({
          type: REGISTER,
          payload: {courseId: courseId}
        })
      }
    }
  )
};

export const addToWaitingList = (courseId) => dispatch => {
  const currentUserId = localStorage.getItem(userIdKey)
  request.post(requestAddress+"/addToWaitingList",
    {form:{ participantId: currentUserId, courseId: courseId}},
    function(error, response, body) {
    if (error) throw error
    else {
      alert(response.body)
      dispatch({
        type: ADD_TO_WAITING_LIST,
        payload: {courseId: courseId.toString()}
      })
    }
  })
};

export const leaveWaitingList = (courseId) => dispatch => {
  const currentUserId = localStorage.getItem(userIdKey)
  request.delete(requestAddress+"/leaveWaitingList",
    {form:{ participantId: currentUserId, courseId: courseId}},
    function(error, response, body) {
    if (error) throw error
    else {
      dispatch({
        type: LEAVE_WAITING_LIST,
        payload: {courseId: courseId}
      })
    }
  })
};

export const unregister = (courseId) => dispatch => {
  const currentUserId = localStorage.getItem(userIdKey)
  request.delete(requestAddress+"/unregister", {form:{ participantId: currentUserId, courseId: courseId}},
  function(error, response, body) {
    if (error) throw error
    else {
      dispatch({
        type: UNREGISTER,
        payload: {courseId: courseId}
      })
    }
  })
};
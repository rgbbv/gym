import { FETCH_CLASSES, FETCH_PARTICIPANTS, REGISTER_COMPLETE, ADD_TO_WAITING_LIST} from './types';

const request = require("request");

export const fetchParticipants = () => dispatch => {
  const userIdKey = 'currentUserId'
  const currentUserId = localStorage.getItem(userIdKey)
  request.get("http://localhost:3333/fetchParticipants?participantId="+currentUserId, function(error, response, body) {
    if (error) throw error
    else {
      dispatch({
        type: FETCH_PARTICIPANTS,
        payload: JSON.parse(body)
      })
    }
  })
}

export const fetchClasses = () => dispatch => {
    request("http://localhost:3333/fetchClasses", function(error, response, body) {
        if (error) throw error
        else {
            dispatch({
                type: FETCH_CLASSES,
                payload: JSON.parse(body)
              })
        }
      })
    };

export const addParticipant = (courseId, history) => dispatch => {
  const userIdKey = 'currentUserId'
  const currentUserId = localStorage.getItem(userIdKey)
  request.post("http://localhost:3333/toRegister",
   {form:{participantId: currentUserId, courseId: courseId}},
   function(error, response, body) {
    if (error) throw error
      else {
        history.push("/Thankyou")
        dispatch({
          type: REGISTER_COMPLETE,
        })
      }
    }
  )
};

export const addToWaitingList = (courseId) => dispatch => {
  const userIdKey = 'currentUserId'
  const currentUserId = localStorage.getItem(userIdKey)
  request.post("http://localhost:3333/addToWaitingList",
    {form:{ participantId: currentUserId, courseId: courseId}},
    function(error, response, body) {
    if (error) throw error
    else {
      alert(response.body)
      window.location.reload();
      dispatch({
        type: ADD_TO_WAITING_LIST,
      })
    }
  })
};
import { FETCH_INSTRUCTORS } from './types';
import { requestAddress } from '../topology';
 
const request = require("request");

export const fetchInstructors = () => dispatch => {
    request(requestAddress+"/instructors", function(error, response, body) {
      if (error) throw error
      else {
          dispatch({
              type: FETCH_INSTRUCTORS,
              payload: JSON.parse(body)
            })
      }
    })
  };
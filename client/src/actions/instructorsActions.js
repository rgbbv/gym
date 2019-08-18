import { FETCH_INSTRUCTORS } from './types';
 
const request = require("request");

export const fetchInstructors = () => dispatch => {
    request("http://localhost:3333/instructors", function(error, response, body) {
      if (error) throw error
      else {
          dispatch({
              type: FETCH_INSTRUCTORS,
              payload: JSON.parse(body)
            })
      }
    })
  };
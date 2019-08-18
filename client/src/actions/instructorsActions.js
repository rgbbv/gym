import { GET_INSTRUCTORS } from './types';
 
const request = require("request");

export const getInstructors = () => dispatch => {
    request("http://localhost:3333/getInstructors", function(error, response, body) {
      if (error) {
          // Print the error if one occurred 
          console.log('something went wrong on the request', error);
      } 
      else {
          dispatch({
              type: GET_INSTRUCTORS,
              payload: JSON.parse(body)
            })
      }
    })
  };
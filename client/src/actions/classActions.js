import { GET_CLASSES, NEW_PARTICIPANT } from './types';

const request = require("request");

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
         // this.store.dispatch(this.changeClasses(body));
         console.log(body)
        }
      })
    };

export const addParticipant = addParticipant => dispatch => {
 /*// fetch('https://jsonplaceholder.typicode.com/posts', {
  //  method: 'POST',
  //  headers: {
   //   'content-type': 'application/json'
   // },
    body: JSON.stringify(addParticipant)
  })
    .then(res => res.json())
    .then(part =>
      dispatch({
        type: NEW_PARTICIPANT,
        payload: part
      })
    );*/
};
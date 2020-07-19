# Gym registration system

### This project was created by Nimrod Zur.

## Prerequisites:
- Install MySql locally and create a connection as written in ./server/main.js 
- Create database named: "gymdb" with the following tables:
1) table "classes" with columns: id(int) PK, description(varchar), instructor(text), price(double), duration(varchar), day(varchar), hour(time), maxNumOfParticipants(int)
2) table "instructors" with columns: id(varchar) PK, name(varchar), background(text)
3) table "registered" with columns: courseId(varchar) PK, participantId(varchar) PK
4) table "users" with columns: id(varchar) PK, name(varchar), email(varchar)
5) table "waiting" with columns: courseId(varchar) PK, participantId(varchar) PK

## Running the Client:

- In the Client directory (./client) you can run using:

`npm start`

Runs the client in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

OR

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

## Running the Server:

- In the Server directory (./server) you can run using:

`node main`

Runs the server and connects it to the DB

## Notes:
- If you want to change the connection details or the DB name remember to change the appropriate values in     ./server/main.js





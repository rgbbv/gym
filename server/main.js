var express = require('express');
var bodypar = require('body-parser');
var mysql = require('mysql');
const HandleWaitingList = require('./HandleWaitingList')
const HandleRegistered = require('./HandleRegistered')
const HandleClasses = require('./HandleClasses')
const HandleLogin = require('./HandleLogin')
const HandleInstructors = require('./HandleInstructors')

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '1234',
	database : 'gymdb'
  });

  connection.connect(function(err) {
	if (err) {
	  console.error('error connecting: ' + err.stack);
	  return;
	}
})

var app = express();
app.use(bodypar.urlencoded({ extended: false }))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

app.post('/addToWaitingList', (req, res) => {
	HandleWaitingList.addToWaitingList(req, res, connection)
});

app.post('/register', (req, res) => {
	HandleRegistered.checkRegistered(req, res, connection)
});

app.get('/participants', (req, res) => {
	HandleRegistered.fetchRegistered(req, res, connection)
});

app.get('/classes', (req, res) => {
	HandleClasses.fetchClasses(req, res, connection)
});

app.get('/instructors', (req, res) => {
	HandleInstructors.fetchInstructors(req, res, connection)
});

app.post('/login', (req, res) => {
	HandleLogin.login(req, res, connection)
});

app.listen(3333);

console.log('listening on port 3333');



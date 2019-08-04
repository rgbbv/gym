var express = require('express');
var bodypar = require('body-parser');
var mysql = require('mysql');
const HandleWaitingList = require('./HandleWaitingList')
const HandleRegistered = require('./HandleRegistered')
const HandleClasses = require('./HandleClasses')
const HandleLogin = require('./HandleLogin')

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

app.post('/enterWaitingList', (req, res) => {
	HandleWaitingList.enterWaitingList(req, res, connection)
})


app.post('/toRegister', (req, res) => {
	HandleRegistered.checkRegistered(req, res, connection)
})

app.get('/getListed', (req, res) => {
	HandleRegistered.getRegistered(req, res, connection)
});

app.get('/getClasses', (req, res) => {
	HandleClasses.getClasses(req, res, connection)
});

app.post('/login', (req, res) => {
	HandleLogin.login(req, res, connection)
})

app.listen(3333);

console.log('listening on port 3333');



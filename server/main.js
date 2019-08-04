var express = require('express');
var bodypar = require('body-parser');
var mysql = require('mysql');
const { enterWaitingList } = require('./HandleWaitingList')
const { checkRegistered } = require('./HandleRegistered')
const { getClasses } = require('./HandleClasses')
const { login } = require('./HandleLogin')

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
	enterWaitingList(req, res, connection)
})


app.post('/toRegister', (req, res) => {
	checkRegistered(req, res, connection)
})

app.get('/getListed', (req, res) => {
	
});

app.get('/getClasses', (req, res) => {
	getClasses(req, res, connection)
});

app.post('/login', (req, res) => {
	login(req, res, connection)
})

app.listen(3333);

console.log('listening on port 3333');



var express = require('express');
var bodypar = require('body-parser');
var mysql = require('mysql');

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

app.post('/waiting', (req, res) => {
	var que = 'INSERT IGNORE INTO waiting (courseId, participantId) VALUES (?, ?)'
	connection.query(que, [req.body.courseId, req.body.participantId], (err) => { if(err) throw err })
	res.send('you have been added to the waiting list')
})


app.all('/register', (req, res) => {

	if (req.method === 'POST') {
		var que = 'INSERT IGNORE INTO registered (courseId, participantId) VALUES (?, ?)'
		connection.query(que, [req.body.courseId, req.body.participantId], 
		(err) =>  {
			 if (err) res.status(222).send('sadly there are no more open spots in this class. feel free to join the waiting list')
		})
		res.send('successfully registered')
	}
	if (req.method === 'GET') {
		var que = 'SELECT courseId FROM registered WHERE participantId = ?'
		connection.query(que, [req.query.participantId], (err, rowsRegistered) => {
			if (err) throw err
			var que = 'SELECT courseId FROM waiting WHERE participantId = ?'
			connection.query(que, [req.query.participantId], (err2, rowsWaiting) => {
				if (err2) throw err
				res.send({register: rowsRegistered, wait: rowsWaiting})
			})
		})
	}
})

app.get('/classes', (req, res) => {
	var que = 'SELECT * FROM classes'
	connection.query(que, (err,rows) => { if(err) throw err
		var secondQue = 'SELECT courseId, COUNT(*) AS count FROM registered group by courseId'
		connection.query(secondQue, (err2, rowsNum) => { if(err2) throw err2
		res.send({rows, rowsNum})})})
});

app.post('/login', (req, res) => {
	var que = 'INSERT IGNORE INTO users (id,name,email) VALUES (?,?,?)'
	connection.query(que, [req.body.id, req.body.name, req.body.email], (err) => { if (err) throw err })
	res.send('logged in')
})

app.listen(3333);

console.log('listening on port 3333');

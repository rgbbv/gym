
var ID = {IdMaker: () => '_' + Math.random().toString(36).substr(2, 9)};
var express = require('express');
var bodypar = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '1234',
	database : 'gymDB'
  });

  connection.connect(function(err) {
	if (err) {
	  console.error('error connecting: ' + err.stack);
	  return;
	}
})
  


calendar = {
    classes: [
    {
      id: ID.IdMaker(),
      title: 'title 1',
	  day: 'Wednesday',
	  hour: '12:30',
	  duration: '2.5 hours',
	  maxParticipants: 5,
	  currentlyRegistered: 2
    },
    {
		id: ID.IdMaker(),
		title: 'title 2',
		day: 'Sunday',
		hour: '10:00',
		duration: '2 hourse',
		maxParticipants: 10,
		currentlyRegistered: 7
	  },
	  {
		id: ID.IdMaker(),
		title: 'title 3',
		day: 'Tuesday',
		hour: '16:30',
		duration: '1 hour',
		maxParticipants: 9,
		currentlyRegistered: 8
	  },
	  {
		id: ID.IdMaker(),
		title: 'title 4',
		day: 'Thursday',
		hour: '20:15',
		duration: '1.5 hourse',
		maxParticipants: 6,
		currentlyRegistered: 6
	  }
  ]
}
waitingLists = [
	  {
		  id: calendar.classes[0].id,
		  waiting: []
	  },
	  {
		  id: calendar.classes[1].id,
		  waiting: []
	  },
	  {
		  id: calendar.classes[2].id,
		  waiting: []
	  },
	  {
		  id: calendar.classes[3].id,
		  waiting: []
	  }
  ]

var app = express();
app.use(bodypar.urlencoded({ extended: false }))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

app.post('/waiting', (req, res) => {
	var que = 'INSERT IGNORE INTO waiting (courseId, participantId, time) VALUES (?, ?, ?)'
	connection.query(que, [[req.body.courseId, req.body.participantId,
		Date.now()]], (err) => { if(err) throw err })
	res.send('you have been added to the waiting list')
})


app.all('/register', (req, res) => {

	if (req.method === 'POST') {
		var que = 'INSERT IGNORE INTO registered (courseId, participantId) VALUES (?, ?)'
		connection.query(que, [[req.body.courseId, req.body.participantId]], 
		(err) =>  {
			 if (err) res.status(222).send('sadly there are no more open spots in this class. feel free to join the waiting list')
		})
	}
});

app.get('/classes', (req, res) => {
	var que = 'SELECT * FROM classes'
	connection.query(que, (err,rows) => { if(err) throw err
		var secondQue = 'SELECT courseId, COUNT(*) FROM gymdb.registered group by courseId'
		connection.query(secondQue, (err2, rows2) => { if(err2) throw err2
		res.send({rows, rows2})})})
});

app.get('/login', (req, res) => {
	var que = 'INSERT IGNORE INTO users (id,email,user) VALUES (?,?,?)'
	connection.query(que, [req.body.id, req.body.email, req.body.user], (err) => { if (err) throw err })
	res.send('logged in')
})

app.listen(3333);

console.log('started on PORT 3333');

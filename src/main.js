
var ID = {IdMaker: () => '_' + Math.random().toString(36).substr(2, 9)};
var express = require('express');
var bodypar = require('body-parser')


calendar = {
    classes: [
    {
      id: ID.IdMaker(),
      title: 'title 1',
	  day: 'Wednesday',
	  hour: '12:30',
	  duration: 2.5,
	  maxParticipants: 5,
	  currentlyRegistered: 2
    },
    {
		id: ID.IdMaker(),
		title: 'title 2',
		day: 'Sunday',
		hour: '12:30',
		duration: 2,
		maxParticipants: 10,
		currentlyRegistered: 7
	  },
	  {
		id: ID.IdMaker(),
		title: 'title 3',
		day: 'Tuesday',
		hour: '12:30',
		duration: 1,
		maxParticipants: 9,
		currentlyRegistered: 8
	  },
	  {
		id: ID.IdMaker(),
		title: 'title 4',
		day: 'Thursday',
		hour: '12:30',
		duration: 1.5,
		maxParticipants: 6,
		currentlyRegistered: 6
	  }
  ]
}
waitingLists = [
	  {
		  id: calendar.classes[0],
		  waiting: []
	  },
	  {
		  id: calendar.classes[1],
		  waiting: []
	  },
	  {
		  id: calendar.classes[2],
		  waiting: []
	  },
	  {
		  id: calendar.classes[3],
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

app.all('/register', (req, res) => {

	if (req.method === 'DELETE') {
		calendar.classes.map((cur) => freeSpot(req.body, cur))
		res.send('you have been deleted')
	} else if (req.method === 'POST') {
		calendar.classes.reduce( (acc,cur) => acc && canRegister(req.body, cur), true) ?
		 res.send('you have been signed in to the class'):
		 res.status(404).send('sadly there are no more open spots in this class. feel free to join the waiting list');
	}
});

freeSpot = (form, course) => {
	var participantId = form.participantId
	var courseId = form.courseId
	 if(course.id = form.participantId) {
		  if(course.currentlyRegistered < course.maxParticipants) course.currentlyRegistered--
		  else {return false}
	 }
	 return true
}
canRegister = (form, course) => {
	console.log(form.courseId+' '+course.title+' '+course.id)
	var participantId = form.participantId
	var courseId = form.courseId
	 if(course.id === form.courseId) {
		 console.log('cur: '+course.currentlyRegistered+' max: '+course.maxParticipants)
		  if(course.currentlyRegistered < course.maxParticipants)  {
			  console.log('possible')
			  course.currentlyRegistered++
		  }
		  else {
			  console.log('impossible')
			 return false
		}
	 }
	 return true
}

app.get('/classes', (req, res) => {
	res.json(calendar);
});

app.listen(3333);

console.log('started on PORT 3333');
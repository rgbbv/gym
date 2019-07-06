
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
	waitingLists.map((cur) => addToWaitingList(req.body, cur))
	console.log('')
	res.send('you have been added to the waiting list')
})

addToWaitingList = (form, waitingList) => {
	if (form.courseId == waitingList.id) {
		var arr = waitingList.waiting
		if (!arr.includes(form.email))
			waitingList.waiting.push(form.email)
	}
	console.log(waitingList)
	return waitingList
}

app.all('/register', (req, res) => {

	if (req.method === 'DELETE') {
		calendar.classes.map((cur) => freeSpot(req.body, cur))
		res.send('you have been deleted')
	} else if (req.method === 'POST') {
		calendar.classes.reduce( (acc,cur) => acc && canRegister(req.body, cur), true) ?
		 res.send('you have been signed in to the class'):
		 res.status(222).send('sadly there are no more open spots in this class. feel free to join the waiting list');
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
	var participantId = form.participantId
	var courseId = form.courseId
	 if(course.id === form.courseId) {
		  if(course.currentlyRegistered < course.maxParticipants)  {
			  course.currentlyRegistered++
		  }
		  else {
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
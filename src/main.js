
var ID = {IdMaker: () => '_' + Math.random().toString(36).substr(2, 9)};
var express = require('express');
var body = require('body-parser');

//var urlencodrdparser = jsonparser.urlencoded( {extended:false });

calender = {
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

var app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

app.all('/booking', (req, res) => {
	let slices = url.startsWith('/booking').split('/')

	if (req.method === 'DELETE') {
        res.send('sign me out');
	} else if (req.method === 'POST') {
		//if has enough space in the class
		res.send('sign me in');

		//else...
		//res.send('sadly there is no more room')
		//client sends confirmation
	}
});

app.get('/classes', (req, res) => {
	res.json(calender);
});

//app.get('/', (req,res) => res.send('getClasses'));

//app.get('/', (req,res) => res.send('getFired'));

app.listen(3333);

console.log('started on PORT 3333');
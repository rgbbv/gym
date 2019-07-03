
var ID = require('./ID');
var express = require('express');
var body = require('body-parser');

//var urlencodrdparser = jsonparser.urlencoded( {extended:false });

calender = {
    classes: [
    {
      id: ID.IdMaker,
      title: 'Take out the trash',
	  day: 'Wednesday',
	  hour: '12:30',
	  duration: 2.5
    },
    {
		id: ID.IdMaker,
		title: 'Take out the trash',
		day: 'Sunday',
		hour: '12:30',
		duration: 2
	  },
	  {
		id: ID.IdMaker,
		title: 'Take out the trash',
		day: 'Tuesday',
		hour: '12:30',
		duration: 1
	  },
	  {
		id: ID.IdMaker,
		title: 'Take out the trash',
		day: 'Thursday',
		hour: '12:30',
		duration: 1.5
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
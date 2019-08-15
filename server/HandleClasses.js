
getClasses = (req, res, connection) => {
    var que='SELECT classes.id, classes.name, classes.description, classes.duration, instructors.name as instructor, '
    que+='classes.price, classes.day,classes.hour, classes.maxNumOfParticipants FROM instructors RIGHT JOIN classes'
    que+=' ON classes.instructor = instructors.id'
    connection.query(que, (err,rows) => { 
        if(err) throw err
	    var secondQue = 'SELECT courseId, COUNT(*) AS count FROM registered group by courseId'
	    connection.query(secondQue, (err2, rowsNum) => {
            if(err2) throw err2
		    res.send({rows, rowsNum})
	    })
    })
}

module.exports = { getClasses }
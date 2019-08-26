
fetchClasses = (req, res, connection) => {
    var que='SELECT classes.id, classes.name, classes.description, classes.duration, instructors.name as instructor, '
    que+='classes.price, classes.hour, classes.day, classes.maxNumOfParticipants FROM instructors RIGHT JOIN classes'
    que+=' ON classes.instructor = instructors.id'
    if (req.query.day) que+=' WHERE classes.day > ?'
    connection.query(que, req.query.day, (err,rows) => { 
        if(err) throw err
	    var secondQue = 'SELECT courseId, COUNT(*) AS count FROM registered group by courseId'
	    connection.query(secondQue, (err2, rowsNum) => {
            if(err2) throw err2
		    res.send({rows, rowsNum})
	    })
    })
}

fetchSpecificClass = (classId, connection, callback) => {
    var que = 'SELECT name FROM classes WHERE id = '+classId
    connection.query(que, (err, rows) => {
        if (err) callback(err, null)
        else callback(null, rows[0].name)
    })
}

module.exports = { fetchClasses, fetchSpecificClass }
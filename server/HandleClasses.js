
getClasses = (req, res, connection) => {
    var que = 'SELECT * FROM classes'
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
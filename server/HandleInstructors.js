
getInstructors = (req, res, connection) => {
    var que = 'SELECT * FROM instructors'
	connection.query(que, (err, rows) => {
		if (err) throw err
		res.send(rows)
	})
}

module.exports = { getInstructors }
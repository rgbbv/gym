
addToWaitingList = (req, res, connection) => {
	var que = 'INSERT IGNORE INTO waiting (courseId, participantId) VALUES (?, ?)';
	connection.query(que, [req.body.courseId, req.body.participantId], (err) => {
		if (err) throw err;
		res.send('you have been added to the waiting list')
	})
}

leaveWaitingList = (req, res, connection) => {
	var que = 'DELETE FROM waiting WHERE participantId = ? AND courseId = ?'
    connection.query(que, [req.body.participantId, req.body.courseId], (err) => {
        if (err) throw err
        res.send('left waiting list')
    })
}

fetchWaitingList = (req, res, connection, rowsRegistered) => {
	var que = 'SELECT courseId FROM waiting WHERE participantId = ?'
	connection.query(que, [req.query.participantId], (err2, rowsWaiting) => {
		if (err2) throw err
		res.send({registered: rowsRegistered, waiting: rowsWaiting})
	})
}

registerEarliestWaiting = (req, res, connection) => {
	var queSelect = 'SELECT * FROM waiting WHERE courseId = ? ORDER By added_at ASC LIMIT 1'
	connection.query(queSelect, req.body.courseId, (errSelect, row) => {
		if (errSelect) throw errSelect
		if (row.participantId) {
			var queInsert = 'INSERT INTO registered (courseId, participantId) VALUES (?, ?)'
			connection.query(queInsert, [row.courseId, row.participantId], (errInsert) => {
				if (errInsert) throw errInsert
			})
			var queDeleteWaiting = 'DELETE FROM waiting WHERE participantId = ? AND courseId = ?'
			connection.query(queDeleteWaiting, [row.courseId, row.participantId], (errDelete) => {
				if (errDelete) throw errDelete
			})
			res.send(row)
		}
		else {
			res.send(null)
		}
	})
}

module.exports = { addToWaitingList, leaveWaitingList, fetchWaitingList, registerEarliestWaiting }

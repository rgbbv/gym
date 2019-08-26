const { fetchWaitingList, registerEarliestWaiting } = require('./HandleWaitingList')
const { remove } = require('lodash')

canRegister = (req, res, connection) => {
    var enterQue = 'INSERT IGNORE INTO registered (courseId, participantId) VALUES (?, ?)';
    connection.query(enterQue, [req.body.courseId, req.body.participantId], (err) => {
        if (err)
            res.status(222).send('sadly there are no more open spots in this class. feel free to join the waiting list');
        res.send('successfully registered')
    })
}

checkRegistered = (req, res, connection) => {
    var checkQue = 'SELECT cla.id, cla.maxNumOfParticipants, COUNT(regis.courseId) as count FROM registered '
    checkQue+= ' as regis RIGHT JOIN classes as cla ON cla.id = regis.courseId group by regis.courseId'
    connection.query(checkQue, [req.body.courseId], (err, rows) => {
        if (err) throw err
        var row = remove(rows, cur => cur.id.toString() === req.body.courseId)
        console.log(row)
        console.log(req.body)
        var isFull = (row[0].maxNumOfParticipants <= row[0].count)
        console.log(isFull)
        if (!isFull) canRegister(req, res, connection)
    })
}

fetchRegistered = (req, res, connection) => {
    var que = 'SELECT courseId FROM registered WHERE participantId = ?'
	connection.query(que, [req.query.participantId], (err, rowsRegistered) => {
		if (err) throw err
		fetchWaitingList(req, res, connection, rowsRegistered)
	})
}

unregister = (req, res, connection) => {
    var queDeleteRegister = 'DELETE FROM registered WHERE participantId = ? AND courseId = ?'
    connection.query(queDeleteRegister, [req.body.participantId, req.body.courseId], (err) => {
        if (err) throw err
    })
    registerEarliestWaiting(req, res, connection)
}

module.exports = { checkRegistered, fetchRegistered, unregister }
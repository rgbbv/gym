const { fetchSpecificClass } = require('./HandleClasses')
const { fetchParticipant } = require('./HandleLogin')

const sgMail = require('@sendgrid/mail');
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

addToWaitingList = (req, res, connection) => {
	var que = 'INSERT IGNORE INTO waiting (courseId, participantId) VALUES (?, ?)';
	connection.query(que, [req.body.courseId, req.body.participantId], (err) => {
		if (err) throw err;
		res.send('You have been added to the waiting list. We will notify you by email if a spot has opened up in the class.')
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
		if (row[0]) {
			var queInsert = 'INSERT INTO registered (courseId, participantId) VALUES (?, ?)'
			connection.query(queInsert, [row[0].courseId, row[0].participantId], (errInsert) => {
				if (errInsert) throw errInsert
				fetchParticipant(row[0].participantId, connection, (err, participant) => {
					if (err) throw err
					else fetchSpecificClass(row[0].courseId, connection, (err, className) => {
						if (err) throw err
						else {
							var text = 'Dear !,<br/> Due to a cancellation, a spot has been opened up in ?.'
							text += ' Since you are the first in the waiting list we are moving you to the registered list.'
							text += ' If you dont wish to attend please cancel your registration so the next person on the list can come.<br/>'
							text += ' Thank you for using our service and have a great week.'
							text = text.replace('!', participant.name)
							text = text.replace('?', className)
							const msg = {
								to: participant.email,
								from: 'registration@gym.com',
								subject: 'Free spot in gym class',
								text: className,
								html: text
							  };
							sgMail.send(msg);
						}
					})
				})
			})
			var queDeleteWaiting = 'DELETE FROM waiting WHERE participantId = ? AND courseId = ?'
			connection.query(queDeleteWaiting, [row[0].participantId, row[0].courseId], (errDelete) => {
				if (errDelete) throw errDelete
			})
			res.send(row[0])
		}
		else {
			res.send(null)
		}
	})
}

module.exports = { addToWaitingList, leaveWaitingList, fetchWaitingList, registerEarliestWaiting }

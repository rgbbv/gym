login = (req, res, connection) => {
    var que = 'INSERT IGNORE INTO users (id,name,email) VALUES (?,?,?)'
    connection.query(que, [req.body.id, req.body.name, req.body.email], (err) => {
        if (err) throw err 
        res.send('logged in')
    })
}

fetchParticipant = (participantId, connection, callback) => {
    var que = 'SELECT * FROM users WHERE id = ?'
    connection.query(que, participantId, (err, rows) => {
        if (err) callback(err, null)
        else callback(null, rows[0])
    })
}

module.exports =  { login, fetchParticipant }

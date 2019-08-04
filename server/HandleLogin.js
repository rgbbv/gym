
login = (req, res, connection) => {
    var que = 'INSERT IGNORE INTO users (id,name,email) VALUES (?,?,?)'
    connection.query(que, [req.body.id, req.body.name, req.body.email], (err) => {
        if (err) throw err 
        res.send('logged in')
    })
}

module.exports = login

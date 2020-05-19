const adminRouter = express.Router()

adminRouter.use((req, res, next) => {
    if (Boolean(req.session.authenticated)) {
        next()
    } else {
        res.sendStatus(403)
    }
})

adminRouter.get('/api/articles', (req, res) => {
    console.log(req.session.authenticated)
    console.log(req.session.cookie)
    const connection = createConnection()
    connection.query('SELECT id, title, content FROM articles', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
        connection.destroy()
    })
})

adminRouter.get('/api/articles/:id', (req, res) => {
    const connection = createConnection()
    const id = req.path.slice('/api/articles/'.length)
    connection.query('SELECT id, title, content FROM articles WHERE id = ?', id, function (error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            res.sendStatus(404)
            return
        }
        res.send(results[0]);
        connection.destroy()
    })
})

adminRouter.post('/api/articles', (req, res) => {
    const connection = createConnection()
    let form = JSON.parse(req.body.json)
    connection.query('INSERT INTO articles SET ?', form, function (error, results, fields) {
        if (error) throw error;
        res.send(results[0]);
        connection.destroy()
    })
})

adminRouter.put('/api/articles/:id', (req, res) => {
    const connection = createConnection()
    const id = req.path.slice('/api/articles/'.length)
    let form = JSON.parse(req.body.json)
    connection.query('UPDATE articles SET ? WHERE id = ?', [form, id], function (error, results, fields) {
        if (error) throw error;
        res.send(results[0]);
        connection.destroy()
    })
})

adminRouter.delete('/api/articles/:id', (req, res) => {
    const connection = createConnection()
    const id = req.path.slice('/api/articles/'.length)
    connection.query('DELETE FROM articles WHERE id = ?', id, function (error, results, fields) {
        if (error) throw error;
        res.send(results[0]);
        connection.destroy()
    })
})

adminRouter.get('/api/login', (req, res) => {
    console.log(req.session.authenticated)
    // console.log(req.session)
    return res.send(Boolean(req.session.authenticated))
})

adminRouter.post('/api/login', (req, res) => {
    console.log(req.session.authenticated)
    const connection = createConnection()
    let form = JSON.parse(req.body.json)
    connection.query('SELECT email, password FROM admin_users WHERE email = ? AND password = ?', [form.email, form.password], function (error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            res.sendStatus(404)
            return
        }
        req.session.authenticated = true
        res.send(req.session.authenticated);
    })
})

adminRouter.get('/api/logout', (req, res) => {
    req.session.authenticated = false
    res.send(req.session.authenticated);
})

module.exports = adminRouter
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const session = require('cookie-session')
const app = express()
require('dotenv').config()
const env = process.env

function createConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DATABASE
    });
}

app.use(session({
    secret: env.SESSION_PWD,
    name: 'vue-express-blog',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
    },
}))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()) 
app.use('/img', express.static(__dirname + '/dist/img/'));
app.use('/css', express.static(__dirname + '/dist/css/'));
app.use('/js', express.static(__dirname + '/dist/js/'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'))
app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'))

app.route('/api/admin/articles')
    .get(function (req, res, next) {
        if (req.session.authenticated) {
            next()
        } else {
            res.sendStatus(403)
        }
    }, (req, res, ) => {
        const connection = createConnection()
        connection.query('SELECT id, title, is_published FROM articles', function (error, results, fields) {
            if (error) throw error;
            res.send(results);
            connection.destroy()
        })
    })
    .post(function (req, res, next) {
        if (req.session.authenticated) {
            next()
        } else {
            res.sendStatus(403)
        }
    }, (req, res) => {
        const connection = createConnection()
        let form = JSON.parse(req.body.json)
        connection.query('INSERT INTO articles SET ?', form, function (error, results, fields) {
            if (error) throw error;
            res.send(results[0]);
            connection.destroy()
        })
    })

app.route('/api/admin/articles/:id')
    .get(function (req, res, next) {
        if (req.session.authenticated) {
            next()
        } else {
            res.sendStatus(403)
        }
    }, (req, res) => {
        const connection = createConnection()
        const id = req.params.id
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
    .put(function (req, res, next) {
        if (req.session.authenticated) {
            next()
        } else {
            res.sendStatus(403)
        }
    }, (req, res) => {
        const connection = createConnection()
        const id = req.params.id
        let form = JSON.parse(req.body.json)
        connection.query('UPDATE articles SET ? WHERE id = ?', [form, id], function (error, results, fields) {
            if (error) throw error;
            res.send(results[0]);
            connection.destroy()
        })
    })
    .delete(function (req, res, next) {
        if (req.session.authenticated) {
            next()
        } else {
            res.sendStatus(403)
        }
    }, (req, res) => {
        const connection = createConnection()
        const id = req.params.id
        connection.query('DELETE FROM articles WHERE id = ?', id, function (error, results, fields) {
            if (error) throw error;
            res.send(results[0]);
            connection.destroy()
        })
    })

app.route('/api/admin/login')
    .get((req, res) => {
        return res.send(Boolean(req.session.authenticated))
    })
    .post((req, res) => {
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

app.route('/api/admin/articles/is_published/:id')
    .put(function (req, res, next) {
        if (req.session.authenticated) {
            next()
        } else {
            res.sendStatus(403)
        }
    }, (req, res) => {
        const connection = createConnection()
        const id = req.params.id
        connection.query('UPDATE articles SET is_published = true WHERE id = ?', id, function (error, result, filelds) {
            if (error) throw error;
            res.send("ok");
            connection.destroy()
        })
    })
    .delete(function (req, res, next) {
        if (req.session.authenticated) {
            next()
        } else {
            res.sendStatus(403)
        }
    }, (req, res) => {
        const connection = createConnection()
        const id = req.params.id
        connection.query('UPDATE articles SET is_published = false WHERE id = ?', id, function (error, result, filelds) {
            if (error) throw error;
            res.send("ok");
            connection.destroy()
        })
    })

app.get('/api/admin/auth', (req, res) => {
    let isLogin = false
    if (req.session.authenticated) {
        isLogin = true
    } 
    res.send(isLogin)
})

app.get('/api/admin/logout', (req, res) => {
    req.session.authenticated = false
    res.send(req.session.authenticated);
})

app.get('/api/user/articles', (req, res) => {
    const connection = createConnection()
    connection.query('SELECT id, title, created_at FROM articles WHERE is_published = true', function (error, results, fields) {
        if (error) throw error;
        if (!results) {
            res.sendStatus(404)
            return
        }
        res.send(results);
        connection.destroy()
    })
})

app.get('/api/user/articles/:id', (req, res) => {
    const connection = createConnection()
    const id = req.params.id
    connection.query('SELECT id, title, content, created_at FROM articles WHERE id = ? AND is_published = true', id, function (error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            res.sendStatus(404)
            return
        }
        res.send(results[0]);
        connection.destroy()
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
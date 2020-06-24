const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const session = require('express-session')
require('dotenv').config()
const env = process.env

router.use(session({
    secret: env.SESSION_PWD,
    name: 'vue-express-blog',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
    },
}))
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json())
router.use(function timeLog(req, res, next) {
    if (req.session.authenticated) {
        console.log('Time: ', Date.now())
        next()
    } else {
        res.sendStatus(403)
    }
    next()
})

function createConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DATABASE
    });
}

router.get('/articles', (req, res, ) => {
    const connection = createConnection()
    connection.query('SELECT id, title, is_published FROM articles', function (error, results) {
        if (error) throw error;
        connection.destroy()
        return res.send(results);
    })
})

router.get('/articles/:id', (req, res) => {
    const connection = createConnection()
    const id = req.params.id
    connection.query('SELECT id, title, content FROM articles WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        if (!results[0]) {
            return res.sendStatus(404)
        }
        connection.destroy()
        return res.send(results[0]);
    })
})

router.post('/articles', (req, res) => {
    const connection = createConnection()
    let form = JSON.parse(req.body.json)
    connection.query('INSERT INTO articles SET ?', form, function (error, results) {
        if (error) throw error;
        connection.destroy()
        return res.send(results[0]);
    })
})

router.put('/articles/:id', (req, res) => {
    const connection = createConnection()
    const id = req.params.id
    let form = JSON.parse(req.body.json)
    connection.query('UPDATE articles SET ? WHERE id = ?', [form, id], function (error, results) {
        if (error) throw error;
        connection.destroy()
        return res.send(results[0]);
    })
})

router.put('/articles/is_published/:id', (req, res) => {
    const connection = createConnection()
    const id = req.params.id
    connection.query('UPDATE articles SET is_published = true WHERE id = ?', id, function (error) {
        if (error) throw error;
        connection.destroy()
        return res.send("ok");
    })
})

router.delete('/articles/:id', (req, res) => {
    const connection = createConnection()
    const id = req.params.id
    connection.query('DELETE FROM articles WHERE id = ?', id, function (error, results) {
        if (error) throw error;
        connection.destroy()
        return res.send(results[0]);
    })
})

router.delete('/articles/is_published/:id', (req, res) => {
    const connection = createConnection()
    const id = req.params.id
    connection.query('UPDATE articles SET is_published = false WHERE id = ?', id, function (error) {
        if (error) throw error;
        connection.destroy()
        return res.send("ok");
    })
})

router.get('/auth', (req, res) => {
    let isLogin = false
    if (req.session.authenticated) {
        isLogin = true
    }
    return res.send(isLogin)
})

router.get('/login', (req, res) => {
    return res.send(req.session.authenticated)
})

router.post('/login', (req, res) => {
    const connection = createConnection()
    let form = JSON.parse(req.body.json)
    console.log(form)
    connection.query('SELECT email, password FROM admin_users WHERE email = ? AND password = ?', [form.email, form.password], function (error, results) {
        if (error) throw error;
        if (!results[0]) {
            return res.sendStatus(404)
        }
        req.session.authenticated = true
        res.send(req.session.authenticated);
    })
})

router.get('/logout', (req, res) => {
    req.session.authenticated = false
    return res.send(req.session.authenticated);
})

module.exports = router

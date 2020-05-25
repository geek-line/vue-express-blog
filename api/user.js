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
    if (Boolean(req.session.authenticated)) {
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

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('articles', (req, res) => {
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

router.get('articles/:id', (req, res) => {
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

module.exports = router
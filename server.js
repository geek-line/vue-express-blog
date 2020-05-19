const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
require('dotenv').config()
const env = process.env
const connection = mysql.createConnection({
    host: 'localhost',
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()) 
app.use('/img', express.static(__dirname + '/dist/img/'));
app.use('/css', express.static(__dirname + '/dist/css/'));
app.use('/js', express.static(__dirname + '/dist/js/'));
app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'))

app.get('/api/articles', (req, res) => {
    connection.query('SELECT id, title, content FROM articles', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
})

app.get('/api/articles/:id', (req, res) => {
    const id = req.path.slice('/api/articles/'.length)
    connection.query('SELECT id, title, content FROM articles WHERE id = ?', id, function (error, results, fields) {
        if (error) throw error;
        if (!results[0]) {
            res.sendStatus(404)
            return
        }
        res.send(results[0]);
    })
})

app.post('/api/articles', (req, res) => {
    let form = JSON.parse(req.body.json)
    connection.query('INSERT INTO articles SET ?', form, function (error, results, fields) {
        if (error) throw error;
        res.send(results[0]);
    })
})

app.put('/api/articles/:id', (req, res) => {
    const id = req.path.slice('/api/articles/'.length)
    let form = JSON.parse(req.body.json)
    connection.query('UPDATE articles SET ? WHERE id = ?', [form, id], function (error, results, fields) {
        if (error) throw error;
        res.send(results[0]);
    })
})

app.delete('/api/articles/:id', (req, res) => {
    const id = req.path.slice('/api/articles/'.length)
    connection.query('DELETE FROM articles WHERE id = ?', id, function (error, results, fields) {
        if (error) throw error;
        res.send(results[0]);
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
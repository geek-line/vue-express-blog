const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const session = require('cookie-session')
const app = express()
require('dotenv').config()
const env = process.env

app.use(
  session({
    secret: env.SESSION_PWD,
    name: 'vue-express-blog',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  }),
)
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use('/img', express.static(__dirname + '/dist/img/'))
app.use('/css', express.static(__dirname + '/dist/css/'))
app.use('/js', express.static(__dirname + '/dist/js/'))
app.use('/node_modules', express.static(__dirname + '/node_modules/'))
app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'))

app
  .route('/api/admin/articles')
  .get(
    function(req, res, next) {
      if (req.session.authenticated) {
        next()
      } else {
        res.sendStatus(403)
      }
    },
    (req, res) => {
      const options = {
        host: 'localhost',
        port: 5000,
        path: '/articles',
        method: 'GET',
      }
      http
        .request(options, function(response) {
          let str = ''
          response.on('data', function(chunk) {
            str += chunk
          })
          response.on('end', function() {
            res.send(str)
          })
        })
        .end()
    },
  )
  .post(
    function(req, res, next) {
      if (req.session.authenticated) {
        next()
      } else {
        res.sendStatus(403)
      }
    },
    (req, res) => {
      const options = {
        host: 'localhost',
        port: 5000,
        path: '/articles',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }
      const jsonReq = http.request(options, function(response) {
        let str = ''
        response.on('data', function(chunk) {
          str += chunk
        })
        response.on('end', function() {
          res.send(str)
        })
      })
      jsonReq.write(req.body.json)
      jsonReq.end()
    },
  )

app
  .route('/api/admin/articles/:id')
  .get(
    function(req, res, next) {
      if (req.session.authenticated) {
        next()
      } else {
        res.sendStatus(403)
      }
    },
    (req, res) => {
      const options = {
        host: 'localhost',
        port: 5000,
        path: '/articles/' + req.params.id,
        method: 'GET',
      }
      http
        .request(options, function(response) {
          let str = ''
          response.on('data', function(chunk) {
            str += chunk
          })
          response.on('end', function() {
            res.send(str)
          })
        })
        .end()
    },
  )
  .put(
    function(req, res, next) {
      if (req.session.authenticated) {
        next()
      } else {
        res.sendStatus(403)
      }
    },
    (req, res) => {
      const id = req.params.id
      const options = {
        host: 'localhost',
        port: 5000,
        path: '/articles/' + id,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      }
      const jsonReq = http.request(options, function(response) {
        let str = ''
        response.on('data', function(chunk) {
          str += chunk
        })
        response.on('end', function() {
          res.send(str)
        })
      })
      jsonReq.write(req.body.json)
      jsonReq.end()
    },
  )
  .delete(
    function(req, res, next) {
      if (req.session.authenticated) {
        next()
      } else {
        res.sendStatus(403)
      }
    },
    (req, res) => {
      const id = req.params.id
      const options = {
        host: 'localhost',
        port: 5000,
        path: '/articles/' + id,
        method: 'DELETE',
      }
      http
        .request(options, function(response) {
          let str = ''
          response.on('data', function(chunk) {
            str += chunk
          })
          response.on('end', function() {
            res.send(str)
          })
        })
        .end()
    },
  )

app
  .route('/api/admin/login')
  .get((req, res) => {
    return res.send(Boolean(req.session.authenticated))
  })
  .post((req, res) => {
    let form = JSON.parse(req.body.json)
    const options = {
      host: 'localhost',
      port: 5000,
      path: '/admin_users?email=' + form.email + '&password=' + form.password,
      method: 'GET',
    }
    http
      .request(options, function(response) {
        let str = ''
        response.on('data', function(chunk) {
          str += chunk
        })
        response.on('end', function() {
          let obj = JSON.parse(str)
          if (obj[0] === undefined) {
            res.sendStatus(404)
            return
          }
          req.session.authenticated = true
          res.send(req.session.authenticated)
        })
      })
      .end()
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
  res.send(req.session.authenticated)
})

app.get('/api/user/articles', (req, res) => {
  const options = {
    host: 'localhost',
    port: 5000,
    path: '/articles',
    method: 'GET',
  }
  http
    .request(options, function(response) {
      let str = ''
      response.on('data', function(chunk) {
        str += chunk
      })
      response.on('end', function() {
        res.send(str)
      })
    })
    .end()
})

app.get('/api/user/articles/:id', (req, res) => {
  const options = {
    host: 'localhost',
    port: 5000,
    path: '/articles/' + req.params.id,
    method: 'GET',
  }
  http
    .request(options, function(response) {
      let str = ''
      response.on('data', function(chunk) {
        str += chunk
      })
      response.on('end', function() {
        res.send(str)
      })
    })
    .end()
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

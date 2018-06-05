var path = require('path')

var express = require('express')
var hbs = require('express-handlebars')

var server = express()

// view engine config

var hbsConfig = {
  defaultLayout: 'main',
  extname: 'hbs'
}
server.engine('hbs', hbs(hbsConfig))
server.set('view engine', 'hbs')

// middleware

server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'public')))

// sample data

var data = {
  cats: [
    {
      id: 1, 
      name: 'fluffy',
      colour: 'brown',
      tails: 1,
      paws: 4,
      loves: 'mice',
      hates: 'rain'
    },
    {
      id: 2, 
      name: 'tick',
      colour: 'ginger',
      tails: 0.5,
      paws: 4,
      loves: 'tuna',
      hates: 'being awake'
    }
  ]
}

// routes

server.get('/', function (req, res) {
  res.redirect('/cats') // what is this doing?
})

server.get('/cats', function (req, res) {
  res.render('index', data)
})

server.get('/cats/new', function (req, res) {
  res.render('new')
})

server.get('/cats/:id', function (req, res) {
  console.log(req.params) // try going to /cats/1
  const id = req.params.id
  let cat = data.cats.find(function(element){
    return element.id === parseInt(id)
  })
  res.render('show', cat)
})

server.post('/cats', function (req, res) {
  console.log(req.body)
})

module.exports = server

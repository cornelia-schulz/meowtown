const path = require('path')

const express = require('express')
const hbs = require('express-handlebars')

const server = express()

const getJsonData = require('./handleJSON').getDataFromJson

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

// routes

server.get('/', function (req, res) {
  res.redirect('/cats') // what is this doing?
})

server.get('/cats', function (req, res) {
  getJsonData((err, data) => {
    if(err) {res.send('Error getting data.').status(500)}
    else {
      const cats = JSON.parse(data)
      res.render('index', cats)
    }
  })
})

server.get('/cats/new', function (req, res) {
  res.render('new')
})

server.get('/cats/:id', function (req, res) {
  const id = Number(req.params.id)
  getJsonData((err, data) => {
    if(err) {res.send('Error getting data.').status(500)}
    else {
      const cats = JSON.parse(data)
      let cat = cats.cats.find(function(cat){
        return cat.id === id
      })
      res.render('show', cat)
    }
    }) 
  })
  

  

server.post('/cats', function (req, res) {
  const name = req.body.name
  const image = req.body.image
  const story = req.body.life-story

  console.log(req.body)
})

module.exports = server

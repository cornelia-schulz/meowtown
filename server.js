const path = require('path')

const express = require('express')
const hbs = require('express-handlebars')

const server = express()

const getJsonData = require('./handleJSON').getDataFromJson
const writeToJson = require('./handleJSON').writeDataToJson

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
  const newCat = req.body
  
  getJsonData((err, data) => {
    if(err) {res.send('Error getting data.').status(500)}
    else {
      const cats = JSON.parse(data)
      cats.cats.push({
        id: cats.cats.length + 1,
        name: newCat.name,
        colour: newCat.colour,
        story: newCat.story,
        loves: newCat.loves,
        hates: newCat.hates,
        image: newCat.image
      })
      const newCats = JSON.stringify(cats, null, 3)
      writeToJson(newCats, ((err, data) => {
        if (err) {res.send('Error writing data.').status(500)}
        else 
        {
          res.redirect('/')
        }
      }))
    }
  })
})

server.get('/cats/edit/:id', function (req, res) {
  const id = Number(req.params.id)
  getJsonData((err, data) => {
    if(err) {
      res.send('Error getting data.').status(500)
    }
    else {
      const cats = JSON.parse(data)
      let cat = cats.cats.find(function(cat){
        return cat.id === id
      })
      console.log(cat)
      res.render('edit', cat)
    }
    }) 
  })

  server.post('/cats/:id', function (req, res) {
    const editedCat = (req.body)
    getJsonData((err, data) => {
      if(err) {
        res.send('Error reading data.').status(500)
      }
      else {
        const cats = JSON.parse(data)
        cats[editedCat.id-1].name = editedCat.name
        cats[editedCat.id-1].colour = editedCat.colour
        cats[editedCat.id-1].story = editedCat.story
        cats[editedCat.id-1].loves = editedCat.loves
        cats[editedCat.id-1].hates = editedCat.hates
        cats[editedCat.id-1].image = editedCat.image
        console.log(cats)
        writeToJson(cats, (err, data) => {
          if(err) {
            res.send('Error writing data.').status(500)
          }
          else {
            console.log(data)
            res.redirect('/cats/')
          }
        })
      }
    })
  })

module.exports = server

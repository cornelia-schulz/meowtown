const server = require('./server')
const fs = require('fs')
const path = require('path')

function getDataFromJson(callback){
    const filePath = path.join(__dirname, 'cats.json')
    fs.readFile(filePath, 'utf8', callback)
}

function writeDataToJson(fileData, callback){
    const filePath = path.join(__dirname, 'cats.json')
    fs.writeFile(filePath, fileData, 'utf8', callback)
}

module.exports = {
    getDataFromJson,
    writeDataToJson
}
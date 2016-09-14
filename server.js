'use strict'

// 3rd Party Modules
const express = require('express')
const { load } = require('cheerio')
const fetch = require('node-fetch')
const routes = require('./routes/') // same as ./routes/index.js
// Project Modules
const parseData = require('./parse-data')
const [,,...Args] = process.argv
const url = `https://github.com/${Args}`

// Initialize
const app = express()

// Configure
const port = process.env.Port || 3000
app.set('port', port)
app.set('view engine', 'pug')

// Middlewares
// To serve static files such as images, CSS files, and JavaScript files
app.use(express.static('public'))

fetch('https://github.com/bmdoane')
  .then((res) => {
      return res.text();
  })
  .then((body) => {
    const $ = load(body);
    // Parsing each square from grid
    const daySquare = $('rect')
    // Creating array of days (passing in day and getting its properties)
    const yearBlock = Array.from(daySquare, x => x.attribs)
    //console.log("year", yearBlock);
    return yearBlock
  })
  .then((array) => {
  	//console.log('array', array)
  	return parseData(array)
  })
  .then((dataObj) => {
  	const { day, week, month} = dateObj
		app.get('/', (req, res) => {
			//res.render('index', {user: `${Args[0]}`, day, week, month})
			res.render('index', { day, week, month})
		})
  })


// Routes


// 404 catch and forward to error handler
// app.use((req, res) => {
// 	res.render('404')
// })

// Listen to requests on the provided port and log when available
app.listen(port, () => {
	console.log(`Listening on port: ${port}`)
})
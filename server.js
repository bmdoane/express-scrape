#!/usr/bin/env node
'use strict'

// 3rd Party Modules
const express = require('express')
const { load } = require('cheerio')
const fetch = require('node-fetch')
const routes = require('./routes/') // same as ./routes/index.js
// Project Modules
const parseData = require('./parse-data')
const buildStrings = require('./build-strings')

const [,,...Args] = process.argv
const url = `https://github.com/${Args[0]}`

// Initialize
const app = express()

// Configure
const port = process.env.Port || 3000
app.set('port', port)
app.set('view engine', 'pug')

// Middlewares
// To serve static files such as images, CSS files, and JavaScript files
app.use(express.static('public'))

fetch(url)
  .then((res) => {
      return res.text();
  })
  .then((body) => {
    const $ = load(body);
    // Parsing each square from grid
    const daySquare = $('rect')
    // Creating array of days (passing in day and getting its properties)
    const yearBlock = Array.from(daySquare, x => x.attribs)
    return yearBlock
  })
  .then((array) => {
  	//console.log('array', array)
  	return parseData(array)
  })
  .then((dataObj) => {
  	const { day, week, month} = dataObj
  	let dayCount = day[0]['data-count']
  	let weekCount = week.map(x => x['data-count']).map(x => Number(x)).reduce( (prev, curr) => prev + curr )
  	let monthCount = month.map(x => x['data-count']).map(x => Number(x)).reduce( (prev, curr) => prev + curr )
		app.get('/', (req, res) => {
			//res.render('index', {user: `${Args[0]}`, day, week, month})
			res.render('index', { name: `${Args[0]}`, dayCount, weekCount, monthCount})
		})
  })


// Listen to requests on the provided port and log when available
app.listen(port, () => {
	console.log(`Listening on port: ${port}`)
})
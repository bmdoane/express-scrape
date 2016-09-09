'use strict'

const express = require('express')
const cheerio = require('cheerio')
// const fetch = require('fetch')
const routes = require('./routes/') // same as ./routes/index.js

// Initialize
const app = express()

// Configure
const port = process.env.Port || 3000
app.set('port', port)

app.set('view engine', 'pug')

// Keeps variable set at runtime to keep pug string from minifying
if (process.env.NODE_ENV !== 'production') {
	app.locals.pretty = true
}

// app.locals.......

// Middlewares
// To serve static files such as images, CSS files, and JavaScript files
app.use(express.static('public'))

// Routes
app.get('/', (req, res) => {
	res.render('index')
})



// 404 catch and forward to error handler
// app.use((req, res) => {
// 	res.render('404')
// })

// Listen to requests on the provided port and log when available
app.listen(port, () => {
	console.log(`Listening on port: ${port}`)
})
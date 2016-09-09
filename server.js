'use strict'

const express = require('express')
const cheerio = require('cheerio')
const fetch = require('fetch')
const routes = require('./routes/') // same as ./routes/index.js

// Initialize
const app = express()

// Configure
const port = process.env.Port || 3000
app.set('port', port)

// app.set('view engine', 'pug')

// if (process.env.Node_ENV !== 'production') {
// 	app.locals.pretty = true
// }

// app.locals.......

// Middlewares


// Routes
app.get('/', (req, res) =>
	res.send('<h1>Welcome to MyApp!</h1>')
)



// 404 catch and forward to error handler
// app.use((req, res) => {
// 	res.render('404')
// })

// Listen to requests on the provided port and log when available
app.listen(port, () => {
	console.log(`Listening on port: ${port}`)
})
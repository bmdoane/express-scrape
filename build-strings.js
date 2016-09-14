'use strict'

const { writeFile } = require('fs')

module.exports = (dataObj) => {
	writefile('day.json',JSON.stringify(dataObj.day), (err) => {if(err) throw err})
	writeFile('week.json',JSON.stringify(dataObj.week), (err) => {if(err) throw err})
	writeFile('month.json',JSON.stringify(dataObj.month), (err) => {if(err) throw err})
}
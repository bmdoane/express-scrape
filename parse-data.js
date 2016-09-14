'use strict'

module.exports = (array) => {
	// Array was returning tomorrow
	array.length = array.length - 1
	let day, week, month, length = array.length
	day = array.slice(length - 1)
	week = array.slice(length - 7)
	month = array.slice(length - 31)

	return { day, week, month }
}
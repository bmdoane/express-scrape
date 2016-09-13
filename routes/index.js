'use strict'
// Destructuring Router method from express
var { Router } = require('express');
var router = Router();

router.get('/', (req, res) =>
  res.render('index')
)


module.exports = router
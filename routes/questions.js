var express = require('express');
var router = express.Router();

/* show query results */
router.get('/', function(req, res, next) {
  var userQuery = '';
  for (var prop in req.query) {
   userQuery = prop;
  }

  res.render('questions', {title: 'rough search results', userQuery: userQuery });
});

module.exports = router;

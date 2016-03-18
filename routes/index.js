var express = require('express');
var router = express.Router();

var Bird = require('../models/bird.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Ask the schema to find all Bird documents.
  //Results provided via callback
  Bird.find(function(err, birdDocs){
    if (err) { return next(err); }
    return res.render('index', { birds: birdDocs , error : req.flash('error') });
  });
});

router.post('/', function(req, res, next) {

  //As are not requiring every field, remove any empty fields from req.body
  for (var att in req.body) {
    if (req.body[att] === '') {
      delete(req.body[att])
    }
  }
  //Create new Bird object from req.body
  var newSighting = Bird(req.body);
  //And request that is it saved. Use callback to verify success or report error.
  newSighting.save(function(err){
      //Handle validation errors
    if (err) {
      console.log(err);
      if (err.name == "ValidationError") {
        req.flash('error', 'Invalid data'); // TODO: more helpful error message
        return res.redirect('/')
      }
      //Handle duplication errors. For our schema, we can't have two birds with same name
      if (err.code == 11000) {   //MongoDB duplicate key error
        req.flash('error', 'A bird with that name already exists')
        return res.redirect('/')
      }
      //Some other error - pass to app error handler
      return next(err);
    }
    //If no error, bird created. Redirect to reload list of birds.
    res.status(201);  //created.
    return res.redirect('/');  //get the home page
  });
});




// router.post('/', function(req, res, next) {
//
//   //Since we are not requiring every field, let's
//   //Remove any empty fields from the req.body
//   for (var att in req.body) {
//     if (req.body[att] === '') {
//       delete(req.body[att])
//     }
//   }
//
//   //Create new Bird object from req.body
//   var newSighting = Bird(req.body);
//   //And request that is it saved. Use callback to verify success or report error.
//   newSighting.save(function(err){
//     if (err) {
//       //Pass to app error handler
//       return next(err);
//     }
//     //If no error, bird created. Redirect to reload list of birds.
//     res.status(201);  //created.
//     return res.redirect('/');  //get the home page
//   });
// });


module.exports = router;

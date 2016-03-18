var mongoose = require("mongoose")
var Schema = mongoose.Schema;

/* A bird-watcher database.
Record types of birds, date spotted,
some other information.
*/
/*
var birdSchema = new Schema({
  name : String,
  description : String,
  averageEggsLaid : Number,     //Handles both integer and float numbers
  threatened : Boolean,   //Is bird vulnerable to extinction?
  dateSeen : Date        //Date spotted in the wild
});
*/
//
// var birdSchema = new Schema({
//   name : { type : String,
//     required : true,
//     unique : true,
//     lowercase : true },    //Convert to lowercase - helpful for validating uniqueness
//   description : String,
//   averageEggsLaid : { type : Number, min : 1, max: 50 },
//   threatened : { type : Boolean, default : false },     //Is bird vulnerable to extinction?
//   datesSeen : [ { type : Date, default : Date.now } ]
// });
//

var birdSchema = new Schema({
  name : String,
  description : String,
  averageEggsLaid : {type : Number,  min : 1, max : 50},     //Handles both integer and float numbers
  threatened : Boolean,   //Is bird vulnerable to extinction?
  //nested data...
  nestData : { location: String, materials : String },
  //array of dates bird has been sighted
  datesSeen : [ Date ]
});


var Bird = mongoose.model('Bird', birdSchema);


module.exports = Bird;

/*
*/



/*

*/

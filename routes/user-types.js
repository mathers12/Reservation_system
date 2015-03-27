var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');


/* GET User Types listing. */
router.get('/', function(req, res) {
  mongoose.model('user_types').find({}).exec(function (err, userTypes){
    res.send(userTypes);
  });
});

/* GET states and export them to file. */
router.get('/write', function(req, res) {
  mongoose.model('user_types').find({}).exec(function (err, userTypes){
    var outputFilename = "data/user-types_out.json";

    fs.writeFileSync(outputFilename, JSON.stringify(userTypes, null, '\t'));
    console.log("JSON saved to " + outputFilename);

    res.send(userTypes);
  });
});

/* POST of adding a User Type. */
router.post('/add',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var AddUserTypeSchema = mongoose.model('user_types');
  var addUserType = new AddUserTypeSchema(req.body);

  console.log("SAVE: UserType Object with User Type name: "+addUserType.name + " and User Type number: " + addUserType.num);
  return addUserType.save(function (err) {
    if (!err) {
      res.send(addUserType);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

/* POST of modifying User Type. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: UserType Object with User Type name: "+req.body.name + " and User Type number: " + req.body.num);
  return mongoose.model('user_types').findOne({_id: req.body._id}, function (err, userType) {
    if (!err) {
      userType.name = req.body.name;
      userType.num = req.body.num;
      userType.save();
      console.log("modified");
      return res.send(userType);
    } else {
      console.log(err);
    }
  });
});


/* DELETE User Type from DB. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: User Type Object with _id: "+req.params.id);
  return mongoose.model('user_types').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return res.status(200);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});

module.exports = router;

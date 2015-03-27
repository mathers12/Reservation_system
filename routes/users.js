var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET Users listing. */
router.get('/', function(req, res) {
  mongoose.model('users').find({}).sort({last_name:1}).exec(function (err, users){
    mongoose.model('users').populate(users, {path: 'profiles'}, function(err, users) {
      mongoose.model('users').populate(users, {path: 'seats'}, function(err, users) {
        res.send(users);
      });
    });
  });
});

/* DELETE User from DB. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: Object with _id: "+req.params.id);
  return mongoose.model('users').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return res.status(200);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});

/* POST of adding a User. */
router.post('/add',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var AddUserSchema = mongoose.model('users');
  var addedUser = new AddUserSchema(req.body);

  console.log("SAVE: User Object with email: "+addedUser.profile.email);
  return addedUser.save(function (err) {
    if (!err) {
      res.send(addedUser);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

/* POST of modifying User. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: User Object with email: "+req.body.profile.email);
  return mongoose.model('users').findOne({_id: req.body._id}, function (err, user) {
    if (!err) {
      user.profile = req.body.user.profile._id;
      user.save();
      console.log("modified");
      return res.status(200);
    } else {
      console.log(err);
      return res.send(err);
    }
  });
});

/* GET Users and export them to a file. */
router.get('/write', function(req, res) {
  mongoose.model('users').find({}).sort({last_name:1}).exec(function (err, users) {
    mongoose.model('users').populate(users, {path: 'profiles'}, function (err, users) {
      mongoose.model('users').populate(users, {path: 'seats'}, function (err, users) {
        mongoose.model('users').populate(users, {path: 'address'}, function (err, users) {
          mongoose.model('users').populate(users, {path: 'userTypes'}, function (err, users) {

            var outputFilename = "data/users_out.json";

            fs.writeFileSync(outputFilename, JSON.stringify(users, null, '\t'));
            console.log("JSON saved to " + outputFilename);

            res.send(users);
          });
        });
      });
    });
  });
});

module.exports = router;

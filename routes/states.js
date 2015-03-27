var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET states listing. */
router.get('/', function(req, res) {
  mongoose.model('states').find({}).exec(function (err, states){
    console.log("States sent to client...");
    res.send(states);
  });
});

/* POST of modifying states. */

/* GET states and export them to file. */
router.get('/write', function(req, res) {
  mongoose.model('states').find({}).exec(function (err, states){
    var outputFilename = "data/states_out.json";

    fs.writeFileSync(outputFilename, JSON.stringify(states, null, '\t'));
    console.log("JSON saved to " + outputFilename);

    res.send(states);
  });
});

/* POST of adding a state. */
router.post('/add',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var AddStateSchema = mongoose.model('states');
  var addState = new AddStateSchema(req.body);
  console.log("SAVE: State Object with state name: "+addState.name + " and state number " + addState.num);
  return addState.save(function (err) {
    if (!err) {
      res.send(addState);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

/* POST of modifying state. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: State Object with state name: "+req.body.name + " to state number: " + req.body.num);
  return mongoose.model('states').findOne({_id: req.body._id}, function (err, state) {
    if (!err) {
      state.name = req.body.name;
      state.num = req.body.num;
      state.save();
      console.log("modified");
      return res.send(state);
    } else {
      console.log(err);
    }
  });
});


/* DELETE State from DB. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: Object with _id: "+req.params.id);
  return mongoose.model('states').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return function (){
        mongoose.model('states').find({}).exec(function (err, states){
            res.send(states);
        });
      };
    } else {
      console.log(err);
    }
  });
});
module.exports = router;

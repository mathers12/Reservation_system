var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res) {
  mongoose.model('parts').find({}).sort({order:1}).exec(function (err, parts){
    mongoose.model('parts').populate(parts, {path: 'tables'}, function(err, parts) {
      mongoose.model('parts').populate(parts, {path: 'room'}, function(err, parts) {
        console.log("Parts sent to client...");
        res.send(parts);
      });
    });
  });
});


/* GET Parts and export them to a file. */
router.get('/write', function(req, res) {
  mongoose.model('parts').find({}).sort({order:1}).exec(function (err, parts){
    var outputFilename = "data/parts_out.json";

    fs.writeFileSync(outputFilename, JSON.stringify(parts, null, '\t'));
    console.log("JSON saved to " + outputFilename);

    res.send(parts);
  });
});

/* POST of adding a part. */
router.post('/add',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var AddPartSchema = mongoose.model('parts');
  var addedPartToRoomSchema = mongoose.model('rooms');

  var addPart = {
    name: req.body.name,
    order: req.body.order,
    positioning: req.body.positioning,
    room: req.body.room._id
  };
  var addedPart = new AddPartSchema(addPart);
  console.log("SAVE: Part Object with name: "+addedPart.name + " to Part order " + addedPart.order);
  return addedPart.save(function (err,part) {
      console.log("PARTTT "+part._id);
      console.log("ROOM ID "+req.body.room._id);
    if (!err) {
        addedPartToRoomSchema.findOneAndUpdate(

            {_id: req.body.room._id},
            {$push: {"parts": part._id}},
            {safe: true, upsert: true},
            function (err, model) {
                console.log("MODEL "+model);
                if (!err) res.send(addedPart);
            }
        );

    } else {
      console.log(err);
      res.send(err);
    }
  });
});

/* POST of modifying part. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: Part Object with name: "+req.body.name + " to Part order " + req.body.order);
  return mongoose.model('parts').findOne({_id: req.body._id}, function (err, part) {
    if (!err) {
      //var state = new mongoose.Schema.ObjectId();
      part.order = req.body.order;
      part.name = req.body.name;
      part.positioning = req.body.positioning;
      part.room = req.body.room;
      part.save();
      console.log(part);
      mongoose.model('rooms').findOne({_id: req.body.room}, function (err, room) {
        if (!err) {
          var part = {_id: req.body._id};
          room.parts.push(part);
          room.save();
          console.log("modified");
          return res.send(part);
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
});

/* DELETE Part from DB. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: Object with _id: "+req.params.id);
  return mongoose.model('parts').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return function (){
        mongoose.model('parts').find({}).exec(function (err, parts){
          mongoose.model('parts').populate(parts, {path: 'room'}, function(err, parts) {
            res.send(parts);
          });
        });
      };
    } else {
      console.log(err);
    }
  });
});

module.exports = router;

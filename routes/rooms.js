var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res) {
  mongoose.model('rooms').find({},{}).sort({order:1}).exec(function (err, rooms){
    mongoose.model('rooms').populate(rooms, {path: 'parts'}, function(err, rooms) {
      console.log("Sended Array of Rooms...");
      res.send(rooms);
    });
  });
});


router.get('/write', function(req, res) {
  mongoose.model('rooms').find({}).sort({order:1}).exec(function (err, rooms){
    var outputFilename = "data/rooms_out.json";

    fs.writeFileSync(outputFilename, JSON.stringify(rooms, null, '\t'));
    console.log("JSON saved to " + outputFilename);

    res.send(rooms);
  });
});

/* POST of adding a Room. */
router.post('/add',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var AddRoomSchema = mongoose.model('rooms');
  var addRoom = {
    name: req.body.name,
    order: req.body.order,
    positioning: req.body.positioning
  };
  var addedRoom = new AddRoomSchema(addRoom);

  console.log("SAVE: Room Object with name: "+addedRoom.name + " to Room order " + addedRoom.order);
  return addedRoom.save(function (err) {
    if (!err) {
      res.send(addedRoom);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

/* POST of modifying Room. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: Room Object with name: "+req.body.name + " to Room order: " + req.body.order + ", with Positioning: " + req.body.positioning);
  return mongoose.model('rooms').findOne({_id: req.body._id}, function (err, room) {
    if (!err) {
      //var state = new mongoose.Schema.ObjectId();
      room.order = req.body.order;
      room.name = req.body.name;
      room.positioning = req.body.positioning;
      room.save();
      console.log("modified");
      return res.send(room);
    } else {
      console.log(err);
      return res.statusCode(500);
    }
  });
});

/* DELETE Part from DB. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: Object with _id: "+req.params.id);
  return mongoose.model('rooms').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return function (){
        mongoose.model('rooms').find({}).sort({order:1}).exec(function (err, rooms){
          //mongoose.model('rooms').populate(rooms, {path: 'parts'}, function(err, rooms) {
            res.send(rooms);
          //});
        });
      };
    } else {
      console.log(err);
    }
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

/* GET tables listing. */
router.get('/', function(req, res) {
  mongoose.model('tables').find({}).sort({order:1}).exec(function (err, tables){
    mongoose.model('tables').populate(tables, {path: 'part'}, function(err, tables) {
      mongoose.model('tables').populate(tables, {path: 'room'}, function(err, tables) {
        mongoose.model('tables').populate(tables,{path:'seats'}, function(err, tables){
          res.send(tables);
        });
      });
    });
  });
});

/* POST of adding a seat. */
router.post('/add',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  var AddTableSchema = mongoose.model('tables');
  var addedTableToPartSchema = mongoose.model("parts");
  var addedTable = new AddTableSchema(req.body);
  console.log("SAVE: Seat Object with table order " + addedTable.order);
  return addedTable.save(function (err,table) {
    if (!err) {
        addedTableToPartSchema.findOneAndUpdate(

            {_id: req.body.part},
            {$push: {tables: table._id}},
            {safe: true, upsert: true},
            function (err) {
                if (!err) {
                    res.send(addedTable);

                }

            }
        );
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

/* POST of modifying table. */
router.post('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: Object with id: "+req.params.id);
  return mongoose.model('tables').findOne(req.body._id).exec(function (err, table) {
    if (!err) {

      // this is unique for every object

      table.full_name = req.body.full_name;
      table.state = req.body.state;
      table.save();
      console.log("modified");
      return res.send(table);
    } else {
      console.log(err);
    }
  });
});

/* POST of modifying Table. */
router.post('/',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("SAVE: Object: "+req.body._id+" with Table order: "+req.body.order);
  return mongoose.model('tables').findOne({_id: req.body._id}).exec(function (err, table) {
    if (!err) {
      // this is unique for every object
      table.order = req.body.order;
      table.part = req.body.part;
      table.room = req.body.room;
      table.save();
      console.log("modified");
      return res.status(200);
    } else {
      console.log(err);
    }
  });
});

/* GET seats listing. */
router.delete('/:id',function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // Create a new message model, fill it up and save it to Mongodb
  console.log("DELETE: Object with _id: "+req.params.id);
  return mongoose.model('tables').findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      console.log("removed");
      return function (){
        mongoose.model('tables').find({}).exec(function (err, tables){
          //mongoose.model('tables').populate(tables, {path: 'table_seats'}, function(err, tables) {
            res.send(tables);
          //});
        });
      };
    } else {
      console.log(err);
    }
  });
});

/* GET tables and export them to a file. */
router.get('/write', function(req, res) {
  mongoose.model('tables').find({}).sort({order:1}).exec(function (err, tables){
    var outputFilename = "data/tables_out.json";

    fs.writeFileSync(outputFilename, JSON.stringify(tables, null, '\t'));
    console.log("JSON saved to " + outputFilename);

    res.send(tables);
  });
});

module.exports = router;

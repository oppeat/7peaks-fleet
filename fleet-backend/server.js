var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require('mysql2') ;

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Please change connection detail to match your local mysql connection
const db = mysql.createConnection({ 
  host: 'localhost', 
  user: 'root',
  password: 'root',
  database: 'db_vehicletracking'
})

db.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

// Vehicle Module
app.post('/vehicle/register', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (!(req.body.userId && req.body.vehicleId)){
    return res.status(400).json({status: 400, message: "Body content userId and vehicleId are required"})
  }
  db.execute(
    'SELECT * FROM `users` WHERE `id`= ?',
    [req.body.userId],
    function(err, results, fields) {
      if (err){
        return res.status(400).json({status: 400, message: err.message})
      }
      if(results.length == 0){
        return res.status(400).json({status: 400, message: "UserId not exists"})
      }
      else{
        db.execute(
          'INSERT INTO `vehicles` (vehicleId,dateCreate) VALUES (?,?)',
          [req.body.vehicleId,new Date()],
          function(err, results, fields) {
            if (err){
              return res.status(400).json({status: 400, message: err.message})
            }
          }
        );
        db.execute(
          'INSERT INTO `user_vehicles` (userId,vehicleId) VALUES (?,?)',
          [req.body.userId,req.body.vehicleId],
          function(err, results, fields) {
            if (err){
              return res.status(400).json({status: 400, message: err.message})
            }
            res.json(results);
          }
        );
      }
    }
  );
})

app.post('/vehicle/update/:id', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params
  if (!id){
    return res.status(400).json({status: 400, message: "Parameter vehicleId is required"})
  }
  if (!(req.body.lat && req.body.lon && req.body.userId)){
    return res.status(400).json({status: 400, message: "Body content lat,lon and userId are required"})
  }

  db.execute(
    'SELECT * FROM `user_vehicles` WHERE `vehicleId` = ? AND `userId` = ?',
    [id,req.body.userId],
    function(err, results, fields) {
      if (err){
        return res.status(400).json({status: 400, message: err.message})
      }
      if(results.length == 0){
        return res.status(400).json({status: 400, message: "Please make sure that current vehicleId is registered to current userId"})
      }
      else{
        db.execute(
          'INSERT INTO `vehicle_location` (vehicleId,latitude,longitude,createDate) VALUES (?,?,?,?)',
          [id,req.body.lat,req.body.lon,new Date()],
          function(err, results, fields) {
            if (err){
              return res.status(400).json({status: 400, message: err.message})
            }
            res.json(results);
          }
        );
      }
    }
  );
})

app.get('/vehicle', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  db.execute(
    'SELECT * FROM `vehicles` ORDER BY `dateCreate` DESC',
    function(err, results, fields) {
      if (err){
        return res.status(400).json({status: 400, message: err.message})
      }
      res.json(results);
    }
  );
})

app.get('/vehicle/position/:id', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { id } = req.params
  if (!id){
    return res.status(400).json({status: 400, message: "Parameter vehicleId is required"})
  }

  db.execute(
    'SELECT * FROM `vehicles` WHERE `vehicleId` = ? ',
    [id],
    function(err, results, fields) {
      if (err){
        return res.status(400).json({status: 400, message: err.message})
      }
      if(results.length == 0){
        return res.status(400).json({status: 400, message: "Invalid vehicleId"})
      }
      else{
        db.execute(
          'SELECT * FROM `vehicle_location` WHERE `vehicleId` = ? ORDER BY `createDate` DESC',
          [id],
          function(err, results, fields) {
            if (err){
              return res.status(400).json({status: 400, message: err.message})
            }
            res.json(results);
          }
        );
      }
    }
  );
})

app.listen(9000, () => {
  console.log('Application is running on port 9000')
})
let express = require('express')
let ejs = require('ejs')
var env = require('dotenv').config()
let mongoose = require('mongoose')
const MongoClient = require("mongodb").MongoClient;
let bodyParser = require('body-parser')
let bluebird = require('bluebird')
mongoose.Promise = bluebird;
let app = express()
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var session = require('express-session');

mongoose.connect('mongodb://127.0.0.1:27017/pagination', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

app.get("/search", function(req, res) {
  const substring = req.query.substring;
  MongoClient.connect("mongodb://127.0.0.1:27017/pagination", function(err, db) {
    if (err) throw err;
    const dbo = db.db("pagination");
    dbo.collection("user").find({ name: { $regex: substring } }).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});



let mainRoutes = require('./routes/main')
app.use(mainRoutes)

app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log('Runing on port ' + 3000)
})
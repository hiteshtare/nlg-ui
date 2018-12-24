//Node Modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

//Initialize express app
var app = express();

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(cors());

//Cross Origin Resource Scripting
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Host static files
app.use(express.static('www'));

//Port number
var port = process.env.PORT || 5000;

//Start the server
app.listen(port, function () {
  console.log(`Server is listening on port: ${port}`);
});

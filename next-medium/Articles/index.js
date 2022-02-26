var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var app = express();

const MONGODB_URI = 'mongodb://localhost:27017/Articles';

console.log('connecting to db...');

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error(err.message));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

require('./app/routes')(app);

app.set('port', 80);
app.listen(app.get('port'), function () {
  console.log('Server up: http://localhost:' + app.get('port'));
});

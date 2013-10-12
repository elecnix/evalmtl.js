var express = require('express');
var app = express();
var path = require('path');
var pg = require('pg');
var street = require('./routes/streets');
app.use(express.logger());

app.use(app.router);
console.log('static: ' + path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/streets', street.search);
app.get('/streets/:id', street.get);

app.use('/', express.static(path.join(__dirname, 'index.html')));

app.get('/properties', function(req, res){
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      console.log(err);
      return res.send(err);
    }
    client.query('SELECT * FROM evaluations_2014 limit 10', function(err, result) {
      done();
      if(err) {
        console.log(err);
        return res.send(err);
      }
      res.send(result.rows);
    });
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});


var express = require('express');
var app = express();
var pg = require('pg');
app.use(express.logger());
app.get('/', function(req, res){
  res.send('<a href="/streets">Streets</a> <a href="/properties">Properties</a>');
});
app.get('/properties', function(req, res){
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      return res.send(err);
    }
    client.query('SELECT * FROM evaluations_2014 limit 10', function(err, result) {
      done();
      if(err) {
        return res.send(err);
      }
      res.send(result.rows);
    });
  });
});
app.get('/streets', function(req, res){
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      return res.send(err);
    }
    client.query('SELECT * FROM streets', function(err, result) {
      done();
      if(err) {
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


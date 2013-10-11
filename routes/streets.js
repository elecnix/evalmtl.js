var pg = require('pg');
exports.search = function(req, res){
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      console.log(err);
      return res.send(err);
    }
    var query;
    var params = [];
    if (req.query.q) {
      query = "SELECT street_name as name, borough, city FROM streets WHERE street_name ILIKE $1 LIMIT 50"
      params = ['%' + req.query.q + '%'];
    } else {
      query = "SELECT street_name as name, borough, city FROM streets"
    }
    client.query(query, params, function(err, result) {
      done();
      if(err) {
        console.log(err);
        return res.send(err);
      }
      res.send(result.rows);
    });
  });
};


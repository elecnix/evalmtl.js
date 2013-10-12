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
      query = "SELECT id, street_name as name, borough, city FROM streets WHERE street_name ILIKE $1 LIMIT 50";
      params = ['%' + req.query.q + '%'];
    } else {
      query = "SELECT id, street_name as name, borough, city FROM streets";
    }
    client.query(query, params, function(err, result) {
      done();
      if(err) {
        console.log(err);
        return res.send(500, err);
      }
      res.send(result.rows);
    });
  });
};
exports.get = function(req, res){
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      console.log(err);
      return res.send(err);
    }
    var street_id = req.params.id;
    console.log("Loading street " + street_id);
    client.query("SELECT id, street_name as name, borough, city FROM streets WHERE id = $1", [street_id], function(err, result) {
      if(err) {
        console.log(err);
        return res.send(500, err);
      }
      var street = result.rows[0];
      client.query("SELECT adresse, superficie, valeur_terrain, valeur_batiment, valeur_imposable, nb_etages, annee_construction, aire_etages, nb_logements, nb_locaux_non_residentiels, nb_chambres_locatives, valeur_immeuble_anterieur, valeur_non_imposable_immeuble FROM evaluations_2014 WHERE street_id = $1", [street_id], function(err, result) {
        done();
        if(err) {
          console.log(err);
          return res.send(500, err);
        }
        street.properties = result.rows;
        res.send(street);
      });
    });
  });
};

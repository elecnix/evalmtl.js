# evalmtl.js

Web frontend for Évaluations foncières de Montréal.

## 1. Scrape and export to PostgreSQL

Follow instructions at https://github.com/elecnix/evalmtl

# 2. Create streets table

    $ psql -d evalmtl
    evalmtl=# CREATE TABLE streets AS SELECT row_number() OVER (ORDER BY street_name, arrondissement, municipalite) AS id, street_name, arrondissement AS borough, municipalite AS city FROM evaluations_2014 GROUP BY street_name, arrondissement, municipalite;
    evalmtl=# ALTER TABLE streets ADD PRIMARY KEY (id);
    evalmtl=# CREATE INDEX ON streets (street_name);

## 3. Install node modules, assuming NPM is already installed:

    npm install

## 4. Run!

    DATABASE_URL=postgres://user:pass@localhost/evalmtl node app

Or push to Heroku:

    heroku create
    heroku addons:add heroku-postgresql:dev
    git push heroku master
    heroku open


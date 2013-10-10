# evalmtl.js

Web frontend for Évaluations foncières de Montréal.

## 1. Scrape and export to PostgreSQL

Follow instructions at https://github.com/elecnix/evalmtl

# 2. Create streets table

    $ psql -d evalmtl
    evalmtl=# create table streets as select distinct street_name, arrondissement as borough, municipalite as city from evaluations_2014;

## 3. Install node modules, assuming NPM is already installed:

    npm install

## 4. Run!

    DATABASE_URL=postgres://user:pass@localhost/evalmtl node app

Or push to Heroku:

    heroku create
    heroku addons:add heroku-postgresql:dev
    git push heroku master
    heroku open


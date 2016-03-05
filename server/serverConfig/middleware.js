'use strict';
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var config = require('../config');
var utils = require('./utils');


<<<<<<< HEAD
passport.use(new GitHubStrategy({
  clientID: config.githubClientId,
  clientSecret: config.githubSecret,
  callbackURL: 'http://104.236.168.119:3000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
  done(null, {
    accessToken: accessToken,
    profile: profile
  });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
=======
module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(session( {
    secret: 'it\'s a secret',
    resave: false,
    saveUninitialized: false
  }));

  app.use(utils.unless('/login/auth', function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      /* If there is no active user session, redirect the client to the
       * GitHub OAuth page.
       */
      var ghAuthUrl = 'https://github.com/login/oauth/authorize?client_id='
       + config.githubClientId
       + '&redirect_uri=http://localhost:3000/login/auth';
      res.redirect(ghAuthUrl);
    }
  }));

  app.use(function(req, res, next) {
>>>>>>> Revert serverConfig routes back the way they were
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use(session({secret: 'it\'s a secret'}));
  app.use(passport.initialize());
  app.use(passport.session());


  app.use('/app', express.static(__dirname + '/../../client'));
;
};


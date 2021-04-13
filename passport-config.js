const db = require('./db-config');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

module.exports = {
  strategy: new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    function (payload, next) {
      db.promise()
        .execute(
          'SELECT email, firstName, lastName FROM `users` WHERE `email` = ?',
          [payload.email]
        )
        .then((rows, fields) => {
          if (rows.length > 0) {
            user = rows[0][0];
            next(null, user);
          } else {
            next(null, false);
          }
        })
        .catch((err) => next(null, false));
    }
  ),
  serialize: function (user, done) {
    done(null, user.email);
  },
  deserialize: function (user, done) {
    db.promise()
      .execute('SELECT * FROM `users` WHERE `email` = ?', [email])
      .then((rows, fields) => {
        if (rows.length > 0) {
          user = rows[0][0];
          done(null, user);
        } else {
          done('No user', null);
        }
      })
      .catch((err) => done(err, null));
  },
};

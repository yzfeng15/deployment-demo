const express = require('express');
const passport = require('passport');
const cors = require('cors');
const { strategy, serialize, deserialize } = require('./passport-config');
const db = require('./db-config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config();

const webapp = express();

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  })
);
webapp.use(cors());
passport.use(strategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);
webapp.use(passport.initialize());

// TODO: change root URI
webapp.post('/register', (req, res) => {
  bcrypt
    .hash(req.body.password, saltRounds)
    .then((hashedPW) => {
      const newUser = {
        email: req.body.email,
        password: hashedPW,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      db.promise()
        .execute(
          'INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)',
          [newUser.email, newUser.password, newUser.firstName, newUser.lastName]
        )
        .then((rows, fields) => res.status(200).send(rows))
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
});

webapp.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    db.promise()
      .execute('SELECT * FROM `users` WHERE `email` = ?', [email])
      .then((rows, fields) => {
        if (rows.length > 0) {
          user = rows[0][0];
          bcrypt
            .compare(password, user.password)
            .then((result) => {
              if (result) {
                let token = jwt.sign(
                  {
                    firstName: user.firstName,
                    lastName: user.lastName,
                  },
                  process.env.JWT_KEY
                );
                res.status(200).json({ token: token });
              } else {
                res.status(401).json({ msg: 'Incorrect Password' });
              }
            })
            .catch((err) => res.status(500).send(err));
        } else {
          res.status(401).json({ msg: 'User does not exist' });
        }
      })
      .catch((err) => res.status(500).send(err));
  }
});

// Root endpoint
// TODO: alter for deployment
webapp.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend!' });
});

// Start server
const port = process.env.PORT || 5000;
webapp.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

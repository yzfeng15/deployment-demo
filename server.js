const express = require('express');
const passport = require('passport');
const cors = require('cors');
const { strategy, serialize, deserialize } = require('./passport-config');
const db = require('./db-config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');
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

webapp.use(express.static(path.join(__dirname, './client/build')));

// TODO: change root URI
webapp.post('/api/register', (req, res) => {
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

webapp.post('/api/login', (req, res) => {
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
webapp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start server
const port = process.env.PORT || 5000;
webapp.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

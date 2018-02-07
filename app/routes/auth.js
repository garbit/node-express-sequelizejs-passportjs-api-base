const express = require('express');

const router = express.Router();
const response = require('../utils/response');
const passport = require('passport');
const models = require('../models');
const bcrypt = require('bcryptjs');

const dummy = require('../dummy');

router.post('/login', passport.authenticate('local', { }), (req, res) => {
  console.log(req.user);
  response.success(res, { user: req.user.toJSON() });
});

router.post('/register', async (req, res) => {
  let user;

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.AUTH_BCRYPT_SALT_ITERATIONS, 10));
    user = await models.User.create({
      username: req.body.username.trim(),
      password: await bcrypt.hash(req.body.password, salt),
      email: req.body.email.trim()
    });

    response.success(res, { user });
  }
  catch (error) {
    console.error(error);
    response.failed(res, error);
  }
});

router.get('/logout', async (req, res) => {
  req.logout();
  response.success(res);
});

module.exports = router;

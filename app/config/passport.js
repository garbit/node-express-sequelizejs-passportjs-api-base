const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// models
const models = require('../models');

module.exports = (passport) => {
  // passportjs configuration
  passport.use(new LocalStrategy(async (username, password, done) => {
    let user;

    try {
      user = await models.User.findOne({ where: { username } });

      // user not found
      if (!user) {
        return done(null, false);
      }

      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        return done(null, false);
      }
    }
    catch (error) {
      console.error(error);
      return done(error);
    }

    return done(null, user);
  }));

  // Configure Passport authenticated session persistence.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user;
    try {
      user = await models.User.findOne({ where: { id } });
    }
    catch (error) {
      return done(error);
    }

    return done(null, user);
  });
};

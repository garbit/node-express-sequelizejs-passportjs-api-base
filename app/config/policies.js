module.exports = {
  isAuthed(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    }
    else {
      res.sendStatus(401);
    }
  }
};

const check_auth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {
    check_auth
}
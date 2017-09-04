module.exports = (req, res, next) => {
  console.log('REQUIRE AUTH MIDDLEWARE', req.user);
  if (!req.user) {
    return res.status(401).json({ error: 'You must log in' });
  }
  return next();
};

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    console.log('Skipping for testing...');
    return next();
  }
  console.log('REQUIRE AUTH MIDDLEWARE', req.user);
  if (!req.user) {
    return res.status(401).json({ error: 'You must log in' });
  }
  return next();
};

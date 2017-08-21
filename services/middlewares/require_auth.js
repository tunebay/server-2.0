module.exports = (req, res, next) => {
  console.log(req.user);
  if (!req.user) {
    return res.status(401).json({ error: 'You must log in' });
  }
  return next();
};

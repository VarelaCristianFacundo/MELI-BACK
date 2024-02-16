const AUTH_TOKEN = process.env.AUTH_TOKEN;

module.exports = (req, res, next) => {
  const authToken = req.header('x-auth-token');

  if (!authToken || authToken !== AUTH_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
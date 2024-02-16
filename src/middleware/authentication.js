const AUTH_TOKEN = process.env.AUTH_TOKEN;

module.exports = (req, res, next) => {
    const authToken = req.header('x-auth-token');
    console.log('Received Token:', authToken);
    console.log(AUTH_TOKEN);

    if (!authToken || authToken !== AUTH_TOKEN) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const SECOND_TOKEN = process.env.SECOND_TOKEN;
const logger = require('../config/logger');

module.exports = (req, res, next) => {
    const authToken = req.header('x-auth-token');
    console.log('Received x-auth-token:', authToken);
    logger.info(`Received x-auth-token: ${authToken}`);

    if (!authToken || (authToken !== AUTH_TOKEN && authToken !== SECOND_TOKEN)) {
        logger.warn('Unauthorized access attempt');
        return res.status(401).json({ error: 'Unauthorized' });
    }
        
    next();
};
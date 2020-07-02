const { verifyJwt, getTokenFromHeaders } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {
    const { url: path, headers } = req;
    
    const allowAnonymousPaths = [ '/auth/signin', '/auth/signup', '/auth/refresh' ];
    const isAnonymous = !!allowAnonymousPaths.find(p => p.startsWith(path));
    if (isAnonymous) return next();

    const token = getTokenFromHeaders(headers);
    if (!token) return res.jsonUnauthorized(null, 'Invalid token');

    try {
        const decoded = verifyJwt(token);
        req.accountId = decoded.id;
        next();
    } catch (error) {
        return res.jsonUnauthorized(null, 'Invalid token');
    }
};

module.exports = checkJwt;
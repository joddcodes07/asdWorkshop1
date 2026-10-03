const cache = {}

const cacheMiddleware = (req, res, next) => {
    if (req.method !== 'GET') return next();
    
    const key = req.originalUrl;
    
    if (cache[key]) {
        return res.json(cache[key]);
    }

    const originalJson = res.json;
    res.json = function (body) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = body;
        }
        return originalJson.call(this, body);
    };
    next();
};

module.exports = cacheMiddleware;
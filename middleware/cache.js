const cache = {};
const TTL = 60 * 1000;

const cacheMiddleware = (req, res, next) => {
    if (req.method !== 'GET') return next();
    
    const key = req.originalUrl;
    const cachedEntry = cache[key];
    
    if (cachedEntry) {
        const now = Date.now();
        const age = now - cachedEntry.timestamp;
        
        if (age < TTL) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(cachedEntry.data);
        } else {
            delete cache[key];
        }
    }

    res.setHeader('X-Cache', 'MISS');
    const originalJson = res.json;
    
    res.json = function (body) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = {
                data: body,
                timestamp: Date.now()
            };
        }
        return originalJson.call(this, body);
    };
    next();
};

const invalidateCache = (req, res, next) => {
    res.on('finish', () => {
        const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method);
        const isSuccessful = res.statusCode >= 200 && res.statusCode < 300;

        if (isMutation && isSuccessful) {
            Object.keys(cache).forEach(key => delete cache[key]);
            console.log(`Cache invalidated due to successful ${req.method} request.`);
        }
    });
    next();
};

module.exports = {
    cacheMiddleware,
    invalidateCache
};
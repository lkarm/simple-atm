const redis = require('redis-mock');


const createClient = () => redis.createClient()
const RedisClient = redis.RedisClient;
module.exports = createClient;
module.exports = RedisClient;
module.exports = redis;

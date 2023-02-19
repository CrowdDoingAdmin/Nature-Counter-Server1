const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379
const redisClient = redis.createClient(REDIS_PORT)
redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));

module.exports = redisClient;
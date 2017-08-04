const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
const client = redis.createClient();

exports.saveAccount = (accountID, balance, callback) => {
    client.set([accountID, balance], (err, resp) => {
        callback(err, resp);
    })
}

exports.getAccount = (accountID, callback) => {
    client.getAsync(accountID).then((res) => callback(res));
}
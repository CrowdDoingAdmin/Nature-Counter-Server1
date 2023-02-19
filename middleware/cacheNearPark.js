const client = require('../config/redis')

module.exports = {
  getCached: (req, res, next) => {
    const { lat, long } = req.query;
    const redis_key = `${lat}_${long}`;
    client.get(redis_key, function(err, reply) {
      if (err) {
        res.status(500).json({
          message: "Somethin Went Wrong"
        })
      }
      if (reply == null) {
        next()
      } else {
        res.status(200).json({
          message: `Success Read ${redis_key}`,
          data: JSON.parse(reply)
        })
      }
    });
  },
  caching: (key, data) => {
    client.set(key, JSON.stringify(data) )
  },
  delCache: (key) => {
    client.del(key)
  }
}
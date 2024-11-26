const { createClient } = require('redis');

const redisHost = process.env.REDIS_HOST || 'redis';
const redisPort = 6379;
console.log('Conectando a Redis en host:', redisHost);

const client = createClient({
  url: `redis://redis:${redisPort}`
});

(async () => {

  try {
    await client.connect();
    console.log('Conectado a Redis');

  } catch (err) {
    console.error('Error al conectar a Redis:', err);
  }

})();

const getFromCache = async (key) => {
  const value = await client.get(key);
  return value ? JSON.parse(value) : null;
};

const setToCache = async (key, value, ttl = 60) => {
  await client.set(key, JSON.stringify(value), { EX: ttl });
};

const deleteFromCache = async (key) => {
  await client.del(key);
};

module.exports = {
  getFromCache,
  setToCache,
  deleteFromCache,
};

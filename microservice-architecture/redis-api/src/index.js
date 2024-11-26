const express = require('express');
const dotenv = require('dotenv');
const cacheRoutes = require('./routes/cache.routes');

dotenv.config();

const app = express();
const port = process.env.REDIS_API_PORT || 6000;

app.use(express.json());

// Routes
app.use('/', cacheRoutes);

app.listen(port, () => console.log(`API de Redis escuchando en el puerto ${port}`));

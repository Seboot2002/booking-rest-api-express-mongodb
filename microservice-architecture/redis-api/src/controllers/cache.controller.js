const axios = require('axios');
const { getFromCache, setToCache, deleteFromCache } = require('../models/cache');

const getData = async (req, res) => {
  const { id } = req.params;

  try {
    
    // Verificar si los datos están en Redis
    const cachedData = await getFromCache(id);
    if (cachedData) {
      console.log(`Cache encontrado de ${id}`);
      return res.json(cachedData);
    }

    console.log(`Cache no encontrado y guardado de ${id}`);

    // Si no están en Redis, consultar a la API de MongoDB
    const response = await axios.get(`${process.env.MONGO_API_URL}/api/capital/${id}`, {
      headers: {
        Authorization: req.token_only
      }
    });
    const data = response.data;

    // Almacenar en Redis
    await setToCache(id, data);
    res.json(data);

  } catch (err) {

    res.status(500).json({ error: 'Error al obtener los datos', details: err.message });
  }

};

const invalidateCache = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteFromCache(id);
    res.json({ message: `Cache eliminado de ${id}` });

  } catch (err) {
    res.status(500).json({ error: 'Error al invalidar la caché', details: err.message });
  }

};

module.exports = {
  getData,
  invalidateCache,
};

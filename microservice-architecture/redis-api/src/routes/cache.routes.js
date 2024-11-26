const express = require('express');
const { getData, invalidateCache } = require('../controllers/cache.controller');
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get('/capital/data/:id', verifyToken, getData);

router.delete('/capital/cache/:id', verifyToken, invalidateCache);

module.exports = router;

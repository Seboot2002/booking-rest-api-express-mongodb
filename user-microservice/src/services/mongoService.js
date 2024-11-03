require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
console.log('Conectando a MongoDB con URI:', uri);

let db;

const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        db = await client.db(process.env.DB_NAME);
        if (db) console.log('MongoDB Connected');
        
    } catch (err) {
        console.error('Error al conectar a MongoDB: ', err.message || err);
    }
}

function getDb() {
    if (!db) {
        throw new Error('No database connection');
    }
    return db;
}

module.exports = { connect, getDb };

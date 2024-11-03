require('dotenv').config();
const app = require("./config/app");
const { connect, getDb } = require('./services/mongoService');

const capitalRoutes = require("./routes/capital.routes");

(async () => {
    try {
        await connect();
        const db = getDb();

        app.use('/api/capital', capitalRoutes(db));

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
        
    } catch (error) {
        console.error(`Error starting the server: ${error.message}`);
        process.exit(1);
    }
})();
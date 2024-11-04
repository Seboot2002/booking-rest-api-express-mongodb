require('dotenv').config();
const app = require("./config/app");
const { connect, getDb } = require('./services/mongoService');

const userRoutes = require("./routes/user.routes");

(async () => {
    try {
        await connect();
        const db = await getDb();

        app.use('/api/user', userRoutes(db));

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
        
    } catch (error) {
        console.error(`Error starting the server: ${error.message}`);
        process.exit(1);
    }
})();
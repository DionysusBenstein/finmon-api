import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/', router);

const port = process.env.PORT || 8081;

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://benstein:gangbang1@cluster0.dosin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    } catch (e) {
        console.log(e);
    }
}

start();
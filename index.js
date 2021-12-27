import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import { swaggerUi, specs } from './docs.js';

const app = express();

app.use(express.json());
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', async (req, res) => {
    res.send(`
      <body style="font-family: Arial; text-align: center">
        <h1>Docs will be here! v${process.env.npm_package_version}</h1>
        <div style="display: flex; justify-content: center;">
          <img src="https://raw.githubusercontent.com/DionysusBenstein/Hasbik/master/hasbik.jpg">
        </div>
      </body>
    `);
});

const port = process.env.PORT || 5000;

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://benstein:gangbang1@cluster0.dosin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        );
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    } catch (e) {
        console.log(e);
    }
}

start();

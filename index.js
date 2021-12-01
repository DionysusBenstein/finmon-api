import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';
import * as mono from './integrations/mono.js'; 

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.get('/', async (req, res) => {
res.send(`
      <body style="font-family: Arial; text-align: center">
        <h1>Here will be docs!</h1>
        <div style="display: flex; justify-content: center;">
          <img src="https://raw.githubusercontent.com/DionysusBenstein/Hasbik/master/hasbik.jpg">
        </div>
      </body>
    `);
});

app.get('/:bank/user/info', async (req, res) => {
    res.send(await mono.getClientInfo());
});

app.get('/:bank/transactions/:account/:from/:to', async (req, res) => {
    let [fromYear, fromMonth, fromDay] = [...req.params.from.split('-')];
    let [toYear, toMonth, toDay] = [...req.params.to.split('-')];

    const from = new Date(fromYear, fromMonth - 1, fromDay).getTime();
    const to = new Date(toYear, toMonth - 1, toDay).getTime();
    
    res.send(await mono.getTransactions(req.params.account, from, to));
});

app.get('/:bank/transactions/:account/', async (req, res) => {
    
    const date = new Date();

    let dateData = {
        year: date.getFullYear(),
        month: date.getMonth() - 1,
        day: date.getDate() + 1,
    }

    const newDate = new Date(dateData.year, dateData.month, dateData.day);

    res.send(await mono.getTransactions(req.params.account, Number(newDate), Number(date)));
});

app.get('/:bank/transactions/:account/', async (req, res) => {
    const date = new Date();
    console.log(Date.now() - date);
    res.send(await mono.getTransactions(req.params.account, req.params.from, req.params.to));
});

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
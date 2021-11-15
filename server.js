import express from 'express';
import { getClientInfo, getTransactions } from './integrations/mono.js'; 

const app = express();

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
    res.send(await getClientInfo());
});

app.get('/:bank/transactions/:account/:from/:to', async (req, res) => {
    res.send(await getTransactions(req.params.account, req.params.from, req.params.to));
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

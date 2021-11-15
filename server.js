import express from 'express';
import { getClientInfo, getTransactions } from './integrations/mono.js'; 

const app = express();

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

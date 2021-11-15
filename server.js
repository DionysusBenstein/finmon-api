import express from 'express';
import { getClientInfo } from './integrations/mono.js';

const app = express();

app.get('/user/info', (req, res) => {
    res.send(getClientInfo());
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

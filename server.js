import express from 'express';

const app = express();

app.get('/user/info', (req, res) => {
    res.send(getInfo());
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

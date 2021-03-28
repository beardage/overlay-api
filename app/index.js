const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send(`hello world! our server is running at port ${port}`);
});

server.listen(port, () => {
    console.log(`server is running at port ${port}`);
});

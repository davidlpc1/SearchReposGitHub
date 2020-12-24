const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    return res.sendFile('index.html');
})

app.listen(port, () => {
    console.log(`[app.js] > Running server at http://localhost:${port}/`)
})


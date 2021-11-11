const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/stackData', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/data.json'));

    res.json(data);
});

app.post('/stackData', (req, res) => {
    fs.writeFileSync('./data/data.json', JSON.stringify(req.body));

    res.send();
});

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});

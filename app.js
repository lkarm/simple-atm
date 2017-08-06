const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const account = require('./server/routes');

const app = express();
const HTML_FILE = path.join("dist", "index.html");

app.use(bodyParser.json());
app.use(express.static("dist"));

// Account APIs
app.post('/account', account.create);
app.get('/account/:accountID', account.get);
app.put('/account/:accountID', account.update);


app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
})

app.listen(3000, () => {
  console.log('ATM app listening on port 3000!')
})
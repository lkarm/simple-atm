const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const account = require('./server/routes')

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Simple ATM')
})

// Account APIs
app.post('/account', account.create);
app.get('/account/:accountID', account.get);
app.put('/account/:accountID', account.update);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
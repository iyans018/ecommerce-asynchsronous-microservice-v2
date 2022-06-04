const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/account', proxy('http://localhost:3001'));
app.use('/product', proxy('http://localhost:3002'));
app.use('/order', proxy('http://localhost:3003'));
app.use('/payment', proxy('http://localhost:3004'));
app.use('/shipping', proxy('http://localhost:3005'));

app.listen(3000, () => {
    console.log('Gateway is Listening to Port 3000')
});
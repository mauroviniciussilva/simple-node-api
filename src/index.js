const express = require('express');
const db = require('./models');
const response = require('./middlewares/response');
const checkJwt = require('./middlewares/jwt');

const authController = require('./controllers/auth');
const productController = require('./controllers/product');

const app = express();

app.use(response);
app.use(checkJwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authController);
app.use('/product', productController);

app.get('/', (req, res) => {
    return res.json('Api running...')
});

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Listening on port 3001');
    });
});

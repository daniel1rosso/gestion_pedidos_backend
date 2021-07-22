const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Documentation
const cors = require('cors');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(bodyParser.json());

//MONGODB CONNECTION
require('./database');

//IMPORT ROUTE
const clienteRoute = require('./routes/cliente');
const productoRoute = require('./routes/producto');
const rolRoute = require('./routes/rol');
const userRoute = require('./routes/usuario');
const loginRoute = require('./routes/login');
const procesamientoRoute = require('./routes/procesamiento');

//INIT ROUTE
app.use('/cliente', clienteRoute);
app.use('/producto', productoRoute);
app.use('/rol', rolRoute);
app.use('/usuario', userRoute);
app.use('/login', loginRoute);
app.use('/procesar', procesamientoRoute);

//START SERVER
app.listen(8001);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({ extended: true }));
const clienteController = require('./controllers/clienteController')
const ordenController = require('./controllers/ordenController')

app.get('/clientes', clienteController.getClientes)
app.get('/cliente/:id', clienteController.getClienteById) // req.params.id
app.get('/ordenes/', ordenController.getOrdenes)

app.listen(3000);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({ extended: true }));
const clienteController = require('./controllers/clienteController')
const ordenController = require('./controllers/ordenController')
const productoController = require('./controllers/productoController');
const usuarioController = require('./controllers/usuarioController');

app.get('/clientes', clienteController.getClientes)
app.get('/cliente/:id', clienteController.getClienteById) // req.params.id
app.post('/cliente', clienteController.createCliente)

app.get('/ordenes', ordenController.getOrdenes)
app.get('/orden/:id', ordenController.getOrdenById) // req.params.id
app.post('/orden', ordenController.createOrdenes)

app.get('/productos', productoController.getProductos)
app.get('/producto/:id', productoController.getProductoById) // req.params.id
app.post('/producto', productoController.createProducto)

app.get('/usuario/:id', usuarioController.getUsuarioById) // req.params.id    
app.post('/usuario', usuarioController.createUsuario)
app.get('/usuarios', async (req, res) => {
    let response = {
        statusCode : 200
        , message: 'OK'
        , data: {}
        , success: true
    }
    let controllerResponse = await usuarioController.getUsuarios(req.query.limit, req.query.offset)

    if(controllerResponse.success){
        response.data = controllerResponse.data;
        res.status(response.statusCode).send(response);
    }
    else {
        response.success = false;
        response.message = controllerResponse.message;
        response.statusCode = 400;
        res.status(response.statusCode).send(response);
    }
})    



app.listen(3000);

const productoService = require('../services/productoService')
const dbmanager = require('../db/dbmanager')
const validator = require('../sys/validator')

class ProductoController {
    async getProductos(req, res) {
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }
        
        let offset = 0
        let limit = 100
        if(req.query.offset && Number.isInteger(req.query.offset)){
            offset = req.query.offset
        }
        if(req.query.limit && Number.isInteger(req.query.limit)){
            limit = req.query.limit
        }
      
        let productos = await productoService.getProductos(offset,limit); // de asinc -> sinc
        response.data = productos;
        res.status(response.statusCode).send(response);
    }

    async getProductoById(req, res) {
        // req.params.id
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }
        let producto = await productoService.getProductoById(req.params.id); // de asinc -> sinc
        response.data = producto[0];
        res.status(response.statusCode).send(response);
    }
    
    async createProducto(req, res){
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }

        console.log(req.body.nombre);
        console.log(req.body.descripcion);
        console.log(req.body.precio);
        console.log(req.body.costo);
        console.log(req.body.proveedor);


        
        // validar parametros
        let errorMessage = [];
        if(!req.body.nombre){
            errorMessage.push('Parametro nombre es requerido')
        }
        else if (!validator.isTexto(req.body.nombre)){
            errorMessage.push('Parametro nombre necesita ser un texto')
        }


        if(!req.body.descripcion){
            errorMessage.push('Parametro descripcion es requerido')
        }
        /* else if (!validator.isTexto(req.body.descripcion)){
            errorMessage.push('Parametro descripcion necesita ser un texto')
        } */
       
        if(!req.body.precio){
            errorMessage.push('Parametro precio es requerido')
        }
        else if (!validator.isPassword(req.body.precio)){
            errorMessage.push('Parametro precio necesita tener un formato correcto')
        }

        
        if(!req.body.costo){
            errorMessage.push('Parametro precio es requerido')
        }
        else if (!validator.isPassword(req.body.costo)){
            errorMessage.push('Parametro costo necesita tener un formato correcto')
        }



        if(errorMessage.length){
            // 400 bad request
            response.statusCode = 400;
            response.message = errorMessage
            response.message.unshift('Bad Request')
            response.success = false
            res.status(response.statusCode).send(response);
        }

        else{
            await productoService.createProducto(req.body);
            response.statusCode = 201; // created
            res.status(response.statusCode).send(response);
        }
    }
}


module.exports = new ProductoController();
const proveedorService = require('../services/proveedorService')
const dbmanager = require('../db/dbmanager')
const validator = require('../sys/validator')

class ProveedorController {
    async getProveedores(req, res) {
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
      
        let proveedores = await proveedorService.getProveedores(offset,limit); // de asinc -> sinc
        response.data = proveedores;
        res.status(response.statusCode).send(response);
    }

    async getProveedorById(req, res) {
        // req.params.id
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }
        let proveedor = await proveedorService.getProveedorById(req.params.id); // de asinc -> sinc
        response.data = proveedor[0];
        res.status(response.statusCode).send(response);
    }
    
    async createProveedor(req, res){
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }

        console.log(req.body.nombre);
        console.log(req.body.telefono);
        console.log(req.body.correo);
        //console.log(req.body.direccion);


        
        // validar parametros
        let errorMessage = [];
        if(!req.body.nombre){
            errorMessage.push('Parametro nombre es requerido')
        }
        else if (!validator.isPassword(req.body.nombre)){
            errorMessage.push('Parametro nombre necesita ser un texto')
        }

        if(!req.body.telefono){
            errorMessage.push('Parametro telefono es requerido')
        }
        else if (!validator.isNumber(req.body.telefono)){
            errorMessage.push('Parametro telefono necesita ser un entero')
        }

        if(!req.body.correo){
            errorMessage.push('Parametro email es requerido')
        }
        else if (!validator.isValidEmail(req.body.correo)){
            errorMessage.push('Parametro email necesita tener un formato correcto')
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
            await proveedorService.createProveedor(req.body);
            response.statusCode = 201; // created
            res.status(response.statusCode).send(response);
        }
    }
}


module.exports = new ProveedorController();
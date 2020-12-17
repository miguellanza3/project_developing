const ordenesService = require('../services/ordenesService')
const validator = require('../sys/validator')

class OrdenController {
    async getOrdenes(req, res) {
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }
        
        let offset = 0
        let limit = 100
        let desde = ""
        let hasta = ""
        
        if(req.query.offset && Number.isInteger(req.query.offset)){
            offset = req.query.offset
        }
        if(req.query.limit && Number.isInteger(req.query.limit)){
            limit = req.query.limit
        }
        if(req.query.desde && fechaValida(req.query.desde)){
            desde = req.query.desde;
        }
        if(req.query.hasta && fechaValida(req.query.hasta)){
            hasta = req.query.hasta;
        }
      

        let ordenes = await ordenesService.getOrdenes(offset,limit,desde, hasta); // de asinc -> sinc
        response.data = ordenes;
        res.status(response.statusCode).send(response);
    }

    async getOrdenById(req, res) {
        // req.params.id
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }
        let orden = await ordenesService.getOrdenById(req.params.id); // de asinc -> sinc
        response.data = orden[0];
        res.status(response.statusCode).send(response);
    }

    async createOrdenes(req, res){
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }

        console.log(req.body.nombre);
        console.log(req.body.telefono);
        console.log(req.body.correo);
        console.log(req.body.direccion);


        
        // validar parametros
        let errorMessage = [];
        if(!req.body.fecha){
            errorMessage.push('Parametro fecha es requerido')
        }
        else if (!validator.isValidDate(req.body.fecha)){
            errorMessage.push('Parametro fecha necesita tener formato de fecha')
        }

        if(!req.body.id){
            errorMessage.push('Parametro Id es requerido')
        }
        else if (!validator.isPassword(req.body.id)){
            errorMessage.push('Parametro Id necesita ser un entero')
        }

        if(!req.body.total){
            errorMessage.push('Parametro total es requerido')
        }
        else if (!validator.isPassword(req.body.total)){
            errorMessage.push('Parametro total necesita ser un entero')
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
            await ordenesService.createOrdenes(req.body);
            response.statusCode = 201; // created
            res.status(response.statusCode).send(response);
        }
    }
    
}

function fechaValida(fecha){
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!fecha.match(regEx)) return false;  // Invalid format
        var d = new Date(fecha);
        var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === fecha;
}


module.exports = new OrdenController();
const ordenesService = require('../services/ordenesService')

class OrdenController {
    async getOrdenes(req, res) {
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }

        let badRequest = {
            statusCode : 400
            , message: 'Error'
            , data: {}
            , success: false
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
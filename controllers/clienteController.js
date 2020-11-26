const clienteService = require('../services/clienteService')

class ClienteController {
    async getClientes(req, res) {
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
      
        


        let clientes = await clienteService.getClientes(offset,limit); // de asinc -> sinc
        response.data = clientes;
        res.status(response.statusCode).send(response);
    }

    async getClienteById(req, res) {
        // req.params.id
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }
        let cliente = await clienteService.getclienteById(req.params.id); // de asinc -> sinc
        response.data = cliente[0];
        res.status(response.statusCode).send(response);
    }
    
}


module.exports = new ClienteController();
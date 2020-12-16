const usuarioServices = require('../services/usuarioServices')
const dbmanager = require('../db/dbmanager')
const validator = require('../sys/validator')
const bcrypt = require('bcrypt')

const numberOfRouds = 10;

class UsuarioController {
    async getUsuarios(plimit, poffset) {
        let response = {
            message: [],
            success: true,
            data: {}
        }

        let offset = 0
        let limit = 100

        if(poffset){
            if (!isNaN(poffset)){
                offset = poffset
            }
            else{
                // poffset = potaxio
                response.message.push('Parametro offset tiene que ser entero')
                response.success = false
            }
        }

        if(plimit){
            if (!isNaN(plimit)){
                limit = plimit
            }
            else{
                // plimit = potaxio
                response.message.push('Parametro limit tiene que ser entero')
                response.success = false
            }
        }

        if(response.message.length){
            return response;
        }
        else {
            let usuarios = await usuarioServices.getUsuarios(offset,limit); // de asinc -> sinc
            response.data = usuarios
            return response;
        }
    }

    async getUsuarioById(req, res) {
        // req.params.id
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }
        let usuario = await usuarioServices.getUsuarioById(req.params.id); // de asinc -> sinc
        response.data = usuario[0];
        res.status(response.statusCode).send(response);
    }

    async createUsuario(req, res){
        let response = {
            statusCode : 200
            , message: 'OK'
            , data: {}
            , success: true
        }
        /* console.log(req.body.correo);
        console.log(req.body.contrasena); */

        let errorMessage = [];
        if(!req.body.correo){
            errorMessage.push('Parametro correo es requerido')
        }
        else if (!validator.isValidEmail(req.body.correo)){
            errorMessage.push('Parametro correo necesita ser un texto')
        }

        if(!req.body.contrasena){
            errorMessage.push('Parametro contraseña es requerido')
        }
        else if (!validator.isPassword(req.body.contrasena)){
            errorMessage.push('Parametro contraseña necesita ser un texto')
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
            
            let salt = bcrypt.genSaltSync(numberOfRouds);
            let encryptedPassword = bcrypt.hashSync(req.body.contrasena, salt);
            
            await usuarioServices.createUsuario(req.body, encryptedPassword, salt);
            response.statusCode = 201; // created
            res.status(response.statusCode).send(response);
        }
    }
}


module.exports = new UsuarioController();
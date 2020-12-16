const dbManager = new (require('../db/dbmanager'));

class UsuarioServices {
    async getUsuarios(offset,limit) {
        const selectSQl =
            `SELECT id, correo FROM usuarios
            LIMIT ${limit} OFFSET ${offset}`;

        return await dbManager.execute('proyecto', selectSQl);
    }

    async getUsuarioById(id) {
        const selectSQl =
            `SELECT id, correo FROM usuarios WHERE id = ${id}`;
        return await dbManager.execute('proyecto', selectSQl);
    }

    async createUsuario(usuario, contrasena, salt){
        const selectSQl =
            `INSERT INTO usuarios
            (correo, contrasena, salt)
            VALUES
            (
            '${usuario.correo}',
            '${contrasena}',
            '${salt}'
            ) `
        console.log(selectSQl);
        return await dbManager.execute('proyecto', selectSQl);
    }
    
}

module.exports = new UsuarioServices();
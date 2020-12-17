const dbManager = new (require('../db/dbmanager'));

class ProveedorService {
    async getProveedores(offset,limit) {
        const selectSQl =
            `SELECT * FROM proveedores
            LIMIT ${limit} OFFSET ${offset}`;

        return await dbManager.execute('proyecto', selectSQl);
    }

    async getProveedorById(id) {
        const selectSQl =
            `SELECT * FROM proveedores WHERE id = ${id}`;
        return await dbManager.execute('proyecto', selectSQl);
    }

    async createProveedor(cliente){
        const selectSQl =
            `INSERT INTO proveedores
            (nombre, telefono, correo )
            VALUES
            (
            '${cliente.nombre}',
            ${cliente.telefono},
            '${cliente.correo}'
            
            ) `
        console.log(selectSQl);
        return await dbManager.execute('proyecto', selectSQl);
    }
    
}


module.exports = new ProveedorService();
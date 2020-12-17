const dbManager = new (require('../db/dbmanager'));

class ProductoService {
    async getProductos(offset,limit) {
        const selectSQl =
            `SELECT * FROM productos
            LIMIT ${limit} OFFSET ${offset}`;


        return await dbManager.execute('proyecto', selectSQl);
    }

    async getProductoById(id) {
        const selectSQl =
            `SELECT * FROM productos WHERE id = ${id}`;
        return await dbManager.execute('proyecto', selectSQl);
    }

    async createProducto(producto){
        const selectSQl =
        `INSERT INTO productos
        (nombre, descripcion,precio,costo, proveedor_id)
        VALUES
        (
        '${producto.nombre}',
        '${producto.descripcion}',
        ${producto.precio},
        ${producto.costo},
        ${producto.proveedor_id},
        ) `
        console.log(selectSQl);
        return await dbManager.execute('proyecto', selectSQl);
    }
    
}


module.exports = new ProductoService();
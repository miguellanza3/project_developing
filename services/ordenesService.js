const dbManager = new (require('../db/dbmanager'));

class ordenesServices {
    async getOrdenes(offset,limit,desde, hasta) {
        if(desde && hasta){
            const selectSQl =
            `SELECT * FROM ordenes
            WHERE DATE(fecha) BETWEEN '${desde}' AND '${hasta}'
            LIMIT ${limit} OFFSET ${offset}`;
            
        return await dbManager.execute('proyecto', selectSQl);
        }else{
            `SELECT * FROM ordenes
            LIMIT ${limit} OFFSET ${offset}`;
            
            return await dbManager.execute('proyecto', selectSQl);
        }
       
    }
    
}


module.exports = new ordenesServices();
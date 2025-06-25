import connection from "../config/database.js";

class Product{
    static async createProductModel({Sku, productName, productDescription, productPrice, idStatusProduct, idBrand, idCategory, images, quantity}){
        const conn = await connection.getConnection();
        try{
            await conn.beginTransaction();

            const [resultProductInsert] = await conn.query('INSERT INTO `product`(`sku`, `productName`, `productDescription`, `productPrice`, `createAtProduct`, `idStatusProduct`, `idBrand`, `idCategory`) VALUES (?,?,?,?, NOW(),?,?,?)', [Sku, productName, productDescription, productPrice, idStatusProduct, idBrand, idCategory] );

            const productID = resultProductInsert.insertId;
            
            console.log(Array.isArray(images), images);


            const values = images.map(img => [img.urlImgProduct, img.nameImgProduct, productID]);
            const sql = 'INSERT INTO imageproduct(urlImgProduct, nameImgProduct, idProduct) VALUES ?';
            await conn.query(sql, [values]);


            await conn.query(
                'INSERT INTO `stockproduct`(`quantity`, `idProduct`) VALUES (?,?)',
                [quantity,productID]
            )
            await conn.commit();
            return{
                success:true, 
                data: resultProductInsert
            }

        }catch(error){
            await conn.rollback();
            throw new Error('Error al crear producto' + error.message)
        }finally{
            conn.release();
        }

    }
}

export default Product
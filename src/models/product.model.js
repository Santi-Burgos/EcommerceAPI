import connection from "../config/database.js";

class Product{
    //Create product
    static async createProductModel({Sku, productName, productDescription, productPrice, idStatusProduct, idBrand, idCategory, images, quantity}){
        const conn = await connection.getConnection();
        try{
            await conn.beginTransaction();

            const [resultProductInsert] = await conn.query('INSERT INTO `product`(`sku`, `productName`, `productDescription`, `productPrice`, `createAtProduct`, `idStatusProduct`, `idBrand`, `idCategory`) VALUES (?,?,?,?, NOW(),?,?,?)', [Sku, productName, productDescription, productPrice, idStatusProduct, idBrand, idCategory] );

            const productID = resultProductInsert.insertId;
        /// cortar retornar productID

            const values = images.map(img => [img.url, img.name, productID]);


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
    static async getListProductModel(){
        try{
        const getProduct = 'SELECT product.idProduct, product.sku, product.productName, product.productDescription, product.productPrice, product.createAtProduct ,brand.brand, category.category FROM `product` INNER JOIN `brand` ON product.idBrand = brand.idBrand INNER JOIN `category` ON product.idCategory = category.idCategory;'
        const resultGetProduct = await connection.query(getProduct)
        return{
            data: resultGetProduct
        }
        }catch(error){
                console.error(error)
                throw new Error('Error al eliminar producto' + error.message)
        }
    }

    //edit product
    static async editProduct(){
          
    }

    //delete Product for DB
    static async deleteProductModel(productID){
        try{
            const queryForDelete = 'DELETE FROM `product` WHERE idProduct = ?';
            const resultQueryDelete = await connection.query(queryForDelete, productID);
            
            return{
                data: resultQueryDelete
            }

        }catch(error){
            console.error(error)
            throw new Error('Error al eliminar producto' + error.message)
        }
    }

    //check the existence and availability
    static async productExist(productID){
        try{
            const existProduct = 'SELECT product.idStatusProduct, statusproduct.statusProduct FROM product JOIN statusproduct ON product.idStatusProduct = statusproduct.idStatusProduct WHERE idProduct = ?'; 
            const [rows] = await connection.query(existProduct, productID);
            return rows[0] || null
        }catch(error){
            throw new Error('Error al verificar existencia del producto' + error.message);
        }
    }

    //check the price
    static async checkPriceProduct(productID, productPrice){
        try{
            const queryCheckPrice = 'SELECT productPrice FROM product WHERE idProduct = ?'
            const [rows] = await connection.query(queryCheckPrice, [productID])
            if(rows.length === 0) {
                return false
            }
            return rows[0].productPrice === productPrice
        }catch(error){
            throw new Error('Error al verificar el precio del producto: ' + error.message)
        }
    }
}


export default Product
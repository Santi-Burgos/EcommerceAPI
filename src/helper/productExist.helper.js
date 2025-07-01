import connection from '../config/database.js'

export const productExist = async(productID) =>{

    const existProduct = 'SELECT product.idStatusProduct, statusproduct.statusProduct FROM product JOIN statusproduct ON product.idStatusProduct = statusproduct.idStatusProduct WHERE idProduct = ?';
    const [rows] = await connection.query(existProduct, productID);

    if(rows.statusProduct === 'Public'){
        return{
            success: true,
            message: 'Product found'
        }
    }else{
        return{
            success: false,
            message: 'Product not found'
        }
    }
    

}
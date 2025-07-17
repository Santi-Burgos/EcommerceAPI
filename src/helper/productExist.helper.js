export const verifyProductExist = async (data) =>{
    if(!data){
        return{
            success: false,
            message: 'Product does not exist'
        }
    }
    if(data){
        if(data.statusProduct === 'Public'){
        return{
            success: true,
            message: 'Product found'
        }
        }else{
            return{
                success: false,
                message: 'Product no available'
            }
        }
    }
}   
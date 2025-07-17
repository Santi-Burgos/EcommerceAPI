export const stockAvailable = async(cartQuantity, data) =>{
    if(!data){
        return{
            success: false,
            message: 'doesnt have stock'
        }
    }
    if(data.quantity >= cartQuantity){
        return{
            success: true,
            message: 'have stock'
        }
    }else{
        return{
            success: false,
            message: 'dont have stock'
        }
    }
}
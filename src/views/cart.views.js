export const pushToCartView =  (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            message: 'Error al empujar producto al carrito',
            details: result.error?.issues || JSON.stringify(result.error)
        })
    }

    return res.status(200).json({
        message: 'Product push successfully',
        data: result.data
    })
}
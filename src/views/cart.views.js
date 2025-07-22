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

export const editItemCartView = (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            message:'Error al editar item del carrito',
            details: result.error?.issues || JSON.stringify(result.error)
        })
    }
    return res.status(200).json({
        message: 'Product edit from cart successfully',
        data: result.data
    })
}


export const deleteItemCartView = (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            message: 'Error al eliminar producto del carrito',
            details: result.error?.issues || JSON.stringify(result.error)
        })
    }
    return res.status(200).json({
        message: 'Product delete from cart successfully',
        data: result.data
    })
}

export const getMyCartView = (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            message: 'Error al obtener carrito',
            details: result.error?.issues || JSON.stringify(result.error)
        })
    }
    return res.status(200).json({
        message: 'Get cart successfully',
        data: result.data
    })
}
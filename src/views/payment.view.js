export const createOrderView = (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            message: 'Error al crear la orden de pago',
            details: result.error?.issues || JSON.stringify(result.error)
        })
    }

    return res.status(200).json({
        message: 'Order create successfully',
        data: result.data
    })
}

export const paymentView = (result, res)=>{
    if(!result.success){
        return res.status(500).json({
            message: 'Error al pagar',
            details: result.error?.issues || JSON.stringify(result, error)
        })
    }
    
    return res.status(200).json({
        message: 'Playment complete successfully',
        data: result.data
    })
}
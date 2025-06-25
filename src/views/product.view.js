export const createProductView = (result, res) =>{
    if(!result.success){
        if(result.error == 'ZodError'){
            return res.status(400).json({
                message: 'Datos invalidos', 
                errors: result.error. issues,
            });
        }
        return res.status(500).json({
                message: 'Error desconocido al crear product',
                details: result.error?.message || JSON.stringify(result.error)
            })
    }
    return res.status(200).json({
        message: 'Product created succesfully',
        data: result.data
    })
};
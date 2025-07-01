export const createStreetAddressView = (result, res) =>{
    if(!result.success) {
        if(result.error && result.error.name === 'ZodError') {
            return res.status(400).json({
                message: "Datos inválidos",
                errors: result.error.issues, 
            });
        }
            return res.status(500).json({
                name: result.error?.name,
                error: result.error,
                message: result.error?.message || "Error desconocido al crear direccion",
                issues: result.error?.issues,
                stack: result.error?.stack
        });
    }

    return res.status(200).json({ 
        message: 'Street Address created succesfully',
        data: result.data
    })
};

export const editStreetAddressView =(result , res) =>{
    if(!result.success){
        if(result.error & result.error.name ==='ZodError'){
            return res.status(400).json({
                message: 'Datos invalidos',
                errors: result.error.issues
            })
        } 
        return res.status(500).json({
            name:result.error?.name,
            error: result.error,
            message: result.error?.message || 'Error desconocido al editar direccion',
            issues: result.error?.issues,
            stack: result.error?.stack
        });
    }
    return res.status(200).json({
        message: 'Street address edit succesfully',
        data: result.data
    })
}

export const deleteAddressStreetView = (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            name:result.error?.name,
            error: result.error,
            message: result.error?.message || 'Error desconocido al eliminar direccion',
            issues: result.error?.issues,
            stack: result.error?.stack
        });
    }
}
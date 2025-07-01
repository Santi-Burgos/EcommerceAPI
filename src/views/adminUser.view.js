export const createAdminUserView = (result, res) =>{
    if(!result.success){
        if(result.error == 'ZodError'){
            return res.status(400).json({
                message: 'Datos invalidos', 
                errors: result.error. issues,
            });
        }
        return res.status(500).json({
                message: 'Error desconocido al crear admin account',
                details: result.error?.message || JSON.stringify(result.error)
            })
    }
    return res.status(200).json({
        message: 'Admin account created succesfully',
        data: result.data
    })
};

export const editAdminUserView = (result, res) =>{
    if(!result.success){
     if (result.error.name === 'ZodError') {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: result.error.issues, 
      });
    }
    return res.status(500).json({
      message: "Error desconocido al editar administrador",
      details: result.error?.message || JSON.stringify(result.error)
    })
  }
  return res.status(200).json({message: 'Admin account edit successfully',
    data: result.data
  })
}

export const deleteAdminUserView = (result, res) =>{
  if(!result.success){
    return res.status(500).json({
      message: "Error desconocido al eliminar administrador",
      details: result.error?.message || JSON.stringify(result.error)
    })
  }
  return res.status(200).json({
    message: 'Admin account deleted succesfully',
    data: result.data
  })
}
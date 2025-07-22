export const createAccountClientView = (result, res) => {
  if (!result.success) {
    if (result.error.name === 'ZodError') {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: result.error.issues, 
      });
    }
    return res.status(500).json({
      message: "Error desconocido al crear cuenta",
      details: result.error?.message || JSON.stringify(result.error)
    });
  }
  res.status(200).json({message: 'User account created successfully',
    data: result.data
  })
};

export const editAccountClientView = (result, res) =>{
  if(!result.success){
     if (result.error.name === 'ZodError') {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: result.error.issues, 
      });
    }
    return res.status(500).json({
      message: "Error desconocido al editar cuenta",
      details: result.error?.message || JSON.stringify(result.error)
    })
  }
  return res.status(200).json({message: 'User account edit successfully',
    data: result.data
  })
}

export const changeProfilePicView = (result, res) =>{
  if(!result.success){
    return res.status(500).json({
      message: "Error desconocido al cambiar foto de perfil",
      details: result.error?.message || JSON.stringify(result.error)
    })
  }
  return res.status(200).json({message: 'Profile image edit successfully',
    data: result.data
  })
}

export const deleteAccountClientView = (result, res)=>{
  if(!result.success){
    return res.status(500).json({
      message: 'Error al eliminar la cuenta cliente',
      details: result.error?.message || JSON.stringify(result.error)
    })
  }

  return res.status(200).json({ message: 'Cuenta eliminada con exito',
    data: result.data
  })
}


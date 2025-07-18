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

export const changeProductImageView = (result, res) =>{
  if(!result.success){
    return res.status(500).json({
      message: "Error desconocido al cambiar foto de perfil",
      details: result.error?.message || JSON.stringify(result.error)
    })
  }
  return res.status(200).json({message: 'Product image edit successfully',
    data: result.data
  })
}

export const deleteProductView = (result, res) =>{
  if(!result.success){
    return res.status(500).json({
      message: 'No se pudo eliminar el producto', 
      details: result.error?.message || JSON.stringify(result.error)
    });
  }

  return res.status(200).json({message: 'Product delete successfully',
    data: result.data
  })
}
export const listProductView = (result, res) =>{
    if(!result.success){
    return res.status(500).json({
      message: 'No se ha podido obtener la lista', 
      details: result.error?.message || JSON.stringify(result.error)
    });
  }

  return res.status(200).json({message: 'Lista obtenida con exito',
    data: result.data
  })
}
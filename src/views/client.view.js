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

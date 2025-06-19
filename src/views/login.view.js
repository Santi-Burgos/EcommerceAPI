import { cookies as cookiesOptions} from '../utils/cookies.js'

export const loginClientView = (result, res) => {
  if (!result.success) {
    if (result.error.name === 'ZodError') {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: result.error.issues, 
      });
    }
    return res.status(500).json({
      message: "Error desconocido al iniciar sesion",
      details: result.error?.message || JSON.stringify(result.error)
    });
  }
  res
    .status(200)
    .cookie(
        'accessToken', 
        result.token,
        cookiesOptions
    )
    .json({message: 'Sesion iniciada con exito'
    })
};
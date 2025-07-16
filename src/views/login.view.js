import {cookies as cookiesOptions} from '../utils/cookies.js'

export const loginClientView = (result, res) => {
  if (!result.success) {
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

export const loginAdminView = (result, res) =>{
    if (!result.success) {
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
}

export const logoutView = (res)=>{
  res.clearCookie('accessToken').json({
    message: 'Logout successfully'
  })
}
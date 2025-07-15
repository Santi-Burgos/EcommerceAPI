export const createOrderView = (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            message: 'Error al crear la orden de pago',
           error: result.error?.issues || result.error?.message || result.error || 'Error desconocido'
        })
    }

    return res.status(200).json({
        message: 'Order create successfully',
        data: result.data
    })
}

export const paymentView = (result = {}, res) => {
  const { status = 500, body = {} } = result;

  if (!body.success) {                
    console.log('Falló el pago, enviando error');
    return res.status(status).json(body);
  }

  console.log('200 ok enviado');
  return res.status(status).json(body);
};

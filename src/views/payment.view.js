export const createOrderView = (result, res) =>{

    console.log(result)

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

// export const paymentView = (result, res) => {
//   if (!result || result.success === false) {
//     return res.status(500).json({
//       message: 'Error al pagar',
//       details: result?.error?.issues || JSON.stringify(result?.error || {})
//     });
//   }
//    if (!res.headersSent) {
//     return res.status(result.status || 200).json(result.body || {});
//   }
//   return res.status(200).json({
//     message: 'Payment completed successfully',
//     data: result.data
//   });
// };
export const paymentView = (result = {}, res) => {
  if (!result.success) {
    return res.status(result.status || 500).json(result.body || {});
  }
  console.log('200 ok enviado')
  return res.status(result.status || 200).json(result.body || {});
};
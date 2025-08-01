export const createTicketView = (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            name: result.error?.name,
            error: result.error,
            message: result.error?.message || "Error desconocido al crear ticket",
            issues: result.error?.issues,
            stack: result.error?.stack
        });
    }

    return res.status(200).json({
        message: 'Ticket create succefully, pending',
        data: result.data
    })
}

export const openTicketRoomView = (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            name: result.error?.name,
            error: result.error,
            message: result.error?.message || "Error desconocido al abrir ticket",
            issues: result.error?.issues,
            stack: result.error?.stack
        });
    }
    return res.status(200).json({
        message: 'Open ticket succesfully',
        data: result.data
    })
}

export const messagesTicketRoomView = (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            name: result.error?.name,
            error: result.error,
            message: result.error?.message || "Error desconocido al enviar mensaje",
            issues: result.error?.issues,
            stack: result.error?.stack
        });
    }
    return res.status(200).json({
        message: 'Send message succesfully',
        data: result.data
    })
}

export const getMyTicketView = (result, res) =>{
    if(!result.success){
       return res.status(500).json({
            name: result.error?.name,
            error: result.error,
            message: result.error?.message || "Error al obtener mis tickets",
            issues: result.error?.issues,
            stack: result.error?.stack
      }) 
    }

    return res.status(200).json({
        message: 'Get tickets succesfully',
        data: result.data
    })
}

export const getAllTicketsView = (result, res) =>{
    if(!result.success){
        return res.status(500).json({
            name: result.error?.name,
            error: result.error,
            message: result.error?.message || "Error al obtener tickets",
            issues: result.error?.issues,
            stack: result.error?.stack
      }) 
    }

    return res.status(200).json({
        message: 'Get all tickets succesfully',
        data: result.data
    })
}

export const ticketResolveView = (result, res) =>{
    if(!result.access){
        return res.status(500).json({
            name: result.error?.name,
            error: result.error,
            message: result.error?.message || "Error al resolver ticket",
            issues: result.error?.issues,
            stack: result.error?.stack
        })
    }
    return res.status(200).json({
        message: 'Ticket resolve successfully',
        data: result.data
    })
}
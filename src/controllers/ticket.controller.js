import Ticket from "../models/tickets.model.js";

export const createTicketController = async(req) => {
    const clientID = req.user.idUser;
    const { descriptionTicket, productID } = req.body;

    try {
        const ticket = await Ticket.createTicket(descriptionTicket, productID, clientID);
        
        if (!ticket.success) {
            return {
                success: false,
                error: ticket.error
            };
        }
    }catch(err){
        return {
            success: false,
            error: {
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
        };
    }
}
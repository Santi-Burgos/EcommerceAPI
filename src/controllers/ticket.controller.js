import Ticket from "../models/tickets.model.js";

export const createTicketController = async(req) => {
    try {
        const clientID = req.user.idUser;
        const { descriptionTicket, productID } = req.body;
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

export const openTicketRoomController = async(req) => {
    try {
        const  ticketID  = req.body;
        const adminID = req.user.idUser;

        const ticketRoom = await Ticket.createTicketRoom(ticketID, adminID);
        
        if (!ticketRoom.success) {
            return {
                success: false,
                error: ticketRoom.error
            };
        }
        
        return {
            success: true,
            data: ticketRoom.data
        };
    } catch (err) {
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
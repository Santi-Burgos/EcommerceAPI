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

//admin 

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

// los dos, anahdir un trigger
export const messagesTicketRoom = async(req) =>{
    try{
        const isAdmin = req.user.idRol || null;
        const senderID = req.user.idUser
        const {messageTicket, ticketRoomID} = req.body;

        const safeSender = await Ticket.messagesRoom(messageTicket, isAdmin, senderID, ticketRoomID)

        return{
            success: true, 
            message: ('Mesanje almacenado'),
            data: safeSender
        }
    }catch(err){
        return{
            success: false,
            error: {
                name: err.name || 'InternalError',
                message: err.message || 'Unexpected error',
                stack: err.stack
            }
        }
    }
}
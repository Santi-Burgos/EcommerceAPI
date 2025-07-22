import Ticket from "../models/tickets.model.js";

export const createTicketController = async(req) => {
    try {
        const clientID = req.user.idUser;
        const { descriptionTicket, productID } = req.body;

        const validateTicket = await Ticket.validateIfTicketExists(productID, clientID)
        if(validateTicket){
            return{
                success: false,
                message: 'ya existe el ticket, aguarde a que te respondan'
            }
        }   

        const createTicket = await Ticket.createTicket(descriptionTicket, productID, clientID);
        
        return{
            success: true,
            data: createTicket
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
        const  ticketID  = req.body.ticketId;
        const adminID = req.user.idUser;        

        const ticketRoom = await Ticket.createTicketRoom(ticketID, adminID);
        
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
export const getMyTicketsController = async(req) =>{
    try{
        const clientID = req.user.idUser;
        const resultGetTicket = await Ticket.getMyTickets(clientID)
        return{
            success: true, 
            data: resultGetTicket
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

export const getAllTicketsController = async(req) =>{
    try{
        //request recibe los parametros de limits
        const getTickets = await Ticket.getAllTickets();
        return{
            success: true,
            data: getTickets
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

// los dos, anahdir un trigger
export const messagesTicketRoomController = async(req) =>{
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
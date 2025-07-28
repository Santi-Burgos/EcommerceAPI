import connection from "../config/database.js";

class Ticket{

    //Crea la sala del ticket
    static async createTicketRoom(ticketID, adminID){
        try{
            const statusTicketID = 2 

            const queryCreateRoomTicket = 'INSERT INTO `ticketRoom`(`idTicket`,`idStatusTicket`, `idAdmin`) VALUES (?,?,?)';
            const resultQuery = await connection.query(queryCreateRoomTicket, [ticketID, statusTicketID, adminID])
            return{ 
                success: true,
                data: resultQuery
            }
        }catch(error){
            throw new Error('Error al crear TicketRoom' + error.message)
        }
    }

    //Descripcion general del ticket
    static async createTicket(descriptionTicket, productID, clientID){
        try{
            const statusTicketID = 1
            const queryCreateTicket = 'INSERT INTO `ticket`(`descriptionTicket`, `createTicketDate`, `idStatusTicket`, `idProduct`, `idClient`) VALUES (?,NOW(),?,?,?)';
            const resultQuery = await connection.query(queryCreateTicket, [descriptionTicket, statusTicketID, productID, clientID])
            return{
                success: true,
                data: resultQuery
            }
        }catch(error){
            throw new Error('Error al crear ticket' + error.message)
        }
    }

    static async getMyTickets(clientID){
        try{
            const queryGetMyTickets = 'SELECT * FROM tickets WHERE idClient = ?';
            const [rows] = await connection.query(queryGetMyTickets, clientID)
            return rows
        }catch(error){
            throw new Error('Error al obtener mis tickets' + error.message)
        }
    }

    static async getAllTickets(){
        try{
            const queryGetAllTickets = 'SELECT * FROM tickets';
            const [rows] = await connection.query(queryGetAllTickets)
            return rows
        }catch(error){
            throw new Error('Error al obtener los tickets' + error.message)
        }  
    }

    //Sale de message por el ticket
    static async messagesRoom(messageTicket, isAdmin, senderID, ticketRoomID){
        try{
            const saveMessage = 'INSERT INTO `ticketmessage`(`messageDate`, `messageTicket`, `isAdmin`, `idSender`, `idTicketRoom`) VALUES (NOW(), ?, ?, ?, ?)'
            const resultSaveMessage = await connection.query(saveMessage, [messageTicket, isAdmin, senderID, ticketRoomID])

            return{
                success: true,
                data: resultSaveMessage
            }
        }catch(error){
            throw new Error('Error al enviar el mensaje' + error.message)
        }
    }

    //add trigger para que se actualice ticket en dos casos cuando se crea un ticket room y cuando se cambia el estado de ticket room

    static async changeStatusResolve(ticketID){  
        try{
            const ticketStatusResolve = 'UPDATE `ticketroom` SET idStatusTicket = 2 WHERE idTicket = ?';
            const statusTicketChange = await connection.query(ticketStatusResolve, ticketID);

            return{
                success: true, 
                data: statusTicketChange
            }
        }catch(error){
            throw new Error('Error al cambiar el estado del ticket' + error.message)
        }
    }

    static async validateIfTicketExists(productID, clientID){
        try{
            const queryTicketExists = 'SELECT * FROM ticket WHERE idProduct = ? AND idClient = ?'
            const [rows] = await connection.query(queryTicketExists, [productID, clientID])
            return rows.length >  0
        }catch(error){
            throw new Error('Error al validar existencia estado del ticket' + error.message)
        }
    }
}

export default Ticket
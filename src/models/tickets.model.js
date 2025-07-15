import connection from "../config/database.js";

class Ticket{
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


}

export default Ticket
import express from 'express';
import { requieredPermission } from '../middlewares/requiredPermission.middleware.js';
import { getAllTicketsController, messagesTicketRoomController, openTicketRoomController } from '../controllers/ticket.controller.js';
import { authToken } from '../middlewares/auth.middleware.js';
import { getAllTicketsView, messagesTicketRoomView, openTicketRoomView } from '../views/ticket.view.js';

const ticketAdminRoutes = express.Router();


ticketAdminRoutes.post('/create-room-ticket', authToken, async(req, res, next) =>{
    await requieredPermission('ticket_response',req.user.idRol)
    const result = await openTicketRoomController(req)
    openTicketRoomView(result, res)
})


//create getTicketsAll
ticketAdminRoutes.get('/get-all-tickets', authToken, async(req, res, next)=>{
    await requieredPermission('ticket_response',req.user.idRol)
    const result = await getAllTicketsController(req)
    getAllTicketsView(result, res)
})

ticketAdminRoutes.post('/ticket-room/:roomId', authToken, async(req, res, next) =>{
    await requieredPermission('ticket_response', req.user.idRol)
    const result = await messagesTicketRoomController(req) 
    messagesTicketRoomView(result, res)
})

// ticketAdminRoutes.put('/ticket-room-resolve', authToken, async(req, res, next)=>{
//     await requieredPermission('ticket_resolve', req.user.idRol)
//     const result = await(req)
//     //view
// })

export default ticketAdminRoutes;
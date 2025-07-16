import express from 'express';
import {createTicketController} from "../controllers/ticket.controller.js";
import { authToken } from '../middlewares/auth.middleware.js';
import { createTicketView, messagesTicketRoomView } from '../views/ticket.view.js';


const ticketRoutes = express.Router();

ticketRoutes.post('/create', authToken, async (req, res, next) =>{
    const result = await createTicketController(req);
    createTicketView(result, res)
}) 

ticketRoutes.post('/ticket-room/:roomId', authToken, async(req, res, next) =>{
    const result = await messagesTicketRoom(req) 
    messagesTicketRoomView(result, res)
})



export default ticketRoutes
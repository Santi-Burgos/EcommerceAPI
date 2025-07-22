import express from 'express';
import {createTicketController, getMyTicketsController, messagesTicketRoomController} from "../controllers/ticket.controller.js";
import { authToken } from '../middlewares/auth.middleware.js';
import { createTicketView, getMyTicketView, messagesTicketRoomView } from '../views/ticket.view.js';


const ticketRoutes = express.Router();

ticketRoutes.post('/create', authToken, async (req, res, next) =>{
    const result = await createTicketController(req);
    createTicketView(result, res)
}) 

ticketRoutes.post('/ticket-room/:roomId', authToken, async(req, res, next) =>{
    const result = await messagesTicketRoomController(req) 
    messagesTicketRoomView(result, res)
})

ticketRoutes.get('/get-my-tickets', authToken, async(req, res, next) =>{
    const result = await getMyTicketsController(req);
    getMyTicketView(result, res)
})


export default ticketRoutes
import express from 'express';
import {createTicketController} from "../controllers/ticket.controller.js";
import { authToken } from '../middlewares/auth.middleware.js';

const ticketRoutes = express.Router();

ticketRoutes.post('/create', authToken, async (req, res, next) =>{
    const result = await createTicketController(req);
}) 

export default ticketRoutes